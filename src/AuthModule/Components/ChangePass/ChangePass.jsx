import { useForm } from 'react-hook-form';
import axios from 'axios';
import logo from '../../../assets/images/logo4-3.png';
import { baseUrl } from '../../../Constants/ApiUrl';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePass = ({handleClose}) => {
  const navigate = useNavigate();
  const {
    register, //contient the data of the form
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    // console.log(data)
    await axios
    .put(baseUrl + "Users/ChangePassword", data,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
    .then((response) => {
      console.log(response);
      handleClose();
      toast.success("Password change successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "undefined",
        theme: "colored"
      });
      navigate('/login');
     })
    .catch((error)=>{
        // console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "undefined",
          theme: "colored"
        }); 
    });  
  }

  return (
    <>
    {/*  <div className="auth-container container-fluid">   */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        closeOnClick
        draggable
        theme="light"
        />
    <div className="row  justify-content-center align-items-center">
      {/* <div className="col-md-6"> */}
      <div className="bg-white p-2">
              <div className="logo-cont text-center">
                  <img src={logo} className='w-50' alt="logo" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} 
              action="" className="m-auto w-75">
                <h2>Change your password</h2>
                <p>Enter your details below</p>
                
                <div className="form-group my-3">
                    <input 
                    {...register("oldPassword",
                     { required: true,
                     })}
                     type="password"                
                     className="form-control"  placeholder="Old Password"/>
                    {errors.oldPassword && errors.oldPassword.type === "required" && (<span className='text-danger'>Old Password is required</span>)}
                </div>
                <div className="form-group my-3">
                    <input 
                    {...register("newPassword",
                     { required: true,
                     })}
                     type="password"                
                     className="form-control"  placeholder="New Password"/>
                    {errors.newPassword && errors.newPassword.type === "required" && (<span className='text-danger'>New Password is required</span>)}
                </div>

                <div className="form-group my-3">
                    <input 
                    {...register("confirmNewPassword",
                     { required: true,
                     })}
                     type="password"
               
                     className="form-control"  placeholder="Confirm New Password"/>
                    {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" && (<span className='text-danger'>Confirm New Password is required</span>)}
                </div>

                
                <div className="form-group my-3">
                  <button type="submit" className="btn btn-success w-100">
                    Change password
                  </button>
                </div>            
              </form>
            </div>
      {/* </div> */}
    </div>
    {/* </div> */}
    </>)
}

export default ChangePass