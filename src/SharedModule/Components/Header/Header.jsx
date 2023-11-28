import header from '../../../assets/images/header.png';

const Header = ({children, title, paragraph}) => {
 

  return (
    <>
    {/* <div>
        {children}
    </div> */}
    <div className="bg-header px-4 my-4 mx-4">
          <div className="row my-3 align-items-center">
            <div className="col-md-9 px-5">
              <h3>{title}</h3>
              <p className="w-75 ">
                {paragraph}
              </p>
            </div>
            <div className="col-md-3 text-center">
              <img className="img-fluid" src={header} alt="header-img" />
            </div>
          </div>
        </div>
    
    </>
  );
};

export default Header;
