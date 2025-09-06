import React ,{ useState} from "react";
import { plans  } from "../../utils/plans";
import { Check } from "lucide-react";

const PlansComponent = () => {
    const [selectedPlan, setSelectedPlan] = useState('pro');

    return (

           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                  <div 
                    key={index}
                    className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                      plan.popular 
                        ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' 
                        : 'border-white/10 hover:border-white/20'
                    } ${selectedPlan === plan.name.toLowerCase() ? 'ring-2 ring-yellow-400' : ''}`}
                    onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-end justify-center mb-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-400 ml-1">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}>
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
    )
}
export default PlansComponent ; 