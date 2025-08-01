import React, { useState, useCallback } from 'react';
import { Heart, X, MapPin, Mail, Building, Calendar } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/FeedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Early return if no user data
  if (!user) {
    return (
      <div className="bg-gray-100 rounded-xl shadow-lg max-w-sm mx-auto my-4 p-6">
        <div className="text-center text-gray-500">
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  // Destructure user data with fallbacks
  const {
    photoUrl,
    firstName = '',
    lastName = '',
    about = '',
    emailID,
    skills = [],
    Company,
    Batch,
    Address,
    _id
  } = user;

  // Memoized request handler to prevent unnecessary re-renders
  const handleSendRequest = useCallback(async (status, userId) => {
    if (isProcessing) return; // Prevent double clicks
    
    setIsProcessing(true);
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      
      // Remove user from feed after successful request
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error('Error sending request:', err);
      setError(`Failed to ${status === 'interested' ? 'send interest' : 'reject'}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch, isProcessing]);

  const fullName = `${firstName} ${lastName}`.trim();
  const displayName = fullName || 'Unknown User';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm mx-auto my-4">
      {/* Image Section */}
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          <img 
            src={photoUrl || "/vite.svg"} 
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/vite.svg"; // Fallback image
            }}
          />
        </div>
        
        {/* Batch Badge */}
        {Batch && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {Batch}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {displayName}
        </h3>
        
        {/* Company Tag */}
        {Company && (
          <div className="flex items-center mb-3">
            <Building size={16} className="mr-2 text-green-600" />
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {Company}
            </span>
          </div>
        )}
        
        {/* Location */}
        {Address && (
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">{Address}</span>
          </div>
        )}

        {/* Email */}
        {emailID && (
          <div className="flex items-center text-gray-600 mb-3">
            <Mail size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm break-all">{emailID}</span>
          </div>
        )}
        
        {/* Description */}
        {about && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {about}
            </p>
          </div>
        )}
        
        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">🛠️</span>
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              isProcessing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md'
            }`}
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isProcessing}
          >
            <X size={18} />
            <span>{isProcessing ? 'Processing...' : 'Pass'}</span>
          </button>
          
          <button
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              isProcessing 
                ? 'bg-blue-300 text-white cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
            }`}
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isProcessing}
          >
            <Heart size={18} className={isProcessing ? '' : 'hover:scale-110 transition-transform'} />
            <span>{isProcessing ? 'Processing...' : 'Interested'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;