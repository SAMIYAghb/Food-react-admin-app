import Header from "./../../../SharedModule/Components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import nodata from "../../../assets/images/nodata.png";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer} from "react-toastify";
import Nodata from "./../../../SharedModule/Components/Nodata/Nodata";
import { AuthContext } from './../../../Context/AuthContext';
import { useContext } from "react";
import { ToastContext } from "../../../Context/ToastContext";
import Loader from './../../../SharedModule/Components/Loader/Loader';


const CategoriesList = () => {
  let { requestHeaders, baseUrl } = useContext(AuthContext);
  let { getToastValue } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue, //Vider la valeur expl: j'ai ajouté une category et je veux vider le champs juste après
    formState: { errors },
  } = useForm();
  //state for pagination
  const [pagesArray, setPagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);//************* */
  const [categoriesList, setCategoriesList] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [searchString, setSearchString] = useState("");//apres avoir obtenu les resultat de filtration sur la page 1 c ok , mais quand je clique sur la deuxieme page le filtre se diparaitre, pour regler ca je vais mettre dans la fonction getNameValue setSearchString(input.target.value) 
  // modal
  const [modalState, setModalState] = useState("close");

  const showAddModal = () => {
    setValue("name", null);
    setModalState("modal-one");
  };

  const showDeleteModal = (id) => {
    // console.log(id, "deleted");
    setItemId(id);
    setModalState("modal-two");
  };

  const showUpdateModal = (categoryItem) => {
    // console.log(id, "updated");
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
    setModalState("modal-three");
  };
  const handleClose = () => setModalState("close");
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // modal

  const onSubmit = async (data) => {
    // console.log(data);
    setIsLoading(true);
    await axios
      .post(baseUrl + "Category", data, {
        headers: 
          requestHeaders,
      })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        getCategoriesList(); // update the list: mise a jour de la liste des categories; permet à la nouvelle category d'apparaitre dans la list
        getToastValue("success", "Category added successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  let totalPages;//***********
  const getCategoriesList = async (pageNo,name) => {
    setIsLoading(true);
    //pageNo=1 => c a me donne les 5 premiere category, pageNo=2 => c a me donne les 10 category etc....
    await axios
      // .get(baseUrl + "Category/?pageSize=10&pageNumber=1", {
      .get(baseUrl + "Category", {
        headers:
          //pour obtenir les caterories on doit étre login 'authorized'
          requestHeaders,
        params: {
          pageSize: 5, //c'est moi qui a choisi de mettre 5 category dans chaque page donc c une valeur changeable
          pageNumber: pageNo, //c une valeur fixe qui vient du backend
          name : name,
        },
      })
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data.data);
        // console.log(response.data.totalNumberOfPages);
        let totalPages = response.data.totalNumberOfPages;//************ */

        let arrayOfNumberOfPages = Array(response.data.totalNumberOfPages)
        .fill()
        .map((_,i )=> i+1); //fait moi un tableau qi contient le nombre d'element qui = au totalNumberOfPages(fill=remplie) exemple : Array(5).fill().map((_,i )=> i+1); si j'ai totalNumberOfPages = 5, avec ce bout de code j'obtien [1,2,3,4,5]
        setPagesArray(arrayOfNumberOfPages);
        // console.log(pagesArray);
        setCategoriesList(response.data.data);
        setCurrentPage(pageNo);//************** */
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const deleteCategory = async (itemId) => {
    // console.log(itemId);
    setIsLoading(true);
    await axios
      .delete(baseUrl + `category/${itemId}`, {
        headers: 
          requestHeaders,
      })
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        getToastValue("success", "Category deleted successfully");       
        handleClose();
        getCategoriesList();
      })
      .catch((error) => {
        console.log(error);
        getToastValue("error", error?.response?.data?.message || " error!!");       
        setIsLoading(false);
      });
  };

  const updateCategory = async (data) => {
    // console.log(data);
    setIsLoading(true);
    await axios
      .put(baseUrl + `category/${itemId}`, data, {
        headers:
          requestHeaders,
      })
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        getToastValue("success", "Category Updated successfully");      
        handleClose();
        getCategoriesList();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // reel time search filtration
  const getNameValue = (input) =>{
    // console.log(input.target.value);
    setSearchString(input.target.value);//pour passer le parametre du filtre aux autre pages
    getCategoriesList(1, input.target.value);
  }

  // getCategoriesList()
  useEffect(() => {
    getCategoriesList(1); //pageNo= 1 pour obtenir les 5 categories
  }, []);

  return (
    <>
      <ToastContainer />
      <Header
        title={"Categories Item"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      {/* modal Add New Category*/}
      <Modal
        show={modalState === "modal-one"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <h3>Add new category</h3>
          <p className="text-muted">Welcome Back! Please enter your details</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group my-3">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Category Name"
                className="form-control"
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger ">Category name is required</span>
              )}
            </div>
            <div className="form-group my-3">
              <button className={"btn btn-success w-100" + (isLoading ? " disabled" : " ")}>
                {
                  isLoading == true ? (<i className="fas fa-spinner fa-spin"></i>):( "Add new category")
                } 
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*end modal  Add New Category*/}
      {/* modal delete Category*/}
      <Modal
        show={modalState === "modal-two"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center">
            <img src={nodata} alt="dalate-img" className="w-50" />
            <h3>Delete This Category?</h3>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
            <div className="text-end">
              <button
                onClick={() => {
                  deleteCategory(itemId);
                }}
                className={"btn btn-outline-danger w-50" + (isLoading ? " disabled" : " ")}
              >
                {
                  isLoading == true ? (<i className="fas fa-spinner fa-spin"></i>):( "Delete this item")
                }
                
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*end modal  delete Category*/}
      {/* modal update Category*/}
      <Modal
        show={modalState === "modal-three"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <h3>Update category</h3>
          <form onSubmit={handleSubmit(updateCategory)}>
            <div className="form-group my-3">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Category Name"
                className="form-control"
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger ">Category name is required</span>
              )}
            </div>
            <div className="form-group my-3">
              <button className={
                  "btn btn-success w-100" + (isLoading ? " disabled" : " ")
                }>
                  {isLoading == true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                 "Update category"
                )}
                  
                  </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*end modal update Category*/}

      <div className="row align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={showAddModal} className="btn btn-success px-5 ">
            Add New Category
            <i className=" px-2 fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <div className="">
          {/* Filtration */}
        <input 
          onChange={getNameValue}
          placeholder='Search By Category Name...' className='form-control my-3' type="text"  />
         {/* End Filtration */}
         {!isLoading ? (<>
          {categoriesList.length > 0 ? (
            <div className="">
              <table className="table my-4 table-striped">
                <thead className="table-success">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col" >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((category, index) => (
                    <>
                      <tr key={category.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{category.name}</td>
                        <td className=" ">
                          <i
                            onClick={() => {
                              showUpdateModal(category);
                            }}
                            className="fa fa-edit text-warning mx-5"
                          ></i>
                          <i
                            onClick={() => {
                              showDeleteModal(category.id);
                            }}
                            className="fa fa-trash text-danger"
                          ></i>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
               {/* Pagination  */}
              <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-center">
                <li className="page-item">
                          <a 
                          onClick={() => getCategoriesList(currentPage - 1, searchString)}
                          disabled={currentPage === 1}
                          className="page-link pag-clic"
                          aria-label="Previous">
                            <span aria-hidden="true">«</span>
                          </a>
                </li>
                  {
                    pagesArray.map((pageNo) =>(
                      <>
                        <li onClick={()=>getCategoriesList(pageNo, searchString)}
                         key={pageNo} 
                        //  className="page-item">
                         className={`page-item ${pageNo === currentPage ? 'active' : ''}`}>
                          <a className="page-link pag-clic">
                            {pageNo}
                          </a>
                        </li>   
                      </>
                    ))
                  }
                  <li 
                    onClick={() => getCategoriesList(currentPage + 1, searchString)}
                    disabled={currentPage === totalPages}
                    className="page-item">
                          <a className="page-link pag-clic"
                          aria-label="Next">
                            <span aria-hidden="true">» </span>
                          </a>
                  </li>
                  
                </ul>
              </nav>
            </div>
          ) : (
            // end Pagination 
            <Nodata />
          )}
         </>):(<Loader />)}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
