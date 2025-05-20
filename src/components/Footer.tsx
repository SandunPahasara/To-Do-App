import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
      <p>TaskMaster &copy; {currentYear} &mdash; All tasks are stored locally in your browser</p>
    </footer>
  );
};

export default Footer;