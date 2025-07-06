import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice"
import connectionReducer from "./connectionSlice.js" ;
import requestReducer from "./requestSlice.js" ;

const appStore =  configureStore({
  reducer: {
     user : userReducer ,
     feed : feedReducer ,
     connections : connectionReducer ,
     requests :  requestReducer ,
  },
} );

export default appStore ;

