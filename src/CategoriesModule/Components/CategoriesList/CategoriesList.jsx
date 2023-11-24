
import Header from "./../../../SharedModule/Components/Header/Header";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/ApiUrl";
import axios from "axios";
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';



const CategoriesList = ({ title, paragraph }) => {
  const {register,
          handleSubmit,
          formState :{errors}} = useForm();

  const [categoriesList, setCategoriesList] = useState([]);
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal
  const onSubmit = async(data)=>{
      // console.log(data);
      await axios
      .post(baseUrl + 'Category',data, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })
      .then((response)=>{
        console.log(response);
        handleClose();
        getCategories();// update the list: mise a jour de la liste des categories; permet à la nouvelle category apparaitre dans la list
        toast.success("Category added successfully",{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "undefined",
          theme: "colored"
        });
      })
      .catch((error)=>{
        console.log(error);
      });
    }

  const getCategories = async () => {
    await axios
      .get(baseUrl + "Category/?pageSize=10&pageNumber=1", {
        headers: {
          //pour obtenir les caterories on doit étre login 'authorized'
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setCategoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // getCategories()
  useEffect(() => {    
    getCategories();
  }, []);

  return (
    <>
      <Header
        title={"Categories Item"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
       {/* modal */}
       <Modal
        show={show}
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
                    {...register("name",
                    { required: true})}
                    type="text"
                    placeholder="Category Name"
                    className="form-control"/>
                    {errors.name && errors.name.type === "required" && (<span className='text-danger '>Category name is required</span>)}
              </div>
              <div className="form-group my-3"> 
              <button className="btn btn-success w-100">Save</button>
              </div>
              
          </form>
        </Modal.Body>
      </Modal>
      {/*end modal */}

      <div className="row align-items-center     justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button 
          onClick={handleShow}
          className="btn btn-success px-5 "> 
              Add New Category
              <i className=" px-2 fa fa-arrow-right" aria-hidden="true"></i>
            
          </button>
        </div>

        <div className="">
          {
            categoriesList.length > 0 
            ?
            (<table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => ( 
                <>
                  <tr key={category.id}>
                    <th scope='row'>{category.id}</th>
                    <td>{category.name}</td>
                    <td><i className="">1</i>
                    <i className="">2</i>
                    </td>
                  </tr>
                </>
              ))}
            </tbody> 
            </table>)
            : 
            (<Nodata/>)
  
          }
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
