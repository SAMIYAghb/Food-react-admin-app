import { Outlet } from "react-router-dom";
import SideBar from "./../SideBar/SideBar";
import Navbar from "./../Navbar/Navbar";
import Header from "./../Header/Header";
// import { useLocation } from 'react-router-dom';

const MasterLayout = ({ adminData }) => {
  // const location = useLocation();
  // console.log(location);

  return (
    <>
      <div className="d-flex">
        <div className="sidebar-cont">
          <SideBar />
        </div>
        <div className="w-100">
          <Navbar adminData={adminData} />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
