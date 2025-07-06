import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useState } from "react";

const Connections = () => { 
  const dispatch = useDispatch() ;
  const connections = useSelector((store) => store.
  connections) ;
  const [notFound , setNotFound]  = useState(false) ;
  const fetchConnections = async () => {
     try{
        const res =  await axios.get(BASE_URL + "/user/connections" , {withCredentials : true,}) ;
        dispatch(addConnections(res.data.data)) ;
     }  
     catch(err){
       console.error(err.message) ; 
     }    
  } ;
  
  useEffect(() => {
    fetchConnections() ;
  } , []) ;

  useEffect(() => {
    if(!connections || connections.length === 0){
       setNotFound(true) ;
       const timer = setTimeout(() => setNotFound(false) , 3000) ;
       return () => clearTimeout(timer) ;
    }

  } , [connections]) ;

  if(!connections) return;

  if(connections.length === 0) {
     return (notFound && (
         <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>No Connections...</span>
          </div>
        </div>
     ) )
  } 
  return (
    <div className=" text-center my-10 ">
        <h1 className="text-bold text-black text- 5xl ">Connections</h1>    
        {
          connections.map((connection) => {
            const {_id ,firstName , lastName , photoUrl , about , Company , Batch} = connection ; 
            
            return (
               <div key={_id} className="flex my-4 p-4 border-1 bg-green-50  w-1/2 mx-auto ">
                 <div>
                    <img src={photoUrl} className="w-20 h-20 rounded-3" alt="photo" />
                  </div>
                  <div className="text-left mx-4">
                      <h2 className="font-bold text-xl"> {firstName + ' ' + lastName}</h2> 
                      {Company && Batch && <p>{Company + ' ' + Batch}</p> }
                      <p>{about}</p>
                    </div>
                </div>
            ) 
          })  
        } 

    </div>
)} ;

export default Connections ;