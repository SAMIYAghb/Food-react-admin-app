import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../../../assets/images/logo4-3.png';
import { AuthContext } from './../../../Context/AuthContext';
import { ToastContext } from './../../../Context/ToastContext';

const ResetPass = () => {
  let { baseUrl } = useContext(AuthContext);
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
        .post(baseUrl + "Users/Reset", data)        
        .then((response) => {
          // console.log(response);
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
    <ToastContainer/>
    <div className="auth-container container-fluid">      
    <div className="bg-overlay row vh-100 justify-content-center align-items-center">
      <div className="col-md-6">
      <div className="bg-white p-2">
              <div className="logo-cont text-center">
                  <img src={logo} className='w-25' alt="logo" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} 
              action="" className="m-auto w-75">
                <h2 className='mt-5'>Reset password</h2>
                <p>Please Enter Your Otp or Check Your Inbox</p>
                
                    <div className="form-group my-3 ">
                            <input 
                            {...register("email",
                            { required: true,
                                pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                            })}
                            type="email"
                            name="email"                 
                            className="form-control"  placeholder="Email"/>
                            {errors.email && errors.email.type === "required" && (<span className='text-danger'>Email is required</span>)}
                            {errors.email && errors.email.type === "pattern" && (<span className='text-danger '>Email is invalid</span>)}
                    </div>

                    <div className="form-group my-3">
                            <input 
                            {...register("seed",
                            { required: true,
                            })}
                            // type="text"
                            name="seed"                 
                            className="form-control"  placeholder="OTP"/>
                            {errors.seed && errors.seed.type === "required" && (<span className='text-danger'>OTP is required</span>)}
                    </div>

                    <div className="form-group my-3">
                        <input 
                        {...register("password",
                        { required: true,
                          pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        })}
                        type="password"
                        name="password"                 
                        className="form-control"  placeholder="Password"/>
                        {errors.password && errors.password.type === "required" && (<span className='text-danger'>Password is required</span>)}
                        {errors.password && errors.password.type === "pattern" && (<span className='text-danger '>password is invalid</span>)}
                    </div>

                    <div className="form-group my-3">
                        <input 
                        {...register("confirmPassword",
                        { required: true,                         
                      
                        })}
                        type="password"                                     
                        className="form-control"  placeholder="Confirm Password"/>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && (<span className='text-danger'>confirm Password is required</span>)}
                      
                    </div>
                
                <div className="form-group my-3">
                  <button type="submit" className="btn btn-success w-100">
                    Reset Password
                  </button>
                </div>            
              </form>
            </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default ResetPass