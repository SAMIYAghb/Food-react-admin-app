import logo from '../../../assets/images/logo4-3.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from './../../../Constants/ApiUrl';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const RequestResetPass = () => {
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = async(data) => {
        console.log(data)
        await axios
          .post(baseUrl + "Users/Reset/Request", data)
          .then((response) => {
            console.log(response);
            navigate('/reset-pass');

            setTimeout(()=>{
              toast.success("Mail set successfully",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "undefined",
                theme: "colored"
              });
            }, 1);
          })
          .catch((error)=>{
              console.log(error);
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
                <h2 className='mt-5'>Request reset password</h2>
                <p>Please Enter Your Email And Check Your Inbox</p>
                
                <div className="form-group input-group my-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                      </div>

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
                  <button type="submit" className="btn btn-success w-100">
                    Send
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

export default RequestResetPass