import { GiCommercialAirplane } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router";
import InfoSection from "../../pages/dashboard/userDashboard/InfoSection";

const UserDashboard = () => {
    return (
        <div className="mt-6 md:mt-10 max-w-[1536px] mx-auto px-3 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-4xl flex flex-wrap gap-2 sm:gap-3 items-center">
                        Welcome back, Regular User!
                        <GiCommercialAirplane className="text-cyan-700 text-2xl sm:text-3xl md:text-4xl" />
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        Manage your trips and travel plans
                    </p>
                </div>
                <Link
                    to={"/createtrip"}
                    className="btn bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 px-3 sm:px-4 py-2 text-sm sm:text-base"
                >
                    <span className="text-lg sm:text-xl">+</span> Create Trips
                </Link>
            </div>

            {/* Info Section */}
            <div className="mt-6">
                <InfoSection />
            </div>

            {/* Tabs */}
            <div className="flex border-b mt-7 font-semibold">
                <NavLink
                    to="."
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 "
                            : "px-6 py-1 text-gray-800 hover:text-blue-600"
                    }
                >
                    Expenses
                </NavLink>
                <NavLink
                    to="/userdashboard/mytrips"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 "
                            : "px-6 py-1 text-gray-800 hover:text-blue-600"
                    }
                >
                    My Trips
                </NavLink>
                <NavLink
                    to="/userdashboard/joinedtrips"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 "
                            : "px-6 py-1 text-gray-800 hover:text-blue-600"
                    }
                >
                    Joined Trips
                </NavLink>
                <NavLink
                    to="/userdashboard/joinrequests"
                    className={({ isActive }) =>
                        isActive
                            ? "px-6 py-1 text-blue-600 "
                            : "px-6 py-1 text-gray-800 hover:text-blue-600"
                    }
                >
                    Join Requests
                </NavLink>
            </div>

            {/* Main Content */}
            <div className="pb-10">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;
