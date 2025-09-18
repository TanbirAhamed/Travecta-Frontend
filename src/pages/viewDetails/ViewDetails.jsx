import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Tabs from "./Tabs";
import { Outlet } from "react-router";

const ViewDetails = () => {
  return (
    <div className="mt-14 max-w-7xl mx-auto px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        {/* Trip Header Image */}
        <div className="h-52 bg-black w-full relative">
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Tokyo Adventure
              <span className="bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                upcoming
              </span>
            </h1>
            <p className="flex items-center gap-2 text-gray-200 mt-1">
              <IoLocationOutline /> Tokyo, Japan
            </p>
          </div>
        </div>

        {/* Trip Info */}
        <div className="p-6 mt-5 mb-5">
          <div className="flex justify-between items-center">
            {/* Date, Budget, Travelers */}
            <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-gray-500" />
                12/15/2024 - 12/22/2024
              </div>
              <div className="flex items-center gap-2">
                <BiDollar className="text-gray-500" />
                $1800 / $2500
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gray-500" />
                3 travelers
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                <FiEdit /> Edit Trip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs />
      <Outlet />
    </div>
  );
};

export default ViewDetails;
