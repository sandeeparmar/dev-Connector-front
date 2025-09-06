import React from "react";
import PlansComponent from "./PlansComponents";
import { Shield } from "lucide-react";

const ActivePricingTab = () =>{
    return (
      
           <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Choose Your Plan
                </h2>
                <p className="text-xl text-gray-400">Flexible pricing for every need</p>
              </div>

              <PlansComponent/>
             

              {/* Money Back Guarantee */}
              <div className="text-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/20">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">30-Day Money Back Guarantee</h3>
                <p className="text-gray-300">Try risk-free with our full refund policy</p>
              </div>

            </div>
         
    )
} ;

export default ActivePricingTab ;