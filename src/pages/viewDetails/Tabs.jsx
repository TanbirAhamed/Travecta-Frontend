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
        Overview
      </NavLink>
      <NavLink
        to="itinerary"
        className={({ isActive }) =>
          isActive
            ? "px-6 py-1 text-blue-600"
            : "px-6 py-1 text-gray-800 hover:text-blue-600"
        }
      >
        Itinerary
      </NavLink>
      <NavLink
        to="budget"
        className={({ isActive }) =>
          isActive
            ? "px-6 py-1 text-blue-600"
            : "px-6 py-1 text-gray-800 hover:text-blue-600"
        }
      >
        Budget
      </NavLink>
      <NavLink
        to="photos"
        className={({ isActive }) =>
          isActive
            ? "px-6 py-1 text-blue-600"
            : "px-6 py-1 text-gray-800 hover:text-blue-600"
        }
      >
        Photos
      </NavLink>
    </div>
  );
};

export default Tabs;
