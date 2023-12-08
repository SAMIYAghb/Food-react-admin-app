import { createContext } from "react";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';


export let AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [adminData, setAdminData] = useState(null);
//   console.log(adminData);
  
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  }
  const baseUrl = 'https://upskilling-egypt.com/api/v1/';

  let saveAdminData = () => {
    const adminToken = localStorage.getItem("adminToken");
    const decodedAdminToken = jwtDecode(adminToken); // decode your token
    // console.log(decodedAdminToken);
    setAdminData(decodedAdminToken);
  };

  //handle the refresh problem(quant on fait refrech le adminData = null mais avec le useEffect on obtien les detail de adminData)
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{adminData, saveAdminData, requestHeaders, baseUrl }}>
        {props.children}
    </AuthContext.Provider>
  );
}
