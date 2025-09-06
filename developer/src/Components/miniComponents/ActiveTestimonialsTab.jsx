import React from "react";
import { testimonials } from "../../utils/testimonials";
import { Star ,Heart , TrendingUp , MessageCircle } from "lucide-react";

const ActiveTestimonialsTab = () => {
   return (
      <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  What Our Users Say
                </h2>
                <p className="text-xl text-gray-400">Real feedback from real customers</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center font-bold text-black mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Join Thousands of Happy Users</h3>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span>98% Satisfaction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span>50% Growth</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
   )
} 

export default ActiveTestimonialsTab ;