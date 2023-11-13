import { Outlet } from 'react-router-dom';
import SideBar from './../SideBar/SideBar';
import Navbar from './../Navbar/Navbar';
import Header from './../Header/Header';


const MasterLayout = () => {

  return (
   <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <div>
            <SideBar/>
          </div>       
        </div>

        <div className="col-md-10">
          <div>
            <Navbar/>
            <Header/>
            <Outlet/>
          </div>
        </div>
        
      </div>
   </div>
  )
}

export default MasterLayout