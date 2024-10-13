import React, { useState } from 'react';
import { ArrowRight, Menu, X } from "lucide-react";
import dashboardImage from './dashboard.jpg'; // Ensure the image path is correct
import performanceImage from './performance.jpg'; // Ensure the image path is correct
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';


const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const offset = 80; // Adjust this value based on your navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};



export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', { username, email });
    console.log(`${process.env.REACT_APP_API_URL}/signup`);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      username : username,
      email : email
    })
    if(response.status === 200 || response.status === 201){
      toast.success("You will be notified with updates");

    }

    else{
      console.log(response.data)
      toast.error("An unexpected error occurred");
    }
    setUsername('');
    setEmail('');
  };

  const features = [
    {
      title: "API Monitoring",
      description: "Real-time monitoring of your APIs to ensure optimal performance and uptime.",
      icon: "🔍"
    },
    {
      title: "API Performance Testing",
      description: "Comprehensive testing to identify bottlenecks and optimize API performance.",
      icon: "⚡"
    },
    {
      title: "API Client Behaviour Simulation",
      description: "Simulate various client behaviors to test API resilience and responsiveness.",
      icon: "🤖"
    },
    {
      title: "API Security and Rate Limiting",
      description: "Implement robust security measures and rate limiting to protect your APIs.",
      icon: "🔒"
    },
    {
      title: "Real-time Alert Notifications",
      description: "Instant notifications for critical API issues and performance anomalies.",
      icon: "🚨"
    },
    {
      title: "API Usage Analytics",
      description: "Detailed analytics to understand API usage patterns and optimize accordingly.",
      icon: "📊"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
    <Toaster position="top-right" />
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">ProxyFlow</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Features</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">About</button>
              <button onClick={() => scrollToSection('signup')} className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Sign Up</button>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-2">
            <button onClick={() => { scrollToSection('features'); toggleMenu(); }} className="block px-4 py-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Features</button>
            <button onClick={() => { scrollToSection('about'); toggleMenu(); }} className="block px-4 py-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">About</button>
            <button onClick={() => { scrollToSection('signup'); toggleMenu(); }} className="block px-4 py-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Sign Up</button>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-4 flex-grow">
        {/* Hero Section */}
        <div className="text-center py-24 md:py-40 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            The only API management tool{" "}
            <span className="text-purple-600 dark:text-purple-400">you'll ever need</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            ProxyFlow: Your all-in-one solution for API management. Monitor, test, and optimize your APIs with powerful features designed to enhance performance and security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => scrollToSection('signup')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-transform hover:scale-105">
              Get Started
            </button>
            
          </div>
        </div>

        {/* Feature Sections */}
        <div id="features" className="space-y-20 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-50 dark:hover:bg-gray-700">
                <div className="group">
                  <div className="text-4xl mb-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Monitoring Section */}
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[70vh] mb-16 animate-slide-in-left">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Real-Time API Monitoring
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Track API performance metrics in real time, set up automated health checks, and create customizable dashboards to visualize your API's status at a glance.
            </p>
            <button onClick={() => scrollToSection('signup')} className="flex items-center text-purple-600 hover:text-purple-700 font-semibold group">
              Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={dashboardImage}
              alt="API Monitoring Dashboard"
              className="rounded-lg shadow-2xl transition-transform hover:scale-105"
            />
          </div>
        </div>

        {/* API Performance Testing Section */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between min-h-[70vh] mb-16 animate-slide-in-right">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:ml-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Comprehensive Performance Testing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Simulate high traffic scenarios, identify breaking points, and measure response times to ensure your APIs perform optimally under any condition.
            </p>
            <button onClick={() => scrollToSection('signup')} className="flex items-center text-purple-600 hover:text-purple-700 font-semibold group">
              Explore features <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={performanceImage}
              alt="Performance Testing Graph"
              className="rounded-lg shadow-2xl transition-transform hover:scale-105"
            />
          </div>
        </div>

        {/* Sign Up Form */}
        <div id="signup" className="max-w-md mx-auto my-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Sign Up for Updates</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <input
              style={{
                color : 'white',
              }}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
              style={{
                color : 'white',
              }}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">ProxyFlow</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">Contact Us</a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
            © 2023 ProxyFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}