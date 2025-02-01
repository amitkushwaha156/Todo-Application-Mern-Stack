import { HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";


const ColorModeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const currentTheme = localStorage.getItem("currentTheme");
      if (currentTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else if (!currentTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }, []);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
  
      // Toggle dark class on html element
      if (!isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("currentTheme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("currentTheme", "light");
      }
    };
  
    return (
      <button
        onClick={toggleDarkMode}
        className="px-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {isDarkMode ? (
          <HiMoon className="h-5 w-5" />
        ) : (
          <HiSun className="h-5 w-5" />
        )}
      </button>
    );
  };

export default  ColorModeButton ;
