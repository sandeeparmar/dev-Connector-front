import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant.js';
import EditProfile from './EditProfile.jsx';

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    emailID: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true); // Default to login page

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailID.trim()) {
      newErrors.emailID = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailID)) {
      newErrors.emailID = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = useCallback((type, message, duration = 3000) => {
    if (type === 'success') {
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), duration);
    } else {
      setLoginError(message);
      setTimeout(() => setLoginError(''), duration);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailID: formData.emailID.trim(),
        password: formData.password
      }, { withCredentials: true });
      
      dispatch(addUser(res.data));
      showToast('success', 'Login successful!');
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err?.response?.data || "Login failed");
      
      const errorMessage = err.response?.status === 401 
        ? "Invalid email or password" 
        : err.response?.data?.message || "Login failed. Please try again.";
      
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const togglePage = () => {
    setIsLoginPage(prev => !prev);
    setFormData({ emailID: '', password: '' });
    setErrors({});
    setLoginError('');
  };

  return (
    <>
      {/* Page Toggle Button */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6">
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={togglePage}
            className="group inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200"
          >
            {isLoginPage ? (
              <>
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">New User? Sign Up Here</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Existing User? Login Here</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Login Page */}
      {isLoginPage && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="w-full max-w-md relative z-10">
            {/* Main Login Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg group">
                  <Lock className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Please sign in to your account</p>
              </div>

              {/* Error Display */}
              {loginError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-shake">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-medium">{loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="emailID" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors duration-500 ${
                        errors.emailID ? 'text-red-400' : 'text-blue-700 group-focus-within:text-blue-800'
                      }`} />
                    </div>
                    <input
                      id="emailID"
                      name="emailID"
                      type="email"
                      autoComplete="email"
                      value={formData.emailID}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.emailID 
                          ? 'border-red-300 bg-red-50/50 focus:ring-red-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.emailID && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.emailID && (
                    <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.emailID}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors duration-200 ${
                        errors.password ? 'text-red-400' : 'text-gray-800 group-focus-within:text-blue-500'
                      }`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.password 
                          ? 'border-red-300 bg-red-50/50 focus:ring-red-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="group w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="group w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <button className="text-blue-600 hover:text-blue-700 underline font-medium">
                Terms of Service
              </button>
              {' '}and{' '}
              <button className="text-blue-600 hover:text-blue-700 underline font-medium">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {loginSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Login successful! Redirecting...</span>
          </div>
        </div>
      )}

      {/* Signup Page */}
      {!isLoginPage && <EditProfile />}
    </>
  );
};

export default Login;