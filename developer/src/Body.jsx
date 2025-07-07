import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../src/utils/userSlice";
import { BASE_URL } from "./utils/Constant";
import axios from "axios";
const Body = () => {
  const dispatch  = useDispatch() ;
  const navigate = useNavigate() ;
  const  userData = useSelector( (store) => store.user) ;
  const [isLoginFailed , setLoginFailed] = useState(false) ; 
  const FetchUser = async () => {
    if(userData) return ;
      try{
         const res  = await axios.get( BASE_URL + "/profile/view" ,
           {withCredentials : true,}) ;
          dispatch(addUser(res.data.data)) ;
          console.log(res);
 
      }
      catch(err){
       if(err.status === 401) {
          setLoginFailed(true) ;
          setTimeout(() => setLoginFailed(false) , 2000) ;
          navigate("/login") ;
       }
          
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
       {isLoginFailed && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
              
              <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setLoginFailed(false)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Please Login...</span>
            </div>
          </div>
        )}


    </div>
  ) 
 } ;

export default Body ;