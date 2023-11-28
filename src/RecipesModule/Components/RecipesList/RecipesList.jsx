import Header from "../../../SharedModule/Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Constants/ApiUrl";
import { toast, ToastContainer } from 'react-toastify';
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';


const RecipesList = ({title, paragraph}) => {
  // console.log(categoriesList , 'from recipe list');
  const imgUrl = 'https://upskilling-egypt.com/'
  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal
  const[recipesList, setRecipesList] = useState([]);
  const[tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    console.log(data);
    await axios
    .post(baseUrl + 'Recipe', data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-type": "multipart/form-data",
      },
    }
    )
    .then((response)=>{
      handleClose();
      getRecipesList();
      console.log(response, 'recipe');
      toast.success("Recipe added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "undefined",
          theme: "colored",
        });

    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const getTagsList = async() =>{
    await axios
    .get(baseUrl + 'tag')
    .then((response)=>{
      // console.log(response.data, 'tags');
      setTagsList(response.data);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const getCategoriesList = async () => {
    await axios
      .get(baseUrl + "Category/?pageSize=10&pageNumber=1", {
        headers: {
          //pour obtenir les caterories on doit étre login 'authorized'
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data, 'to get category id from recipeListe');
        setCategoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecipesList = async() =>{
    await axios
    .get(baseUrl + 'Recipe/?pageSize=10&pageNumber=1',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    }},
    )
    .then((response)=>{
      console.log(response.data.data , 'recipesList');
      setRecipesList(response?.data?.data);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  useEffect(() =>{
    getRecipesList();

    getCategoriesList();
    getTagsList();//a confirmer si c la quand doit appeler les tags?
  },[]);

  return (
  <>
    <ToastContainer/>
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
            
            <label>Select Tag:</label>
            <select 
            {...register("tagId", { required: true })}
            aria-label="Default select example"
            type="number"
            className="form-select"
            >
              {
                tagsList.map((tag) =>(
                  <>
                  <option key={tag.id} value={tag.id}>{tag.id}</option>
                  </>
                ))
              }

            </select>
            {errors.tagId && errors.tagId.type === "required" && (
                <span className="text-danger ">tagId is required</span>
              )}

              <label className=" mt-3">Select category ID:</label>
            <select 
              {...register("categoriesIds", { required: true })}
              aria-label="Default select example"
              type="number"
              className="form-select"
              >
                {
                  categoriesList.map((category)=>(
                    <>
                      <option key={category.id} value={category.id}>{category.id}</option>
                    </>
                  ))
                }
            </select>
              {errors.categoriesIds && errors.categoriesIds.type === "required" && (
                  <span className="text-danger ">Category ID is required</span>
                )}

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label mt-3">
                Choose a Item Image to Upload:</label>
                <input
                {...register("recipeImage", { required: true })}
                className="form-control" type="file" id="formFile"/>
              </div>  
              {errors.recipeImage && errors.recipeImage.type === "required" && (
                    <span className="text-danger ">Recipe image is required</span>
                  )} 

            <div className="form-group my-3 text-end">
              <button
              onClick={handleClose} 
              className="btn btn-outline-danger mx-3">Cancel</button>
              <button type="submit" className="btn btn-success ">Save</button>
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
      {
        recipesList.length > 0 
        ? (

            <table className="table">
              <thead>
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>            
                {
                  recipesList.map((recipe)=>(
                    <>
                    <tr className="text-center" key={recipe.id}>
                      <th scope="row">{recipe.id}</th>
                      <td scope="row">{recipe?.name}</td>
                      <td>
                        <img src={imgUrl + recipe.imagePath} 
                        alt="recipe-image"
                        className="w-100 img-fluid" />
                        </td>
                      <td>{recipe?.price}</td>
                      <td>{recipe?.description}</td>
                      <td>{recipe.tag?.name}</td>
                      <td>{recipe.category[0]?.name}</td>

                      <td>Actions</td>
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

export default RecipesList