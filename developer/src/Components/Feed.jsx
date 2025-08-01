import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Constant.js";
import { addFeed } from "../utils/FeedSlice.js";
import UserCard from "./UserCard.jsx";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed fetch error:", err);
      
      // Only navigate to login for authentication errors
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      } else {
        // Handle other errors gracefully
        setError("Failed to load feed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading feed...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Feed</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={getFeed}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No feed data loaded yet
  if (feed === null) {
    return null;
  }

  // Empty feed
  if (!feed || feed.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No New Users Found</h3>
          <p className="text-gray-600 mb-4">Check back later for new connections!</p>
          <button
            onClick={getFeed}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  // Display the first user from feed
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Discover New Connections</h2>
        <p className="text-sm text-gray-600">
          {feed.length} user{feed.length !== 1 ? 's' : ''} available
        </p>
      </div>
      <UserCard user={feed[0]} />
      
      {/* Optional: Show remaining count */}
      {feed.length > 1 && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            {feed.length - 1} more user{feed.length - 1 !== 1 ? 's' : ''} remaining
          </span>
        </div>
      )}
    </div>
  );
};

export default Feed;