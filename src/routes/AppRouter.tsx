import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { routes } from './routes';

// type item = {
//   path: string;
//   component: JSX.Element;
//   name: string;
// }

const AppRouter = () => {
  const routers = routes.map((route, id) => (
    <Route 
      key={id}
      path={route.path}
      element={route.component}
    />
  )
  )
  return (
    <BrowserRouter>
        <Routes>
          {routers}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter