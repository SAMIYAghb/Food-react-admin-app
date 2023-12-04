import Header from "../../../SharedModule/Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../../../Constants/ApiUrl";
import { toast, ToastContainer } from 'react-toastify';
import nodata from "../../../assets/images/nodata.png";
import Nodata from './../../../SharedModule/Components/Nodata/Nodata';
import defaultrecipeImg from '../../../assets/images/1.webp';
import { baseUrl } from './../../../Constants/ApiUrl';


const RecipesList = ({title, paragraph}) => {
  // console.log(categoriesList , 'from recipe list');
  const imgUrl = 'https://upskilling-egypt.com/'
  const[itemId, setItemId] = useState(0);
  //state for pagination
  const [pagesArray, setPagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);//************* */

  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [recipesList, setRecipesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    return formData;
  };
  
  // Modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [modalState, setModalState] = useState("close");
  const showAddModal = () => {
    getTagsList();
    getCategoriesList();
   
    setValue('name', null);
    setValue('price', null);
    setValue('description', null);
    setValue('tagId', null);
    setValue('categoriesIds', null);
    setModalState("add-modal");
  };
  const showDeleteModal = (id) => {
    // alert(id);
    setItemId(id);
    setModalState("delete-modal");
  };
  const showUpdateModal = (item) => {
    console.log(item, "updated from showUpdateModal");
    setModalState("update-modal");
    setItemId(item.id);
    setRecipe(item);
    setValue("name", item.name);
    setValue("price", item.price);
    setValue("description", item.description);
    setValue("tagId", item.tag.id);
    setValue("categoriesIds", item.category[0].id);
    // setValue("recipeImage", item?.imagePath);  
  };
  const handleClose = () => setModalState("close");
  // Modal

  const onSubmit = async (data) =>{
    console.log(data);
    const addFormData = appendToFormData(data);

    await axios
    .post(baseUrl + 'Recipe', addFormData,{
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

  let totalPages;
  const getRecipesList = async(pageNo, name, tagId, categoryId) =>{
    await axios
    .get(baseUrl + 'Recipe',{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
      params:{
        pageSize: 5,//statique
        pageNumber: pageNo, //dynamique
        name: name,
        tagId: tagId,
        categoryId: categoryId,
      }
  },
    )
    .then((response)=>{
      // console.log(response.data.data , 'recipesList');
      let totalPages = response.data.totalNumberOfPages;//************ */
      let arrayOfNumberOfPages = Array(response.data.totalNumberOfPages)
        .fill()
        .map((_,i )=> i+1);
        setPagesArray(arrayOfNumberOfPages);
        // console.log(pagesArray);
        setRecipesList(response?.data?.data);
        setCurrentPage(pageNo);//************** */
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const deleteRecipe = async(itemId) => {
    await axios
    .delete(baseUrl + `Recipe/${itemId}`, 
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      },
    })
    .then((response) =>{
      // console.log(response);
      handleClose();
      getRecipesList();
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const updateRecipe = async (data) => {
    console.log(data);
    const updateFormData = appendToFormData(data);

    await axios
      .put(baseUrl + `Recipe/${itemId}`, updateFormData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Recipe Updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "undefined",
          theme: "colored",
        });
        handleClose();
        getRecipesList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // reel time search filtration
  const getNameValue = (input) =>{
    // console.log(input.target.value);
    setSearchString(input.target.value);//pour passer le parametre du filtre aux autre pages
    // getRecipesList(1, input.target.value);//filtrer par nom seulement
    getRecipesList(1, input.target.value, selectedTagId, selectedCategoryId);//filtrer par nom et category et tag au meme temps
  }

  const getTagValue = (select) =>{
    // console.log(select.target.value);
    setSelectedTagId(select.target.value);
    getRecipesList(1, null, select.target.value,selectedCategoryId);//il me faut 4 argument pour la function getRecipesList
  }

  const getCategoryValue = (select) =>{
    // console.log(select.target.value);
    setSelectedCategoryId(select.target.value)
    getRecipesList(1, null, selectedTagId, select.target.value);
    //selectedTagId, select.target.value pour faire le filtre par category
  }
 // end reel time search filtration
  useEffect(() =>{
    getRecipesList(1); 
    getTagsList(); 
    getCategoriesList();  
  },[]);

  return (
  <>
    <ToastContainer/>
    <Header title={'Receipes Items!'} 
    paragraph={'You can now add your items that any user can order it from the Application and you can edit'} />
  
  {/* modal update recipe*/}
      <Modal
        show={modalState === "update-modal"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton><h3>Update Recipe</h3></Modal.Header>         
          <p className="text-muted">Welcome Back! Please enter your details</p>
          <form onSubmit={handleSubmit(updateRecipe)}>
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
            {...register("tagId", { required: true , valueAsNumber:true})}
            aria-label="Default select example"
            type="number"
            className="form-select"
            >
              <option value="" className="text-muted">Select tag</option>
              {
                tagsList?.map((tag) =>(
                  <>
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                  </>
                ))
              }

            </select>
            {errors.tagId && errors.tagId.type === "required" && (
                <span className="text-danger ">tagId is required</span>
              )}

            <select 
              {...register("categoriesIds", { 
                required: true,
                 valueAsNumber:true })}
              aria-label="Default select example"
              type="number"
              className="form-select mt-3"
              >
                <option value="" className="text-muted">Select category</option>
                {
                  categoriesList?.map((category)=>(
                    <>
                      <option key={category.id} value={category.id}>{category.name}</option>
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
                {...register("recipeImage")}
                className="form-control" type="file" id="formFile"/>
                <div className="text-center my-3">
                 <img src={imgUrl + recipe?.imagePath} 
                                  alt="recipe-image"
                                  className="w-25 img-fluid " />
                </div>
                 
              </div>  
              

            <div className="form-group my-3 text-end">
              <button
              onClick={handleClose} 
              className="btn btn-outline-danger mx-3">Cancel</button>
              <button type="submit" className="btn btn-success ">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    {/*end modal  update recipe*/}
    {/* modal Add New recipe*/}
      <Modal
        show={modalState === "add-modal"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton><h3>Add new Recipe</h3></Modal.Header>         
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
            {...register("tagId", { required: true , valueAsNumber:true})}
            aria-label="Default select example"
            type="number"
            className="form-select"
            >
              <option value="" className="text-muted">Select tag</option>
              {
                tagsList?.map((tag) =>(
                  <>
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                  </>
                ))
              }

            </select>
            {errors.tagId && errors.tagId.type === "required" && (
                <span className="a">Tag is required</span>
              )}

            <select 
              {...register("categoriesIds", { required: true, valueAsNumber:true })}
              aria-label="Default select example"
              type="number"
              className="form-select mt-3"
              >
                <option value="" className="text-muted">Select category</option>
                {
                  categoriesList?.map((category)=>(
                    <>
                      <option key={category.id} value={category.id}>{category.name}</option>
                    </>
                  ))
                }
            </select>
              {errors.categoriesIds && errors.categoriesIds.type === "required" && (
                  <span className="text-danger ">Category is required</span>
                )}

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label mt-3">
                Choose a Item Image to Upload:</label>
                <input
                {...register("recipeImage")}
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
    {/* modal delete recipe*/}
      <Modal
        show={modalState === "delete-modal"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton></Modal.Header>
          <div className="text-center">
            <img
             src={nodata} 
             alt="dalate-img" className="w-50" />
            <h3>Delete This Recipe?</h3>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
            <div className="text-end">
              <button 
                onClick={()=>{deleteRecipe(itemId)}}
                className="btn btn-outline-danger w-50 ">
                Delete this Recipe
              </button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    {/*end modal delete recipe*/}

      <div className="row align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={showAddModal} className="btn btn-success px-5 ">
            Add New Recipe
            <i className=" px-2 fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <div className="">
          {/* Filtration */}
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <input 
                  onChange={getNameValue}
                  placeholder='Search By Recipe Name...' className='form-control my-2' type="text"  />
              </div>
              <div className="col-md-4 col-sm-12">
                
                <select  
                onChange={getTagValue}             
                className="form-select my-2"
                >
                  <option value="" className="text-muted">Select tag</option>
                  {
                    tagsList?.map((tag) =>(
                      <>
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                      </>
                    ))
                  }

                </select>
              </div>
              <div className="col-md-4 col-sm-12">
                
                <select  
                onChange={getCategoryValue}  
                  className="form-select my-2"
                  >
                    <option value="" className="text-muted">Select category</option>
                    {
                      categoriesList?.map((category)=>(
                        <>
                          <option key={category.id} value={category.id}>{category.name}</option>
                        </>
                      ))
                    }
                </select>
              </div>
            </div>                         
          {/* End Filtration */}
            {
            recipesList.length > 0 
            ? (
              <div className="">
                <div className="table-responsive">
                  <table className="table my-4 table-striped">
                    <thead className="table-success">
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
                        recipesList.map((recipe, index)=>(
                          <>
                          <tr className="text-center" key={recipe.id}>
                            <th scope="row">{index + 1}</th>
                            <td scope="row">{recipe?.name}</td>
                            <td>
                              <div className="img-container">
                                {recipe.imagePath ?(
                                    <img src={imgUrl + recipe.imagePath} 
                                  alt="recipe-image"
                                  className="w-100 img-fluid" />
                                ):(
                                  <img src={defaultrecipeImg} 
                                  alt="recipe-image"
                                  className="w-100 img-fluid" />
                                )
                                }
                                
                              </div>
                              
                              </td>
                            <td>{recipe?.price}</td>
                            <td>{recipe?.description}</td>
                            <td>{recipe?.tag?.name}</td>
                            <td>{recipe?.category[0]?.name}</td>
                            <td>
                            <i
                              onClick={()=>{showUpdateModal(recipe)}}
                              className="fa fa-edit text-warning mx-5"></i>
                              <i
                                onClick={()=>{showDeleteModal(recipe.id)}}
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
                              onClick={() => getRecipesList(currentPage - 1, searchString)}
                              disabled={currentPage === 1}
                              className="page-link pag-clic"
                              aria-label="Previous">
                                <span aria-hidden="true">«</span>
                              </a>
                    </li>
                      {
                        pagesArray.map((pageNo) =>(
                          <>
                            <li onClick={()=>getRecipesList(pageNo, searchString)}
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
                      onClick={() => getRecipesList(currentPage + 1, searchString)}
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

export default RecipesList