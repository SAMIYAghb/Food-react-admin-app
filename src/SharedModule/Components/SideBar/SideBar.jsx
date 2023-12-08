import { useNavigate, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useState } from 'react';
import logo from '../../../assets/images/logo4-3.png';
import togl from '../../../assets/images/3.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChangePass from './../../../AuthModule/Components/ChangePass/ChangePass';
 
const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  let logOut = ()=>{
    localStorage.removeItem('adminToken');
    navigate('/login');
  }
  return (
    <div className="sidebar-container">
      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <ChangePass handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
      {/*end modal */}
      
    <Sidebar collapsed={isCollapsed}>
        <Menu  menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}>
            <MenuItem
          className="logo-toggle"
            onClick={handleToggle}
            icon={<img src={togl} alt="" className='icon-img-side'/>}
          ></MenuItem>
          <MenuItem icon={<i className='fa fa-home' aria-hidden='true'></i>} component={<Link to="/dashboard" />}> 
          Home</MenuItem>
          <MenuItem icon={<i className='fa fa-users' aria-hidden='true'></i>} component={<Link to="/dashboard/users" />}> 
          Users</MenuItem>
          <MenuItem icon={<i className='fa fa-pizza-slice' aria-hidden='true'></i>} component={<Link to="/dashboard/recipes" />}> 
          Recipes</MenuItem>
          <MenuItem icon={<i className='fa fa-burger' aria-hidden='true'></i>} component={<Link to="/dashboard/categories" />}> 
          Categories</MenuItem>
          <MenuItem 
          onClick={handleShow}
          icon={<i className='fa fa-unlock-keyhole' aria-hidden='true'></i>} 
          // component={<Link to="/change-pass" />}
          > 
          Change Password </MenuItem>
          <MenuItem onClick={logOut}
          icon={<i className='fa fa-right-from-bracket' aria-hidden='true'></i>} component={<Link to="/login" />}> Logout</MenuItem>
        </Menu>
    </Sidebar>
    </div>
  )
}

export default SideBar
