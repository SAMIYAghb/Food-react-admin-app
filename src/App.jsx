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
import ForgetPass from './AuthModule/Components/ForgetPass/ForgetPass';

function App() {

  const routes = createBrowserRouter([
    {
      path:"dashboard",
      element: <MasterLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<Home/>},
        {index: "users", element:<UsersList/>},
        {index: "recipes", element:<RecipesList/>},
        {index: "categories", element:<CategoriesList/>},
      ]
    },
    {
      path:"/",
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<Login/>},
        {index: "forget-pass",element:<ForgetPass/>},
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
