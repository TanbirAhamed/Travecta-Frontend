import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

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
      <div className="flex border-b mt-7">
        <button className="px-6 py-2 text-sm font-medium border-b-2 text-black">
          Overview
        </button>
        <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-black">
          Itinerary
        </button>
        <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-black">
          Budget
        </button>
        <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-black">
          Photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About This Trip */}
          <div className="bg-white shadow-sm rounded-lg p-5">
            <h2 className="font-bold mb-5">About This Trip</h2>
            <p className="text-gray-600 text-sm">
              Exploring the vibrant culture and cuisine of Tokyo with friends.
              We’ll visit temples, try authentic ramen, and experience the
              bustling city life.
            </p>
          </div>

          {/* Budget Overview */}
          <div className="bg-white shadow-sm rounded-lg p-5">
            <h2 className="font-bold mb-3">Budget Overview</h2>
            <div className="flex justify-between text-sm">
              <span>Total Budget</span>
              <span>$2500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Spent</span>
              <span>$1800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining</span>
              <span className="text-green-600">$700</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: "72%" }}
              ></div>
            </div>
            <p className="text-gray-500 text-xs mt-1">72.0% of budget used</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-5">
            <h2 className="font-bold mb-3">Travel Companions</h2>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                D
              </div>
              <div>
                <p className="font-medium text-sm">Demo User</p>
                <p className="text-gray-500 text-xs">Trip Organizer</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                J
              </div>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-gray-500 text-xs">john@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                J
              </div>
              <div>
                <p className="font-medium text-sm">Jane Smith</p>
                <p className="text-gray-500 text-xs">jane@example.com</p>
              </div>
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100">
              ＋ Invite More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
