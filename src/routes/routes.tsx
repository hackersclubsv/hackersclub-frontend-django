import Home from '../pages/Home';
import CampusInfo from '../pages/CampusInfo';
import CareerDev from '../pages/CareerDev';
import TechDojo from '../pages/TechDojo';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserProfile from '../pages/UserProfile';


export const routes = [
  {
    path: '/',
    component: <Home />,
    name: 'Home',
  },
  {
    path: '/campusinfo',
    component: <CampusInfo />,
    name: 'Campus Info',
  },
  {
    path: '/careerdev',
    component: <CareerDev />,
    name: 'Career Dev',
  },
  {
    path: '/techdojo',
    component: <TechDojo />,
    name: 'Tech Dojo'
  },
  {
    path: '/login',
    component: <Login />,
    name: 'Login'
  },
  {
    path: '/register',
    component: <Register />,
    name: 'Register'
  },
  {
    path: '/username',
    component: <UserProfile />,
    name: 'Profile'
  },
  
]