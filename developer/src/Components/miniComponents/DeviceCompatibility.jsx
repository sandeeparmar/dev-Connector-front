import React  from "react";
import { Laptop , Smartphone , Tablet } from "lucide-react";

const Device = () => {
   const devices = [
    { name: "Desktop", icon: <Laptop className="w-12 h-12" />, users: "2.1M" },
    { name: "Mobile", icon: <Smartphone className="w-12 h-12" />, users: "8.7M" },
    { name: "Tablet", icon: <Tablet className="w-12 h-12" />, users: "1.2M" }
  ];


  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-center mb-12">Works Everywhere</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {devices.map((device, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                        <div className="text-blue-400 mb-4 flex justify-center">
                          {device.icon}
                        </div>
                        <h4 className="text-xl font-semibold mb-2">{device.name}</h4>
                        <p className="text-gray-400">{device.users} users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default Device ;
