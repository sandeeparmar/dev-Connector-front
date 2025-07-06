import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../utils/Constant.js";
import CardForEditComponents from './CardForEditComponets.jsx';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({user}) => {
    const [emailID , setEmailID]  = useState("Bailley@gmail.com") ;
    const [password , setPassword]  = useState("Bailley@123") ;
    const [isEditForm , setEditForm] = useState(false) ;
   const navigate = useNavigate() ;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Bailley',
    lastName: user?.lastName || 'Bottle',
    about: user?.about || 'i am  a Bottle',
    photoUrl: user?.photoUrl || 'https://www.themessycorner.in/cdn/shop/products/G4_1000x.jpg?v=1680947370',
    Address: user?.Address || 'raj guru marg',
    Batch: user?.Batch || '2026',
    Company: user?.Company || 'Refollium',
    age: user?.age || '18',
    phone: user?.phone || '9424572892',
    skills : user?.skills || [],
  });
  const [showGoodToast , setShowGoodToast] = useState(false) ;
  const [showBadToast , setShowBadToast] = useState(false) ;
  const dispatch = useDispatch() ;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =  await axios.patch(BASE_URL + "/profile/edit", formData , {
        withCredentials: true,
      });
      console.log(res?.data?.data) ;
      dispatch(addUser(res?.data?.data)) ;
      setShowGoodToast(true) ;
      setTimeout(() =>  setShowGoodToast(false) 
       , 3000) ;
       return navigate("/") ;
    } catch (err) {
      console.error(err.response.data);
      setShowBadToast(true) ;
       setTimeout(() => 
        setShowBadToast(false)  , 3000) ;
    }
  };

  const handleSignup = async (e) => { 
     e.preventDefault();
    try {
      const res =  await axios.post(BASE_URL + "/signup", { ...formData , emailID , password } , {
        withCredentials: true,
      });
      console.log(res?.data?.data) ;
      dispatch(addUser(res?.data?.data)) ;
      setShowGoodToast(true) ;
      setTimeout(() =>  setShowGoodToast(false) 
       , 3000) ;
       setEditForm(true) ;
       return navigate("/profile") ;
    } catch (err) {
      console.error(err);
      setShowBadToast(true) ;
       setTimeout(() => 
        setShowBadToast(false)  , 3000) ;
    }
  } 




  return ( 
    <>
<div className="my-10 mx-10">
  <div className="w-full p-6 mt-10 bg-base-300 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">{isEditForm ? 'Edit Profile' : 'Signup'}</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* First Column - Form Fields */}
      <div className="lg:col-span-4 space-y-4">
        <form onSubmit={ isEditForm ? handleSubmit : handleSignup}>
          {/* First Name */}
          <div>
            <label htmlFor='firstName' className="block font-medium mb-1">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>


          { !isEditForm && <>

          {/* First Name */}
          <div>
            <label htmlFor='emailID' className="block font-medium mb-1">emailID</label>
            <input
              id="emailID"
              name="emailID"
              type="text"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="Password" className="block font-medium mb-1">Password</label>
            <input
              type="text"
              id="Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

            </>
          }

          {/* About */}
          <div>
            <label htmlFor="about" className="block font-medium mb-1">About</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="Address" className="block font-medium mb-1">Address</label>
            <textarea
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Profile Picture URL */}
          <div>
            <label htmlFor='photoUrl' className="block font-medium mb-1">Profile Picture URL</label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
      
        </form>
      </div>

      {/* Second Column - Remaining Form Fields */}
      <div className="lg:col-span-3 space-y-4">
        <form onSubmit={ isEditForm ? handleSubmit : handleSignup}>
          {/* Batch */}
          <div>
            <label htmlFor='Batch' className="block font-medium mb-1">Batch</label>
            <input
              type="number"
              id="Batch"
              name="Batch"
              value={formData.Batch}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor='Company' className="block font-medium mb-1">Company</label>
            <input
              type="text"
              id="Company"
              name="Company"
              value={formData.Company}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor='age' className="block font-medium mb-1">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor='phone' className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            {isEditForm ? 'Save Changes' : 'Sign up'}
          </button>

          <p  className= "text-center cursor-pointer py-2" onClick={ () => setEditForm(value => !value)}>
            {isEditForm ? "New user? Signup here" : "Existing user? Edit profile"}
 
          </p>

        </form>
      </div>

      {/* Third Column - User Card */}
      <div className="lg:col-span-5 flex justify-center">
        <CardForEditComponents user={formData} />
      </div>
    </div>
  </div>
</div>

     {showGoodToast && (
  <div className="fixed top-4 right-4 z-50 animate-slide-in">
    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>Profile saved successfully!</span>
    </div>
  </div>
)}

{showBadToast && (
  <div className="fixed top-4 right-4 z-50 animate-slide-in">
    <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>Something went wrong...</span>
    </div>
  </div>
)}

    </>
  );
};

export default EditProfile;