import Header from "../../../SharedModule/Components/Header/Header"
import Modal from "react-bootstrap/Modal";
// import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Constants/ApiUrl";

import { toast, ToastContainer } from 'react-toastify';
import nodata from "../../../assets/images/nodata.png";
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';



const UsersList = ({title, paragraph}) => {
  const imgUrl = 'https://upskilling-egypt.com/';
 
  const[usersList, setUsersList] = useState([]);
  const[itemId, setItemId] = useState(0);
  //state for pagination
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);//************* */
  // modal
  const [modalState, setModalState] = useState("close");
 
  const showDeleteModal = (id) => {
    // console.log(id, "deleted");
    setItemId(id); //pour l'envoyé a l API
    setModalState("delete-modal");
  };
  const handleClose = () => setModalState("close");
   // modal

   let totalPages;
   const getUsersList = async(pageNo, userName, email) =>{
    await axios
    .get(baseUrl + "Users", {
      headers: {
        //pour obtenir les users on doit étre login 'authorized'
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },      
      params:{
        pageSize: 5,//statique
        pageNumber: pageNo, //dynamique
        userName: userName,
        email: email,
      }
    })
    .then((response) => {
      // console.log(response.data.data);
      // console.log(response.data.totalNumberOfPages);
      let totalPages = response.data.totalNumberOfPages;//************ */
      let arrayOfNumberOfPages = Array(response.data.totalNumberOfPages)
      .fill()
      .map((_,i )=> i+1);
      setPagesArray(arrayOfNumberOfPages);
      setUsersList(response?.data?.data);
      setCurrentPage(pageNo);//************** */
    })
    .catch((error) => {
      console.log(error);
    });
   }

   const deleteUser = async(itemId)=>{
    // console.log(id, 'deleted');
    await axios
    .delete(baseUrl + `Users/${itemId}`, {
      headers: {
        //pour obtenir les users on doit étre login 'authorized'
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((response) => {
      // console.log(response.data.data);
      toast.success("User Deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "undefined",
        theme: "colored",
      });
      getUsersList();
      handleClose();
    })
    .catch((error) => {
      console.log(error);
    });
   }

   // reel time search filtration Users
  const getNameValue = (input) =>{
    // console.log(input.target.value);
    setSearchString(input.target.value);//pour passer le parametre du filtre aux autre pages
    getUsersList(1, input.target.value);//filtrer par nom seulement
    // getRecipesList(1, input.target.value, selectedTagId, selectedCategoryId);//filtrer par nom et category et tag au meme temps
  }
  
  const getEmailValue = (input) =>{
    console.log(input.target.value);
    setSearchString(input.target.value);//pour passer le parametre du filtre aux autre pages
    getUsersList(1, input.target.value);//filtrer par email seulement
  }
  //end reel time search filtration Users

   useEffect(() => {
    getUsersList(1);
   },[]);


  return (<>
  <ToastContainer/>
  <Header title={'Users List'} paragraph={'You can now add your items that any user can order it from the Application and you can edit'} />
    
      {/* modal delete User*/}
      <Modal
        show={modalState === "delete-modal"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center">
            <img src={nodata} alt="dalate-img" className="w-50" />
            <h3>Delete This User?</h3>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
            <div className="text-end">
              <button 
                onClick={()=>{deleteUser(itemId)}}
                className="btn btn-outline-danger w-50 ">
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end modal delete User*/}
    
    <div className="row align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </div>

        <div className="">
      {
        usersList.length > 0 
        ? (
          <div className="">
            {/* Filtration */}
            <div className="row">
              <div className="col-md-6">
                <input 
                  onChange={getNameValue}
                  placeholder='Search By User Name...' className='form-control my-2' type="text"  />
              </div>            
              <div className="col-md-6 ">
                <input 
                  onChange={getEmailValue}
                  placeholder='Search By User Email...' className='form-control my-2' type="text"  />
              </div> 
            
            </div>                         
          {/* End Filtration */}
          <div className="table-responsive">
            <table className="table my-4 table-striped">
              <thead className="table-success">
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
                          onClick={()=>{showDeleteModal(user.id)}}
                          className="fa fa-trash text-danger"
                        ></i>
                      </td>
                    </tr>
                    </>
                  ))
                }
              </tbody>
            </table>
          </div>
            {/* Pagination  */}
            <nav aria-label="Page navigation example ">
            <ul className="pagination justify-content-center">
            <li className="page-item">
                      <a 
                      onClick={() => getUsersList(currentPage - 1, searchString)}
                      disabled={currentPage === 1}
                      className="page-link pag-clic"
                      aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
            </li>
              {
                pagesArray.map((pageNo) =>(
                  <>
                    <li onClick={()=>getUsersList(pageNo, searchString)}
                    key={pageNo} 
                    // className="page-item "
                    className={`page-item ${pageNo === currentPage ? 'active' : ''}`}
                    >
                      <a className="page-link pag-clic">
                        {pageNo}
                      </a>
                    </li>   
                  </>
                ))
              }
              <li 
              onClick={() => getUsersList(currentPage + 1, searchString)}
              disabled={currentPage === totalPages}  
                className="page-item">
                      <a className="page-link pag-clic"
                      aria-label="Next">
                        <span aria-hidden="true">» </span>
                      </a>
              </li>
            </ul>
          </nav>
          {/* Pagination  */}
          </div>
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