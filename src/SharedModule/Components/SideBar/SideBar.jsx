import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  let logOut = ()=>{
    localStorage.removeItem('adminToken');
    navigate('/login');
  }
  return (
    <div>SideBar
      <button className="btn btn-danger" onClick={logOut}>LogOut</button>
    </div>
  )
}

export default SideBar