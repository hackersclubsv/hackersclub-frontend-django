import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import CampusInfo from './pages/CampusInfo';
import CareerDev from './pages/CareerDev';
import TechDojo from './pages/TechDojo';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/layout/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/campusinfo" element={<CampusInfo />} />
      <Route path="/careerdev" element={<CareerDev />} />
      <Route path="/techdojo" element={<TechDojo />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/postdetail" element={<PostDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
