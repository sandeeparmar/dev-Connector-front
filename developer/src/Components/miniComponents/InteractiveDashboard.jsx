import React, { useEffect, useState }  from "react";
import { TrendingUp , Calendar , Clock  ,Crown  } from "lucide-react";

const Dashboard = () => {
    const [userCount , setUserCount ]  =useState (12345) ;
    
    useEffect(() =>{ 
       const interval = setInterval(() => {
          setUserCount(prev => prev + Math.floor(Math.random()*3)) ;
       } , 5000) ;
       return () => clearInterval(interval) ;
    }) ;


    return (
       <div>
          <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Interactive Dashboard Preview
          </h2>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Real-time Analytics</h3>
                
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Performance Score</span>
                    <span className="text-2xl font-bold text-green-400">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-[98.5%] transition-all duration-1000"></div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Active Users</span>
                    <span className="text-2xl font-bold text-blue-400">{userCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% this week</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold">847</div>
                    <div className="text-sm text-gray-400">Events Today</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold">2.3s</div>
                    <div className="text-sm text-gray-400">Avg Response</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-lg font-semibold mb-4">Live Activity Feed</h4>
                  <div className="space-y-3">
                    {['New user registration', 'Premium upgrade completed', 'API integration successful', 'Security scan passed'].map((activity, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">{activity}</span>
                        <span className="text-xs text-gray-500 ml-auto">just now</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {['Revenue', 'Users', 'Performance'].map((metric, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {i === 0 ? '$847K' : i === 1 ? '12.8K' : '99.9%'}
                      </div>
                      <div className="text-xs text-gray-400">{metric}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg p-6 border border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Premium Features Unlocked</h4>
                      <p className="text-sm text-gray-400">All advanced tools available</p>
                    </div>
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       </div>
    )
} ;

export default Dashboard ;