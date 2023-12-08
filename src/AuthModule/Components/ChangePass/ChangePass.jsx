import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../../../assets/images/logo4-3.png';
import { AuthContext } from './../../../Context/AuthContext';
import { ToastContext } from './../../../Context/ToastContext';

const ChangePass = ({handleClose}) => {
  let { requestHeaders, baseUrl } = useContext(AuthContext);
  let { getToastValue } = useContext(ToastContext);
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
      headers:requestHeaders
    })
    .then((response) => {
      // console.log(response);
      handleClose();
      getToastValue("success", "Password change successfully");
      navigate('/login');
     })
    .catch((error)=>{
        // console.log(error);
        getToastValue("error", error.response.data.message);
    });  
  }

  return (
    <>
    {/*  <div className="auth-container container-fluid">   */}
      <ToastContainer />
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