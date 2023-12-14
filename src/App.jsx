import { useContext } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ChangePass from './AuthModule/Components/ChangePass/ChangePass';
import Login from './AuthModule/Components/Login/Login';
import ProtectedRoute from './AuthModule/Components/ProtectedRoute/ProtectedRoute';
import RequestResetPass from './AuthModule/Components/RequestResetPass/RequestResetPass';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList';
import { AuthContext } from './Context/AuthContext';
import Home from './HomeModule/Components/Home/Home';
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList';
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout';
import NotFound from './SharedModule/Components/NotFound/NotFound';
import UsersList from './UsersModule/Components/UsersList/UsersList';




function App() {
  let { adminData,saveAdminData} = useContext(AuthContext);
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
        {index: true, element:<Home />},
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
      <RouterProvider router={routes} /> 
      
    </>
  )
}

export default App
