import axios from 'axios';
import { AlignJustify, LogOut } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom" ;
import { BASE_URL } from '../utils/Constant';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector( (store) => store.user) ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const handleLogout = async () => { 
      try{
          await axios.post(BASE_URL + "/logout" , {} ,{withCredentials : true,}) ;
          dispatch(removeUser()) ;
          return navigate("/login") ;
      } 
      catch(err){
        console.err(err) ;
      }
  } ;



  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/assest/dev.jpg" 
                alt="Company Logo" 
                className="w-8 h-8 object-contain rounded-full"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Dev - Connector</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:bg-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Profile
              </Link>
              
              {/* Dropdown Menu */}
              <div className="relative group">
                <a
                  className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center cursor-pointer"
                >
                  Features
                </a>
                
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      to="/connections"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Connections
                    </Link>
                    <Link
                      to="/requests"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      ConnectionRequests
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                onClick={handleLogout}
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                logout
              </Link>
            </div>
          </div>

        {/*image in right side*/}
          <div className="hidden md:flex justify-evenly items-center gap-2">
            <p className="text-sm font-medium text-gray-700 mx-4">
              Welcome {user ? user.firstName : 'Vite'}
            </p>
            <img 
              src={user ? user.photoUrl : "/vite.svg"} 
              alt="User" 
              className="w-8 h-8 object-cover rounded-full"
            />
        </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
             
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <AlignJustify/>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {(
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            <a
              href="/"
              className="text-gray-900 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/profile"
              className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </a>
          {/* Dropdown Menu */}
          <div className="relative group">
            <a
              className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center cursor-pointer"
            >
              Features
            </a>
            
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link
                  to="/connections"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  ConnectionRequests
                </Link>
              </div>
            </div>
          </div>
            <a
              href="/portfolio"
              className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Portfolio
            </a>
             <div className="hidden md:flex justify-evenly items-center gap-2">
                 <p className="text-sm font-medium text-gray-700 mx-4">
                      Welcome {user ? user.firstName : 'Vite'}
                 </p>
              <img 
                src={user ? user.photoUrl : "/vite.svg"} 
                alt="User" 
                className="w-8 h-8 object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;