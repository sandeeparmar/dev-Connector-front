import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  // Memoized review request function to prevent unnecessary re-renders
  const reviewRequest = useCallback(async (status, requestId) => {
    if (processingRequests.has(requestId)) return; // Prevent double clicks
    
    setProcessingRequests(prev => new Set(prev).add(requestId));
    
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error reviewing request:', err);
      setError(`Failed to ${status} request. Please try again.`);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  }, [dispatch, processingRequests]);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(res?.data?.data || []));
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="text-lg">Loading requests...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center my-10">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchRequests}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  // No requests state
  if (!requests || requests.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-2xl font-semibold text-gray-600">No Requests Found</h1>
        <p className="text-gray-500 mt-2">You don't have any pending requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="text-center my-10 max-w-4xl mx-auto px-4">
      <h1 className="font-bold text-black text-5xl mb-8">Requests</h1>
      
      <div className="space-y-4">
        {requests.map((request) => {
          const { 
            _id, 
            firstName = '', 
            lastName = '', 
            photoUrl, 
            about = '', 
            Company, 
            Batch 
          } = request.fromUserId || {};
          
          const isProcessing = processingRequests.has(request._id);
          
          return (
            <div 
              key={request._id} 
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-gray-200 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                {photoUrl ? (
                  <img 
                    src={photoUrl} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" 
                    alt={`${firstName} ${lastName}`}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png'; // Fallback image
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-xl">
                    {firstName?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-grow text-left mx-0 md:mx-6 mb-4 md:mb-0">
                <h2 className="font-bold text-xl text-gray-800 mb-1">
                  {firstName} {lastName}
                </h2>
                {Company && Batch && (
                  <p className="text-gray-600 font-medium mb-2">
                    {Company} - {Batch}
                  </p>
                )}
                {about && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {about}
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 flex-shrink-0">
                <button 
                  className="btn btn-outline-danger px-4 py-2 min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => reviewRequest("rejected", request._id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "..." : "Reject"}
                </button>
                <button 
                  className="btn btn-success px-4 py-2 min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => reviewRequest("accepted", request._id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "..." : "Accept"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;