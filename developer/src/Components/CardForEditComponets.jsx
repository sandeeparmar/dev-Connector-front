import React from 'react';
import { Heart, X, MapPin, Calendar } from 'lucide-react';

const CardForEditComponents = ({ user }) => {
  const { photoUrl,
  firstName,
  lastName ,
  about,
  emailID ,
  skills = [],
  Company,
  Batch,
  Address
 } = user ;
   return (
  <div className={`bg-base-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full`}>
      {/* Image Section */}
      <div className="relative">
        <img 
          src={photoUrl ? photoUrl : "/vite.svg" } 
          alt={firstName+' '+ lastName  }
          className="w-full h-55 object-cover"
        />
        {Batch && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {Batch}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {firstName + ' ' + lastName }
        </h3>
        
        {/* Company Tag */}
        {Company && (
          <div className="flex items-center mb-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {Company}
            </span>
          </div>
        )}
        
        {/* Location */}
        {Address && (
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{Address ? Address :  "India"}</span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {about}
        </p>

       
        
        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
         {emailID && (
          <div className="flex items-center mb-3">
            <p>Email : </p>
            <span className=" text-gray-700 mx -1  px-3 py-1 rounded-full text-xs font-medium">
              {emailID}
            </span>
          </div>
        )}


        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <X size={18} />
            <span>Rejected</span>
          </button>
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Heart size={18} />
            <span>Accepted</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardForEditComponents ;