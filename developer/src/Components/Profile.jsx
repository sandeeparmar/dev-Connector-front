import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux"; // hooks are come from react-redux 

const Profile = () => {
  const user = useSelector((store) => store.user) ; // taking the data from store 
   return user && ( // if user is present then call it 
     <div> 
        <EditProfile user = {user}/>
     </div>
   ) ;
}
export default Profile ;