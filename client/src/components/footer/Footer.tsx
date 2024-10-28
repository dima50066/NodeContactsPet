import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-4 mt-auto px-4 sm:px-6">
      <div className="container mx-auto flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <p className="text-center sm:text-left">© 2024 by Dumitru Cuznetov.</p>
        <div className="flex space-x-4">
          <a href="mailto:dima50066@gmail.com" className="hover:text-gray-400 flex items-center space-x-1">
            <FaEnvelope />
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dumitru-cuznetov/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 flex items-center space-x-1"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/dima50066"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 flex items-center space-x-1"
          >
            <FaGithub />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
