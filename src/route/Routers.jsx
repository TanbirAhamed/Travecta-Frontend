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
import ViewDetails from '../pages/viewDetails/ViewDetails';
import Overview from '../pages/viewDetails/Overview';
import Itinerary from '../pages/viewDetails/Itinerary';
import Budget from '../pages/viewDetails/Budget';
import Photos from '../pages/viewDetails/Photos';
import AdminDashboard from '../layouts/dashboard/adminDashboard';
import AllTrips from '../pages/dashboard/adminDashboard/AllTrips';
import AllUsers from '../pages/dashboard/adminDashboard/AllUsers';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route index element={<AllTrips />} />
          <Route path='allusers' element={<AllUsers />} />
        </Route>


        <Route path='/userdashboard' element={<PrivateRoute><UserDashboard /></PrivateRoute>}>
          <Route path='mytrips' element={<MyTrips />} />
          <Route index element={<BudgetExpenses />} />
          <Route path='joinedtrips' element={<JoinedTrips />} />
          <Route path='joinrequests' element={<JoinRequests />} />
        </Route>
        <Route path='createtrip' element={<PrivateRoute><CreateTrips /></PrivateRoute>} />
        <Route path='exploretrips' element={<ExploreTrips />} />
        <Route
          path='/details/:id' element={<ViewDetails />}
        >
          <Route index element={<Overview />} />
          <Route path='itinerary' element={<Itinerary />} />
          <Route path='budget' element={<Budget />} />
          <Route path='photos' element={<Photos />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;