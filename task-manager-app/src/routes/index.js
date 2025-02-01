import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";


import AuthLayout from "../Layout";
import LoginPage from "../pages/LoginPage";
import TaskList from "../component/TaskList";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element:<AuthLayout><RegisterPage /></AuthLayout> ,
      },
      {
        path: "login",
        element:<AuthLayout><LoginPage /></AuthLayout> ,
      },
      {
        path: "/",
        element:  <TaskList />,
       
      },
    ],
  },
]);

export default router;
