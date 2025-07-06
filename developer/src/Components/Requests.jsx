import React, { useEffect, useState } from "react";
import axios from 'axios' ;
import {BASE_URL} from '../utils/Constant';
import {useDispatch, useSelector} from "react-redux" ;
import {addRequests ,removeRequests} from "../utils/requestSlice";

const Requests = () => { 
  const  dispatch = useDispatch() ;
  const [notFound , setNotFound]  = useState(false) ;
  const requests = useSelector((store) => store.requests) ;

  const reviewRequest = async (staus , _id) => {
     try{
        const req = await axios.post(BASE_URL + "/request/review/" + staus +"/" + _id ,  {} ,{withCredentials:true , }) ; 
        console.log(req) ;
        dispatch(removeRequests(_id)) ;
     }
     catch(err){
      console.log(err) ;
     }
  }

  const fetchRequest = async () => { 
    try{
        const res = await axios.get(BASE_URL + "/user/requests/received" , {withCredentials : true} ) ;
        console.log(res?.data?.data) ;
        dispatch(addRequests(res?.data?.data)) ; 
      }
      catch(err) {
        console.log(err) ;
      }
  } ;

  useEffect(() => {
    fetchRequest() ;
  }, []) ;

  useEffect(() => {
    if(!requests || requests.length === 0){
       setNotFound(true) ;
       const timer = setTimeout(() => setNotFound(false) , 3000) ;
       return () => clearTimeout(timer) ;
    }

  } , [requests]) ;

  if(!requests) return;

  if(requests.length === 0) {
     return( notFound && (
         <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>No Requests Found...</span>
          </div>
        </div>
     ) )
  }


  return (
   <div className=" text-center my-10 ">
        <h1 className="text-bold text-black text- 5xl ">Requests </h1>    
        {
          requests.map((request) => {
            const { _id ,firstName , lastName , photoUrl , about , Company , Batch} = request.fromUserId ; 
            
            return (
               <div key={_id} className="flex justify-between item-center my-4 p-4 border-1 bg-green-50  w-2/3 mx-auto ">
                 <div>
                    <img src={photoUrl} className="w-20 h-20 rounded-3" alt="photo" />
                  </div>
                  <div className="text-left mx-4">
                      <h2 className="font-bold text-xl"> {firstName + ' ' + lastName}</h2> 
                      {Company && Batch && <p>{Company + ' ' + Batch}</p> }
                      <p>{about}</p>
                    </div>
                    <div>
                      <button className="btn btn-danger mx-2" onClick={reviewRequest("rejected" , request?._id)}>Rejected</button>
                      <button className="btn btn-green mx-2 " onClick={reviewRequest("accepted" , request?._id)}>Accepted</button>
                    </div>

                </div>
            ) 
          })  
        } 

    </div>
)} ;

export default Requests ;