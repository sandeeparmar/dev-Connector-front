import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Main Content - Header, Quick Links, and Contact in horizontal line */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Header Section */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src="/assest/dev.jpg" 
                alt="Dev Connector" 
                className="w-8 h-8 object-cover rounded-lg"
              />
            </div>
            <span className="ml-4 text-2xl font-bold text-gray-900">Dev Connector</span>
          </div>
          <p className="text-gray-600 text-base max-w-sm mx-auto lg:mx-0">
            Connecting developers with opportunities. Building the future of tech, one connection at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Quick Links
          </h3>
          <div className="space-y-4">
            {['Home', 'About Us', 'Services'].map((link, index) => (
              <a 
                key={index}
                href={`/${link.toLowerCase().replace(' ', '-')}`} 
                className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform py-1"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            Get in Touch
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm text-gray-600">
                <p>N9 street , BusinessPark</p>
                <p>Akd , MP 465337</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-gray-600" />
              </div>
              <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                +91 9424572893
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-gray-600" />
              </div>
              <a href="mailto:sandeepparmard5656@gmail.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                sandeepprmard5656@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {[
            { icon: Linkedin, color: 'hover:text-blue-600', bg: 'hover:bg-blue-50' , href : "https://www.linkedin.com/in/sandeep-parmar-076b15292/"},
            { icon: Twitter, color: 'hover:text-sky-500', bg: 'hover:bg-sky-50' , href : "#"},
            { icon: Instagram, color: 'hover:text-pink-600', bg: 'hover:bg-pink-50' , href :"https://www.instagram.com/sandeep______parmar_/" },
            { icon: Github, color: 'hover:text-gray-900', bg: 'hover:bg-gray-100' , href :"https://github.com/sandeeparmar" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color} ${social.bg} transform hover:-translate-y-1`}
            >
              <social.icon className="h-5 w-5" />

            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="text-gray-500 text-sm font-medium">
                © 2025 Dev Connector . All Right Reserved 
              </p>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-white bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-2xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <span className="text-sm font-medium">Back to top</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;