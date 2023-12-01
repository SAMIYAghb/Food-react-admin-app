
import Header from "../../../SharedModule/Components/Header/Header"
import { Link } from 'react-router-dom';
import Loader from "../../../SharedModule/Components/Loader/Loader";




const Home = ({title, paragraph}) => {
  return (
    <>
    <Header 
    title={'Welcome upskilling!'}
     paragraph={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    {/* home content */}
      <div className="content row mx-4 align-items-center justify-content-between rounded-3 p-4">
        <div className="col-md-6">
            <h3>Fill the <span className="text-success">Recipes</span> !</h3>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className="col-md-6 text-end">
            <button className="btn btn-success px-5 ">
              <Link to='/dashboard/recipes' className="text-white text-decoration-none ">
                Fill Recipes
                <i className=" px-2 fa fa-arrow-right" aria-hidden='true'></i>
              </Link>
             
            </button>
        </div>
      </div>
      
<Loader/>
  
      
    </>
  )
}

export default Home