import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-700 mb-8">
        This is a simple home page built with React and styled using Tailwind CSS.
      </p>
      <a
        href="/contacts"
        className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
      >
        Go to Contacts
      </a>
    </div>
  );
};

export default HomePage;
