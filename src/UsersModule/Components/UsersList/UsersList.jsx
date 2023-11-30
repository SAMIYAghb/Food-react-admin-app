import Header from "../../../SharedModule/Components/Header/Header"
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Constants/ApiUrl";
import { toast, ToastContainer } from 'react-toastify';
import nodata from "../../../assets/images/nodata.png";
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';

const UsersList = ({title, paragraph}) => {
  const imgUrl = 'https://upskilling-egypt.com/';
  const {
    register,
    handleSubmit,
    setValue,  //Vider la valeur expl: j'ai ajouté une category et je veux vider le champs juste après
    formState: { errors },
  } = useForm();
  const[usersList, setUsersList] = useState([]);

  // modal
  const [modalState, setModalState] = useState("close");
  const showAddModal = () => {
    // getusersList();
    setModalState("add-modal");
  };
  const handleClose = () => setModalState("close");
   // modal

   const getUsersList = async() =>{
    await axios
    .get(baseUrl + "Users/?pageSize=10&pageNumber=1", {
      headers: {
        //pour obtenir les users on doit étre login 'authorized'
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((response) => {
      // console.log(response.data.data);
      setUsersList(response?.data?.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }

   useEffect(() => {
    getUsersList();
   },[]);


  return (<>
  <Header title={'Users List'} paragraph={'You can now add your items that any user can order it from the Application and you can edit'} />
    
    {/* modal Add New User*/}
      <Modal
        show={modalState === "add-modal"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <h3>Add new User</h3>
          <p className="text-muted">Welcome Back! Please enter your details</p>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          
        </Modal.Body>
      </Modal>
    {/*end modal  Add New User*/}
    <div className="row align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={showAddModal} className="btn btn-success px-5 ">
            Add New User
            <i className=" px-2 fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <div className="">
      {
        usersList.length > 0 
        ? (

            <table className="table">
              <thead>
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>            
                {
                  usersList.map((user, index)=>(
                    <>
                    <tr className="text-center" key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td scope="row">{user?.userName}</td>
                      <td>
                        <div className="img-container">
                          {
                            user.imagePath ?(
                              <img src={imgUrl + user.imagePath} 
                              alt="recipe-image"
                              className="w-100 img-fluid" />
                            )
                            : 
                              (
                              <img src={nodata} alt="recipe-image"
                              className="w-100 img-fluid"/>
                              )
                          }
                          
                        </div>                       
                        </td>
                      <td>{user?.phoneNumber}</td>
                      <td>
                        <i
                          // onClick={()=>{showDeleteModal(recipe.id)}}
                          className="fa fa-trash text-danger"
                        ></i>
                      </td>
                    </tr>
                    </>
                  ))
                }
              </tbody>
            </table>

          )
          : (
              <Nodata />
          )
      }
            
        
        </div>
      </div>
  </>
  )
}

export default UsersList