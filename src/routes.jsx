import { createBrowserRouter } from "react-router-dom"; 
import React from "react";  
import StopWatch from "./component/StopWatch";
 
const routes = createBrowserRouter([ 
  {
    path:"/",
    element: <StopWatch/>
  }
]);

export default routes;
