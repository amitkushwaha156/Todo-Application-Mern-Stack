import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set visible to true after the component mounts (after the page load)
    setVisible(true);
  }, []); // Empty dependency array ensures it only runs after the component mounts

  return (
    <div 
      className={`transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-full bg-gray-200 animate-pulse dark:bg-gray-700 rounded mb-2"></div>
    </div>
  );
};

export default Loader;
