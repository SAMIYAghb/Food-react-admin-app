import Header from "../../../SharedModule/Components/Header/Header"
import Modal from "react-bootstrap/Modal";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import nodata from "../../../assets/images/nodata.png";
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';
import { AuthContext } from './../../../Context/AuthContext';
import { ToastContext } from './../../../Context/ToastContext';
import Loader from './../../../SharedModule/Components/Loader/Loader';



const UsersList = () => {
  let { requestHeaders, baseUrl } = useContext(AuthContext);
  let { getToastValue } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const imgUrl = 'https://upskilling-egypt.com/';
  const[usersList, setUsersList] = useState([]);
  const[itemId, setItemId] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  //state for pagination
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);//************* */
  // modal
  const handleClose = () => setModalState("close");
  const [modalState, setModalState] = useState("close");
 
  const showDeleteModal = (id) => {
    // console.log(id, "deleted");
    setItemId(id); //pour l'envoyé a l API
    setModalState("delete-modal");
  };
   // modal

   let totalPages;
   const getUsersList = async(pageNo, userName, gpId) =>{
    setIsLoading(true);
    await axios
    .get(baseUrl + "Users", {
      headers: 
        //pour obtenir les users on doit étre login 'authorized'
        requestHeaders,   
      params:{
        pageSize: 5,//statique
        pageNumber: pageNo, //dynamique
        userName: userName,
        groups: gpId,
      }
    })
    .then((response) => {
      setIsLoading(false);
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
      setIsLoading(false);
      // console.log(error);
    });
   }

   const deleteUser = async(itemId)=>{
    // console.log(id, 'deleted');
    await axios
    .delete(baseUrl + `Users/${itemId}`, {
      headers:
        //pour obtenir les users on doit étre login 'authorized'
        requestHeaders,
    })
    .then((response) => {
      // console.log(response.data.data);
      getToastValue("success", "User Deleted successfully");
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
    getUsersList(1, searchString, selectedRoleId);//filtrer par nom seulement
    // getRecipesList(1, input.target.value, selectedTagId, selectedCategoryId);//filtrer par nom et category et tag au meme temps
  }
  
  const getRoleValue = (select) =>{
    // console.log(select.target.value);
    setSelectedRoleId(select.target.value); //pour passer le parametre du filtre aux autre pages
    getUsersList(1, searchString, select.target.value);//filtrer par name & role
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
              onClick={handleClose} 
              className="btn btn-success mx-3">Cancel</button>
              <button 
                onClick={()=>{deleteUser(itemId)}}
                className={
                  "btn btn-outline-danger w-50" + (isLoading ? " disabled" : "")
                }
                >
                  {isLoading == true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Delete this user"
                )}
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
          {/* Filtration */}
          <div className="row">
              <div className="col-md-6">
                <input 
                  onChange={getNameValue}
                  placeholder='Search By User Name...' className='form-control my-2' type="text"  />
              </div>            
              <div className="col-md-6 ">
              <select onChange={getRoleValue} className="form-select my-2">
                  <option value={""} className="text-muted">
                    Search by role
                  </option>
                  <option value={1}>admin</option>
                  <option value={2}>user</option>
                </select>
              </div> 
            
            </div>                         
          {/* End Filtration */}
        {
                isLoading ? (<Loader/>) : (<>
      {
        usersList.length > 0 
        ? (
          <div className="">
            
          
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
            
            </>)}
        </div>
      </div>
  </>
  )
}

export default UsersList