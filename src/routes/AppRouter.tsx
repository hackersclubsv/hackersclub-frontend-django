import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CampusInfo from '../pages/CampusInfo';
import CareerDev from '../pages/CareerDev';
import TechDojo from '../pages/TechDojo';
import Login from '../pages/Login';
import UserProfile from '../pages/UserProfile';

import { exampleuser } from '../dummy/exampleuser';
import PostDetailPage from '../pages/PostDetailPage';
import { exampleposts } from '../dummy/exampleposts';
import Register from '../pages/Register';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campusinfo" element={<CampusInfo />} />
      <Route path="/careerdev" element={<CareerDev />} />
      <Route path="/techdojo" element={<TechDojo />} />(
      <Route
        path="/userprofile"
        element={<UserProfile user={exampleuser[0]} />}
      />
      <Route
        path="/postdetail"
        element={<PostDetailPage postDetail={exampleposts[0]} />}
      />
      <Route
        path="/login"
        element={
          <Login />
        }
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
