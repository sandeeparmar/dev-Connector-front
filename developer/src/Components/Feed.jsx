import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux" ;
import axios from   "axios" ;
import {BASE_URL} from "../utils/Constant.js";
import {addFeed} from "../utils/FeedSlice.js";
import UserCard from "./UserCard.jsx";
import {useNavigate} from "react-router-dom";
 
const Feed = () => {
  const feed = useSelector((store) => store.feed) ;
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const getFeed = async () => {
    try{
      const res = await axios.get(BASE_URL + "/feed" , {withCredentials : true,}) ;
        dispatch(addFeed(res?.data?.data)) ;
      } 
      catch {
         navigate("/login") ;
      }
  } ; 

  useEffect(() => {
    getFeed() ;
  } , []) ;

  if(!getFeed) return ;

  if(getFeed.length <= 0) return <h1>No New User Is Found..</h1>

  return feed && ( 
    <div> 
      <UserCard user = {feed[0]}/>
    </div>
  ) ;
}

export default Feed ;