import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  
    setVisible(true);
  }, []); 

  return (
    <div className={`transition-opacity duration-700 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Toaster position="top-right" reverseOrder={false} />

          <Outlet></Outlet>
    </div>
  );
}

export default App;
