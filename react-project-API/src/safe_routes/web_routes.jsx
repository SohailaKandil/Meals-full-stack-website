import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Ingredients from '../pages/Ingredients.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Main_layout from '../layouts/main_layout.jsx'
import User_layout from '../layouts/user_layout.jsx'
import Admin_layout from '../layouts/admin_layout.jsx'
import AddRecipe from '../pages/AddRecipe.jsx'
import AcceptRecipes from '../pages/AcceptRecipes.jsx'
import NotFound from '../pages/NotFound.jsx'
import {ADMIN , USER} from './CONSTANTS.jsx'
import {use_auth} from '../safe_routes/context_provider'

function Layout_by_role () {
  const {token} = use_auth()
  const {role} = use_auth()
 
  if (!token){
    return <Main_layout />
  }
  else{
    if (role == ADMIN){
      return <Admin_layout />
    }
    if(role == USER){
      return <User_layout />
    }
  }

  return <Main_layout />
}

function Accepted_role ({accept_roles , children}){
  const {token} = use_auth()
  const {role} = use_auth()
  if (!token || !accept_roles.includes(role)){
    return <Navigate to = '/' replace></Navigate>
  }
  return (children)
}


const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout_by_role /> ,
            children: [{ path: "/", element: <Home /> },
                        {path: "/ingredients", element: <Ingredients /> },
                        {path: "/login", element: <Login /> },
                        {path: "/signup", element: <Signup /> },
                        {path: "*" , element: <NotFound /> },

                        {path: "/addrecipe", 
                          element: 
                            <Accepted_role accept_roles = {[USER , ADMIN]}>
                              <AddRecipe /> 
                            </Accepted_role>
                        },

                        {path: "/acceptrecipes", 
                          element: 
                            <Accepted_role accept_roles = {[ADMIN]}>
                              <AcceptRecipes /> 
                            </Accepted_role>
                        },
            ]       
        }

    ]
)

export default routes
