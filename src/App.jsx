import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './HomeModule/Components/Home/Home'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import NotFound from './SharedModule/Components/NotFound/NotFound';
import UsersList from './UsersModule/Components/UsersList/UsersList';
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList';
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList';
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import Login from './AuthModule/Components/Login/Login';
import ChangePass from './AuthModule/Components/ChangePass/ChangePass';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './AuthModule/Components/ProtectedRoute/ProtectedRoute';
import RequestResetPass from './AuthModule/Components/RequestResetPass/RequestResetPass';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';




function App() {
  const [adminData, setAdminData] = useState(null);
// console.log(adminData);
  let saveAdminData =() => {
      const adminToken=  localStorage.getItem('adminToken');
      const decodedAdminToken = jwtDecode(adminToken); // decode your token
      // console.log(decodedAdminToken);
      setAdminData(decodedAdminToken);
  }

  //handle the refresh problem(quant on fait refrech le adminData = null mais avec le useEffect on obtien les detail de adminData)
  useEffect(()=>{
    if(localStorage.getItem("adminToken")){
      saveAdminData();
    }
  },[]) 

  const routes = createBrowserRouter([     
    {
      path:"dashboard",
      element:(
          <ProtectedRoute adminData={adminData}>
            <MasterLayout adminData={adminData} />
          </ProtectedRoute>
      ),
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<Home/>},
        {path: "users", element:<UsersList/>},
        {path: "recipes", element:<RecipesList/>},
        {path: "categories", element:<CategoriesList/>},
      ]
    },
    {
      path:"/",
    //   element: (
    //     // <ProtectedRoute adminData={adminData}>
    //       <AuthLayout/>   
    //     // </ProtectedRoute>
    // ),
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<Login saveAdminData={saveAdminData}/>},
        {path: "login", element:<Login saveAdminData={saveAdminData}/>},
        {path: "change-pass",element:<ChangePass/>},
        {path: "request-reset-pass",element:<RequestResetPass/>},
        {path: "reset-pass",element:<ResetPass/>},
       
      ]
    }
  ])
  return(
    <>
      <RouterProvider router={routes}/> 
      
    </>
  )
}

export default App
