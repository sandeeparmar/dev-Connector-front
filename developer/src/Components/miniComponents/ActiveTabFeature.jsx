import React, { useState } from "react";
import { Play } from "lucide-react";
import  Featurs  from './Features';
import Device from "./DeviceCompatibility";

const ActiveFeatures = () => {
    const [isVideoPlaying , setIsVideoPlaying] = useState(false) ;

   return (
      <div className="space-y-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Premium Features
                </h2>
                <p className="text-xl text-gray-400">Discover what makes us different</p>
              </div>

              {/* Feature Grid */}
              <Featurs/>

              {/* Interactive Demo Video */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">See It In Action</h3>
                  <p className="text-gray-300">Watch how our premium features work together</p>
                </div>
                <div className="relative bg-black/30 rounded-lg overflow-hidden aspect-video max-w-4xl mx-auto">
                  {!isVideoPlaying ? (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                      <button 
                        onClick={() => setIsVideoPlaying(true)}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-300 hover:scale-110"
                      >
                        <Play className="w-12 h-12" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
                        <p>Loading premium demo...</p>
                        <button 
                          onClick={() => setIsVideoPlaying(false)}
                          className="mt-4 text-sm text-gray-400 hover:text-white"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>


               <Device/>
            </div>
   ) 
} ;

export default ActiveFeatures ;