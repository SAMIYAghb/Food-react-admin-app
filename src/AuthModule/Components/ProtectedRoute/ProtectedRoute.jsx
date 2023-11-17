import { Navigate } from "react-router-dom"


const ProtectedRoute = ({adminData, children}) => {
  if(adminData == null && localStorage.getItem('adminToken') == null){
       return <Navigate to='/login'/>;
  }else{
    return children;
  }
}

export default ProtectedRoute