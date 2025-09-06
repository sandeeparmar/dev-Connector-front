import React, { useState, useEffect } from 'react';
import { Shield, Crown, Users, Award, Play, Check, X, Menu, Bell, Search, User, Download ,Globe } from 'lucide-react';
import Dashboard from './miniComponents/InteractiveDashboard';
import ActiveFeatures from './miniComponents/ActiveTabFeature';
import ActivePricingTab from './miniComponents/ActivePricingTab';
import ActiveTestimonialsTab from './miniComponents/ActiveTestimonialsTab';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';

const PremiumPage = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userCount, setUserCount] = useState(12847);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyClick = async () => {
   try{
     const order = await axios.post(BASE_URL + "/payment/create" , {
       amount : 6000 ,
       currency : "INR" ,
     }  , { 
      withCredentials : true 
     }) ;
     const {amount  , keyId , currency , notes , orderId } = order.data 

     const options =  {
        key : keyId ,
        amount , 
        currency ,
        name : "Dev Connector" ,
        description : "Connect with Senior Developer" ,
        order_id : orderId ,
        prefill : {
           name : notes.firstName  + " "  + notes.lastName ,  
           email : notes.emailId ,
           contact : notes.phoneNum  
        }    
     }

     const rzp = new window.Razorpay(options) ;
     rzp.open() ;

   }
   catch(err){
      console.log(err); 
   }
  } ;

  const stats = [
    { label: "Active Users", value: userCount.toLocaleString(), icon: <Users className="w-6 h-6" /> },
    { label: "Projects Created", value: "2.4M+", icon: <Award className="w-6 h-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Shield className="w-6 h-6" /> },
    { label: "Countries", value: "150+", icon: <Globe className="w-6 h-6" /> }
  ];

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Welcome to Premium!</span>
            <button onClick={() => setShowNotification(false)}>
              <X className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}

       <nav className="fixed top-20 right-0 bg-black/20 border border-white/10 z-40  rounded-md">
      <select
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        className="bg-gray-600 text-white rounded-md px-3 py-1 focus:outline-none"
      >
        <option value="features">Features</option>
        <option value="pricing">Pricing</option>
        <option value="testimonials">Reviews</option>
      </select>
    </nav>
    
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button onClick={() => { setActiveTab('features'); setMobileMenuOpen(false); }} className="text-2xl">Features</button>
            <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }} className="text-2xl">Pricing</button>
            <button onClick={() => { setActiveTab('testimonials'); setMobileMenuOpen(false); }} className="text-2xl">Reviews</button>
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4">
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-purple-300 bg-clip-text text-transparent">
              Unlock Premium Power
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the ultimate platform with cutting-edge features, unlimited possibilities, and premium support.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button 
                onClick={() => handleBuyClick()}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Buy Now
              </button>
              <button 
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-center mb-2 text-yellow-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'features' && ( <ActiveFeatures  /> )}
          {activeTab === 'pricing' && ( <ActivePricingTab/> )}
          {activeTab === 'testimonials' && ( <ActiveTestimonialsTab/> )}
        </div>
      </section>

      <Dashboard/>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-purple-300 bg-clip-text text-transparent">
            Ready to Go Premium?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of satisfied users and unlock your potential today
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setShowNotification(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Your Journey
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
              <span>Download Brochure</span>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>30-day trial</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumPage;