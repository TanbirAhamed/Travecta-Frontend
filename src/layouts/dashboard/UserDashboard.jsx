import { GiCommercialAirplane } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router";
import InfoSection from "../../pages/dashboard/userDashboard/InfoSection";

const UserDashboard = () => {
    return (
        <div className="mt-10 max-w-[1536px] mx-auto">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-2xl md:text-4xl flex gap-3 items-center">Welcome back, Regular User! <GiCommercialAirplane className="text-cyan-700" /></h1>
                    <p>Manage your trips and travel plans</p>
                </div>
                <Link to={'/createtrip'} className="btn bg-cyan-600 text-white rounded-xl hover:bg-cyan-500"><span className="text-xl">+</span> Create Trips</Link>
            </div>
            <InfoSection />
            {/* Tabs */}
            <div className="flex items-center justify-evenly border rounded-full bg-[#696969] border-gray-200 mb-6 text-sm md:text-base font-medium py-1 mt-10">
                <NavLink
                    to="/userdashboard/budgetexpenses"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 bg-white rounded-full shadow-sm"
                            : "px-6 py-1 text-gray-600 hover:text-blue-600"
                    }
                >
                    Expenses
                </NavLink>
                <NavLink
                    to="/userdashboard/mytrips"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 bg-white rounded-full shadow-sm"
                            : "px-6 py-1 text-gray-600 hover:text-blue-600"
                    }
                >
                    My Trips
                </NavLink>
                <NavLink
                    to="/userdashboard/joinedtrips"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 bg-white rounded-full shadow-sm"
                            : "px-6 py-1 text-gray-600 hover:text-blue-600"
                    }
                >
                    Joined Trips
                </NavLink>
                <NavLink
                    to="/userdashboard/joinrequests"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 bg-white rounded-full shadow-sm"
                            : "px-6 py-1 text-gray-600 hover:text-blue-600"
                    }
                >
                    Join Requests
                </NavLink>
            </div>
            {/* Main Content */}
            <div >
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard