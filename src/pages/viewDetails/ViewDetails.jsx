import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Tabs from "./Tabs";
import { Outlet, useParams } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"; 

const ViewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); 
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p className="text-gray-600">Trip not found.</p>;

  // Only trip creator can edit
  const isCreator = user?.email === trip?.createdBy;

  // Format dates (optional chaining ensures no crash)
  const formatDate = (dateStr) => {
    return dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
  };

  return (
    <div className="mt-14 max-w-[1536px] mx-auto px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        {/* Trip Header Image */}
        <div className="h-52 bg-black w-full relative">
          <img
            src={trip?.tripImage}
            alt={trip?.tripName}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {trip?.tripName}
              <span className="bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                {trip?.category}
              </span>
            </h1>
            <p className="flex items-center gap-2 text-gray-200 mt-1">
              <IoLocationOutline /> {trip?.destination}
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
                {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
              </div>
              <div className="flex items-center gap-2">
                <BiDollar className="text-gray-500" />
                ${trip?.budget}
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gray-500" />
                {trip?.participants} travelers
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {isCreator && (
                <button className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                  <FiEdit /> Edit Trip
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs />
      <Outlet context={{ trip }} />
    </div>
  );
};

export default ViewDetails;
