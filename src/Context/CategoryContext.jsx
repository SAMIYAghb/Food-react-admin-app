import { createContext, useState, useContext} from "react";
import { AuthContext } from './AuthContext';
import axios from "axios";


export let CategoryContext = createContext();

export default function CategoryContextProvider(props){
    let { requestHeaders, baseUrl } = useContext(AuthContext);

    const [categoriesList, setCategoriesList] = useState([]);

    
    const getCategoriesList = async (pageNo,name) => {
        await axios
          .get(baseUrl + "Category/?pageSize=10&pageNumber=1", {
            headers:
              //pour obtenir les caterories on doit étre login 'authorized'
              requestHeaders,
          })
          .then((response) => {
            // console.log(response.data.data, 'to get category id from recipeListe');
            setCategoriesList(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      return (
        <CategoryContext.Provider value={{getCategoriesList, categoriesList}}>
            {props.children}
        </CategoryContext.Provider>
      );

}