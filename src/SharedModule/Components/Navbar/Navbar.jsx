import avatar from '../../../assets/images/admin.png'

const Navbar = ({adminData}) => {
  // console.log(adminData , "from navbar");
  return (
  <>
   <nav className="navbar navbar-expand-lg navbar-bg px-5 mt-5">
  <button className=" ms-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
         
        <a className="nav-link" href="#"><img className='px-3' src={avatar} alt="admin-img" /> {adminData?.userName}</a>
      </li>
    </ul>
    
  </div>
</nav>

</>
 )
}

export default Navbar