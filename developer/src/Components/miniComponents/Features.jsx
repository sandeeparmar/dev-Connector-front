import { Check , X , Zap , Shield  ,Crown , Users , Award , Globe} from "lucide-react";
import React from "react";

const features = () => {
   const feat = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Experience 10x faster processing with our advanced algorithms and optimized infrastructure.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Security",
      description: "Military-grade encryption and multi-layer security protocols protect your data 24/7.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Premium Analytics",
      description: "Deep insights and real-time analytics with AI-powered recommendations.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools with real-time sync and advanced permissions.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Priority Support",
      description: "24/7 dedicated support with 1-hour response time guarantee.",
      color: "from-red-400 to-rose-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global CDN",
      description: "Worldwide content delivery network ensuring optimal performance everywhere.",
      color: "from-indigo-400 to-blue-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feat.map((feature, index) => (
                  <div 
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
                  >
                    <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${feature.color} mb-6 group-hover:shadow-lg transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

  )
}
export default features ;
