import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import image from './image.webp';

const Home = () => {
  const generateLink = (path) => {
    const uniqueId = uuidv4();
    return `/${path}/${uniqueId}`;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f4f4f9]">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="#" className="text-2xl font-bold no-underline text-white">
          CareerConnect
        </Link>
        <nav>
          <Link to={generateLink('signUp')} className="no-underline">
            <button className="px-4 py-2 text-base bg-white text-blue-600 rounded-md shadow-md hover:scale-105 transition-transform duration-300">
              Sign Up
            </button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="flex justify-center w-full mb-6 image-div">
          <img src={image} alt="CareerConnect" className="w-full max-w-4xl rounded-xl shadow-lg" />
        </div>
        <p className="text-lg text-center text-gray-600 max-w-3xl leading-relaxed mb-10">
          Welcome to CareerConnect, your platform to reconnect with your alma mater, build professional networks, and discover new opportunities. Sign up today to stay informed and take the next step in your career journey.
        </p>

        {/* 🌟 FAQ Section */}
        <section className="w-full max-w-4xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-10 animate-fadeIn">
          <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wider drop-shadow-xl underline decoration-pink-500 decoration-4 underline-offset-8">
            💡 Frequently Asked Questions
          </h2>
          <div className="space-y-6 ">
            {[
              {
                q: 'What is CareerConnect?',
                a: 'CareerConnect is a platform to connect with your alumni, explore career opportunities, and grow your professional network.',
              },
              {
                q: 'Is it free to sign up?',
                a: 'Yes! Signing up and accessing most features on CareerConnect is completely free.',
              },
          
              {
                q: 'Can I post job opportunities?',
                a: 'Absolutely. Registered users can share job openings and refer others to help them land opportunities.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-20 transition duration-300 border border-white/20 shadow-md"
              >
                <h3 className="text-xl font-bold text-black mb-2">{item.q}</h3>
                <p className="text-m text-black tracking-wide leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 shadow-inner">
        <p className="m-0">
          &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
