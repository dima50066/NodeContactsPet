import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">Welcome to the Home Page</h1>
      <p className="text-base md:text-lg text-gray-700 mb-8 text-center">
        This is a simple home page built with React and styled using Tailwind CSS.
      </p>
      <a
        href="/contacts"
        className="px-4 py-2 md:px-6 md:py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200 w-full md:w-auto text-center"
      >
        Go to Contacts
      </a>
    </div>
  );
};

export default HomePage;
