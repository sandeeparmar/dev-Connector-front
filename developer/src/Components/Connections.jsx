import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => { 
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  
  const fetchConnections = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }    
  }, [dispatch]);
  
  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>No Connections...</span>
        </div>
      </div>
    );
  } 

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-black text-5xl mb-8">Connections</h1>    
      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          Company,
          Batch
        } = connection;
        
        return (
          <div key={_id} className="flex my-4 p-4 border bg-green-50 w-1/2 mx-auto rounded-lg">
            <div>
              <img 
                src={photoUrl || "/default-avatar.png"} 
                className="w-20 h-20 rounded-full object-cover" 
                alt={`${firstName} ${lastName}`} 
              />
            </div>
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl mb-2">
                {`${firstName} ${lastName}`}
              </h2> 
              {Company && Batch && (
                <p className="text-gray-600 mb-2">{`${Company} ${Batch}`}</p>
              )}
              {about && (
                <p className="text-gray-700 mb-2">{about}</p>
              )}
              {age && gender && (
                <p className="text-gray-500 text-sm">{`${age}, ${gender}`}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;