import { Route, Routes } from 'react-router';
import Home from '../layouts/home/Home';
import MainLayout from '../layouts/main/MainLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import UserDashboard from '../layouts/Dashboard/UserDashboard';
import MyTrips from '../pages/dashboard/userDashboard/MyTrips';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userdahboard' element={<UserDashboard />}>
          <Route path='mytrips' element={<MyTrips />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;