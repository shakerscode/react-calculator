import { createBrowserRouter } from "react-router-dom"; 
import React from "react"; 
import Calculator from "./component/Calculator";
import StopWatch from "./component/StopWatch";
 
const routes = createBrowserRouter([
  
  {
    path:"/",
    element: <Calculator/>
  },
  {
    path:"/time-watch",
    element: <StopWatch/>
  }
]);

export default routes;
