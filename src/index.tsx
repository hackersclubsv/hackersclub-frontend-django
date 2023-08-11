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
import Resources from './pages/Resources';
import Community from './pages/Community';
import About from './pages/About';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/layout/PrivateRoute';
import ForgetPassword from './pages/ForgetPassword';
import VarifyEmail from './pages/VarifyEmail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/postdetail" element={<PostDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path='/verify-email' element={<VarifyEmail />} />
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