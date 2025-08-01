import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter, Instagram, Github, Heart, Code } from 'lucide-react';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Monitor scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const quickLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'About Us', href: '/about', icon: '👥' },
    { name: 'Services', href: '/services', icon: '⚙️' },
    { name: 'Contact', href: '/contact', icon: '📧' },
    { name: 'Privacy Policy', href: '/privacy', icon: '🔒' }
  ];

  const socialLinks = [
    { 
      icon: Linkedin, 
      color: 'hover:text-blue-600', 
      bg: 'hover:bg-blue-50', 
      href: "https://www.linkedin.com/in/sandeep-parmar-076b15292/",
      name: 'LinkedIn'
    },
    { 
      icon: Twitter, 
      color: 'hover:text-sky-500', 
      bg: 'hover:bg-sky-50', 
      href: "https://twitter.com",
      name: 'Twitter'
    },
    { 
      icon: Instagram, 
      color: 'hover:text-pink-600', 
      bg: 'hover:bg-pink-50', 
      href: "https://www.instagram.com/sandeep______parmar_/",
      name: 'Instagram'
    },
    { 
      icon: Github, 
      color: 'hover:text-gray-900', 
      bg: 'hover:bg-gray-100', 
      href: "https://github.com/sandeeparmar",
      name: 'GitHub'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-t border-gray-200/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header Section with Animation */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6 group">
            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <img 
                src="/assest/dev.jpg" 
                alt="Dev Connector" 
                className="relative w-10 h-10 object-cover rounded-2xl z-10"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Code className="hidden w-10 h-10 text-white z-10" />
            </div>
            <span className="ml-6 text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Dev Connector
            </span>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Connecting developers with opportunities worldwide. Building the future of tech, one meaningful connection at a time.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>by developers, for developers</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          
          {/* Quick Links Card */}
          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:bg-white/80 transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Quick Links
              </h3>
            </div>
            <nav className="space-y-4">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="group/link flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-2 py-2 px-3 rounded-xl hover:bg-blue-50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-lg group-hover/link:scale-125 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <span className="font-medium group-hover/link:font-semibold transition-all duration-200">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Card */}
          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:bg-white/80 transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                Get in Touch
              </h3>
            </div>
            <div className="space-y-6">
              <div className="group/item flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-gradient-to-br group-hover/item:from-blue-100 group-hover/item:to-purple-100 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-300" />
                </div>
                <div className="text-sm text-gray-600 group-hover/item:text-gray-800 transition-colors duration-200">
                  <p className="font-medium">N9 Street, Business Park</p>
                  <p>Akd, MP 465337, India</p>
                </div>
              </div>
              
              <div className="group/item flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-gradient-to-br group-hover/item:from-green-100 group-hover/item:to-blue-100 transition-all duration-300">
                  <Phone className="h-5 w-5 text-gray-600 group-hover/item:text-green-600 transition-colors duration-300" />
                </div>
                <a 
                  href="tel:+919424572893" 
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium group-hover/item:text-green-700"
                >
                  Call 
                </a>
              </div>
              
              <div className="group/item flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-gradient-to-br group-hover/item:from-purple-100 group-hover/item:to-pink-100 transition-all duration-300">
                  <Mail className="h-5 w-5 text-gray-600 group-hover/item:text-purple-600 transition-colors duration-300" />
                </div>
                <a 
                  href="mailto:sandeepparmard5656@gmail.com" 
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium group-hover/item:text-purple-700 break-all"
                >
                 click it 
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Card */}
          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:bg-white/80 transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                Stay Updated
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest tech insights and connection opportunities.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="text-center mb-12">
          <h4 className="text-lg font-semibold text-gray-800 mb-8">Connect With Us</h4>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 ${social.color} ${social.bg} transform hover:-translate-y-2 hover:scale-110 hover:shadow-lg`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <social.icon className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  {social.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-200/50 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="text-gray-600 text-sm font-medium">
                © 2025 Dev Connector. All Rights Reserved
              </p>
              <div className="flex space-x-6 text-xs text-gray-500">
                <a href="/terms" className="hover:text-gray-700 transition-colors duration-200">Terms</a>
                <a href="/privacy" className="hover:text-gray-700 transition-colors duration-200">Privacy</a>
                <a href="/cookies" className="hover:text-gray-700 transition-colors duration-200">Cookies</a>
              </div>
            </div>
            
            {/* Scroll to Top Button */}
            {showScrollButton && (
              <button
                onClick={scrollToTop}
                disabled={isScrolling}
                className={`group flex items-center space-x-3 px-6 py-3 text-gray-600 hover:text-white bg-white/80 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-gray-200/50 ${isScrolling ? 'animate-bounce' : ''}`}
              >
                <span className="text-sm font-medium group-hover:font-semibold transition-all duration-200">
                  Back to top
                </span>
                <ArrowUp className={`h-4 w-4 transition-all duration-300 ${isScrolling ? 'animate-bounce' : 'group-hover:-translate-y-1 group-hover:scale-110'}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;