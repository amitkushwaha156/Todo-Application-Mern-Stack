import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* <TaskList></TaskList> */}
      <Outlet></Outlet>
    </>
  );
}

export default App;
