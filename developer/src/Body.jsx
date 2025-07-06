import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../src/utils/userSlice";
import { BASE_URL } from "./utils/Constant";
import axios from "axios";
const Body = () => {
  const dispatch  = useDispatch() ;
  const navigate = useNavigate() ;
  const  userData = useSelector( (store) => store.user) ;

  const FetchUser = async () => {
    if(userData) return ;
      try{
         const res  = await axios.get( BASE_URL + "/profile/view" ,
           {withCredentials : true,}) ;
          dispatch(addUser(res.data)) ;
 
      }
      catch(err){
       if(err.status === 401) navigate("/login") ;  
        console.error(err.response.data) ;
      }
  }  ;

  useEffect(() => {
     FetchUser() ;
  } , []) ;

  return ( 
    <div> 
       <Navbar/> 
       <Outlet/>
       <Footer/>
    </div>
  ) 
 } ;

export default Body ;