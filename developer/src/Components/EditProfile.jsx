import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utils/Constant.js";
import CardForEditComponents from './CardForEditComponets.jsx';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    about: user?.about || '',
    photoUrl: user?.photoUrl || '',
    Address: user?.Address || '',
    Batch: user?.Batch || '',
    Company: user?.Company || '',
    age: user?.age || '',
    gender: user?.gender || '', // Added gender field
    skills: user?.skills || [],
  });
  
  const [showGoodToast, setShowGoodToast] = useState(false);
  const [showBadToast, setShowBadToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useCallback((type, message, duration = 3000) => {
    if (type === 'success') {
      setShowGoodToast(true);
      setTimeout(() => setShowGoodToast(false), duration);
    } else {
      setShowBadToast(true);
      setErrorMessage(message);
      setTimeout(() => {
        setShowBadToast(false);
        setErrorMessage('');
      }, duration);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      showToast('error', 'First name is required');
      return false;
    }
    
    if (!user && (!emailID.trim() || !password.trim())) {
      showToast('error', 'Email and password are required for signup');
      return false;
    }

    if (!user && emailID && !/\S+@\S+\.\S+/.test(emailID)) {
      showToast('error', 'Please enter a valid email address');
      return false;
    }

    if (!user && password && password.length < 6) {
      showToast('error', 'Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Clean the form data
      const cleanedFormData = {};
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'age' || key === 'Batch') {
            cleanedFormData[key] = value ? parseInt(value, 10) : undefined;
          } else {
            cleanedFormData[key] = typeof value === 'string' ? value.trim() : value;
          }
        }
      });

      console.log('Sending update data:', cleanedFormData);
      
      const res = await axios.patch(BASE_URL + "/profile/edit", cleanedFormData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Update response:', res.data);
      
      if (res.data.success) {
        dispatch(addUser(res.data.data));
        showToast('success', res.data.message || 'Profile updated successfully!');
        setTimeout(() => navigate("/"), 2000);
      } else {
        showToast('error', res.data.message || 'Failed to update profile');
      }
      
    } catch (err) {
      console.error('Update error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      showToast('error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Clean the form data
      const cleanedFormData = {};
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'age' || key === 'Batch') {
            cleanedFormData[key] = value ? parseInt(value, 10) : undefined;
          } else {
            cleanedFormData[key] = typeof value === 'string' ? value.trim() : value;
          }
        }
      });

      const signupData = { 
        ...cleanedFormData, 
        emailID: emailID.trim(), 
        password: password.trim() 
      };

      // Remove undefined values
      Object.keys(signupData).forEach(key => {
        if (signupData[key] === undefined) {
          delete signupData[key];
        }
      });

      console.log('Sending signup data:', signupData);
      
      const res = await axios.post(BASE_URL + "/signup", signupData, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Signup response:', res.data);

      if (res.data.success) {
        dispatch(addUser(res.data.data));
        showToast('success', res.data.message || 'Account created successfully!');
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        showToast('error', res.data.message || 'Failed to create account');
      }

    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error response:', err.response?.data);
      
      let errorMessage = 'Failed to create account';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 409) {
        errorMessage = "Email Already Registered..";
      } else if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors.join(', ');
      }
      
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = user ? handleSubmit : handleSignup;

  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="w-full p-6 bg-white rounded-lg shadow-md min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {user ? 'Edit Profile' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* First Column - Primary Form Fields */}
              <div className="lg:col-span-4 space-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block font-medium mb-1 text-gray-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block font-medium mb-1 text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email and Password for signup only */}
                {!user && (
                  <>
                    <div>
                      <label htmlFor="emailID" className="block font-medium mb-1 text-gray-700">
                        Email Address *
                      </label>
                      <input
                        id="emailID"
                        name="emailID"
                        placeholder="john@example.com"
                        type="email"
                        autoComplete="email"
                        value={emailID}
                        onChange={(e) => setEmailID(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block font-medium mb-1 text-gray-700">
                        Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        minLength="6"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block font-medium mb-1 text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* About */}
                <div>
                  <label htmlFor="about" className="block font-medium mb-1 text-gray-700">
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    placeholder="Tell us about yourself..."
                    value={formData.about}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="Address" className="block font-medium mb-1 text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="Address"
                    name="Address"
                    placeholder="Your address..."
                    value={formData.Address}
                    onChange={handleChange}
                    rows={2}
                    autoComplete="street-address"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  />
                </div>

                {/* Profile Picture URL */}
                <div>
                  <label htmlFor="photoUrl" className="block font-medium mb-1 text-gray-700">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    id="photoUrl"
                    name="photoUrl"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Second Column - Additional Form Fields */}
              <div className="lg:col-span-3 space-y-4">
                {/* Batch */}
                <div>
                  <label htmlFor="Batch" className="block font-medium mb-1 text-gray-700">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    id="Batch"
                    name="Batch"
                    placeholder="2027"
                    value={formData.Batch}
                    onChange={handleChange}
                    min="1950"
                    max="2050"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="Company" className="block font-medium mb-1 text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="Company"
                    name="Company"
                    placeholder="Your company"
                    autoComplete="organization"
                    value={formData.Company}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block font-medium mb-1 text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    min="16"
                    max="120"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-medium mb-1 text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md mt-6 transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    user ? 'Save Changes' : 'Create Account'
                  )}
                </button>

                {!user && (
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sign in here
                    </button>
                  </p>
                )}
              </div>

              {/* Third Column - Preview Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Preview</h3>
                  <CardForEditComponents user={formData} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showGoodToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Success! Changes saved.</span>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {showBadToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{errorMessage || "Something went wrong. Please try again."}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;