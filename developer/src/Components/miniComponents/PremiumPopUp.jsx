import { Check , X } from "lucide-react";
import React from "react";

const PremiumPopUp = () => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Welcome to Premium!</span>
                <button >
                  <X className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
  )
}
export default PremiumPopUp ;
