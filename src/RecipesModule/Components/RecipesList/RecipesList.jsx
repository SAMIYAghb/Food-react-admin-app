import Header from "../../../SharedModule/Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Constants/ApiUrl";


const RecipesList = ({title, paragraph}) => {
  // Modal
   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal
  const[recipesList, setRecipesList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    console.log(data);
  }

  // const getTagsList = async() =>{
  //   await axios
  //   .get(baseUrl + 'tag')
  //   .then((response)=>{
  //     console.log(response.data);
  //   })
  //   .catch((error) =>{
  //     console.log(error);
  //   })
  // }
  // getTagsList();

  const getRecipesList = async() =>{
    await axios
    .get(baseUrl + 'Recipe',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      // "content-type": "multipart/form-data",
    }},
    )
    .then((response)=>{
      console.log(response.data.data);
      setRecipesList(response.data.data);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  useEffect(() =>{
    getRecipesList();
  },[]);
  return (
  <>
  <Header title={'Receipes Items!'} 
  paragraph={'You can now add your items that any user can order it from the Application and you can edit'} />
  
    {/* modal Add New recipe*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <h3>Add new Recipe</h3>
          <p className="text-muted">Welcome Back! Please enter your details</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group my-3">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Recipe Name"
                className="form-control"
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger ">Recipe name is required</span>
              )}
            </div>

            <div className="form-group my-3">
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="form-control"
              />
              {errors.price && errors.price.type === "required" && (
                <span className="text-danger ">Recipe price is required</span>
              )}
            </div>

            <div className="form-group my-3">
              <textarea
                {...register("description", { required: true })}
                type="text"
                placeholder="Recipe description"
                className="form-control"
              />
              {errors.description && errors.description.type === "required" && (
                <span className="text-danger ">Recipe description is required</span>
              )}
            </div>
            
            <select 
            {...register("tagId", { required: true })}
            aria-label="Default select example"
            type="number"
            className="form-select"
            >
              <option>Select Tag</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            {errors.tagId && errors.tagId.type === "required" && (
                <span className="text-danger ">tagId is required</span>
              )}

            <select 
              {...register("categoriesIds", { required: true })}
              aria-label="Default select example"
              type="number"
              className="form-select mt-3"
              >
                <option>Select category ID</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
              {errors.categoriesIds && errors.categoriesIds.type === "required" && (
                  <span className="text-danger ">Category ID is required</span>
                )}

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label mt-3">
              Choose a Item Image to Upload:</label>
              <input className="form-control" type="file" id="formFile"/>
            </div>   

            <div className="form-group my-3 text-end">
              <button className="btn btn-outline-danger mx-3">Cancel</button>
              <button className="btn btn-success ">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*end modal  Add New recipe*/}

      <div className="row align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={handleShow} className="btn btn-success px-5 ">
            Add New Recipe
            <i className=" px-2 fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <div className="">
      
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  recipesList.map((recipe)=>(
                    <>
                    <tr className="text-center" key={recipe.id}>
                      <th scope="row">{recipe.name}</th>
                      <td>{recipe.imagePath}</td>
                      <td>{recipe.price}</td>
                      <td>{recipe.description}</td>
                      <td>tag</td>
                      {/* <td>tag</td> */}
                      {/* <td>{recipe.tag}</td> */}
                      {/* <td>{recipe.category.name}</td> */}
                    </tr>
                    </>
                  ))
                }
               
              </tbody>
            </table>
        
        </div>
      </div>
  </>
    
  )
}

export default RecipesList