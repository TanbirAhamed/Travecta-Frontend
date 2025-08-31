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
            {/* Tabs + Home Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-center border rounded-xl bg-[#f0f0f0] border-gray-200 mb-6 gap-25 text-sm md:text-base font-medium py-0.5 mt-10">
                <NavLink
                    to="/userDashboard/myReviews"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-0.5 text-blue-600 border-b-2 border-blue-600 w-52 text-center rounded-xl"
                            : "px-4 py-0.5 text-gray-700 hover:text-blue-600"
                    }
                >
                    Expenses
                </NavLink>
                <NavLink
                    to="/userdashboard/mytrips"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-0.5 text-blue-600 bg-white w-52 text-center rounded-xl"
                            : "px-4 py-0.5 text-gray-600 hover:text-blue-600"
                    }
                >
                    My Trips
                </NavLink>
                <NavLink
                    to="/userDashboard/myApplication"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-0.5 text-blue-600 border-b-2 border-blue-600 w-52 text-center rounded-xl"
                            : "px-4 py-0.5 text-gray-600 hover:text-blue-600"
                    }
                >
                    Joined Trips
                </NavLink>
                <NavLink
                    to="/userDashboard/myReviews"
                    className={({ isActive }) =>
                        isActive
                            ? "px-4 py-0.5 text-blue-600 border-b-2 border-blue-600 w-52 text-center rounded-xl"
                            : "px-4 py-0.5 text-gray-600 hover:text-blue-600"
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