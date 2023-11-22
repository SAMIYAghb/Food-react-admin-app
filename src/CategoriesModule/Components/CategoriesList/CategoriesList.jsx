import { Link } from 'react-router-dom';
import Header from './../../../SharedModule/Components/Header/Header';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../Constants/ApiUrl';
import axios from 'axios';


const CategoriesList = ({title, paragraph}) => {
  const [categoriesList, setCategoriesList] = useState(null);

  const getCategories = async()=>{
    await axios.get(baseUrl + 'Category')
    .then((response)=>{
      console.log(response.data.data);
      setCategoriesList(response.data.data)
    })
    .catsh((error)=>{
      console.log(error);
    })
  }
  // getCategories()
  useEffect(() =>{
    getCategories()
  },[])

  return (<>
  <Header 
  title={'Categories Item'}
   paragraph={'You can now add your items that any user can order it from the Application and you can edit'} />
    <div className="row align-items-center     justify-content-between rounded-3 p-4">
        <div className="col-md-6">
            <h3>Categories Table Details</h3>
            <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
            <button className="btn btn-success px-5 ">
              <Link to='' className="text-white text-decoration-none ">
              Add New Category
                <i className=" px-2 fa fa-arrow-right" aria-hidden='true'></i>
              </Link>
            </button>
        </div>

        <div className="">
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  {/* <td>{categoriesList.name}</td> */}
                  <td>@md</td>
                  <td>@md</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                  <td>jkob</td>
                  <td>@fr</td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </>)
}

export default CategoriesList