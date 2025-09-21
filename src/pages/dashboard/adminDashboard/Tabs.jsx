import { NavLink } from "react-router";


const Tabs = () => {
    return (
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
                All Trips
            </NavLink>
            <NavLink
                to='allusers'
                className={({ isActive }) =>
                    isActive
                        ? "px-6 py-1 text-blue-600 "
                        : "px-6 py-1 text-gray-800 hover:text-blue-600"
                }
            >
                All Users
            </NavLink>
        </div>
    );
};

export default Tabs;
