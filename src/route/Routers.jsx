import { Route, Routes } from 'react-router';
import Home from '../layouts/home/Home';
import MainLayout from '../layouts/main/MainLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import UserDashboard from '../layouts/Dashboard/UserDashboard';
import MyTrips from '../pages/dashboard/userDashboard/MyTrips';
import PrivateRoute from './PrivateRoute';
import CreateTrips from '../components/CreateTrips';
import BudgetExpenses from '../pages/dashboard/userDashboard/BudgetExpenses';
import JoinedTrips from '../pages/dashboard/userDashboard/JoinedTrips';
import JoinRequests from '../pages/dashboard/userDashboard/JoinRequests';
import ExploreTrips from '../pages/exploreTrips/ExploreTrips';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userdashboard' element={<PrivateRoute><UserDashboard /></PrivateRoute>}>
          <Route path='mytrips' element={<MyTrips />} />
          <Route path='budgetexpenses' element={<BudgetExpenses />} />
          <Route path='joinedtrips' element={<JoinedTrips />} />
          <Route path='joinrequests' element={<JoinRequests />} />
        </Route>
        <Route path='createtrip' element={<PrivateRoute><CreateTrips /></PrivateRoute>} />
        <Route path='exploretrips' element={<ExploreTrips />} />
      </Route>
    </Routes>
  );
};

export default Routers;