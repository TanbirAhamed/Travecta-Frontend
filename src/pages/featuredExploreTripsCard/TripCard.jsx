import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const TripCard = ({ trip }) => {
  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #63e0ff 100%)",
        }}
      ></div>

      {/* Card Container */}
      <div className="relative bg-white/40 border border-black/10 rounded-xl overflow-hidden">
        {/* Image + Wave */}
        <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 xl:h-60 w-full overflow-hidden transition-transform duration-500 group-hover:scale-105 rounded-b-[115px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${trip.tripImage})` }}
          ></div>

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-cyan-500 text-white text-[10px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
              Public
            </span>
          </div>
          {trip.category && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <span className="bg-blue-600 text-white text-[10px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                {trip.category}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-3 sm:p-4 md:p-5 relative z-10">
          <h2 className="card-title font-bold text-base sm:text-lg md:text-xl flex justify-between items-center">
            {trip.tripName}
            <span className="bg-amber-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2 sm:py-1 rounded-full">
              0 Joined
            </span>
          </h2>
          <div className="mt-3 space-y-1.5 sm:space-y-2 text-gray-800 text-xs sm:text-sm md:text-base">
            <p className="flex items-center gap-1.5 sm:gap-2">
              <IoLocationOutline className="text-cyan-600 text-base sm:text-lg md:text-xl" />
              {trip.destination}
            </p>
            <p className="flex items-center gap-1.5 sm:gap-2">
              <FaRegCalendarAlt className="text-green-600 text-base sm:text-lg md:text-xl" />
              {trip.startDate} - {trip.endDate}
            </p>
            <p className="flex items-center gap-1.5 sm:gap-2">
              <FiUsers className="text-amber-600 text-base sm:text-lg md:text-xl" />
              {trip.participants} travelers
            </p>
            <p className="flex justify-between items-center mt-1 font-medium">
              Budget{" "}
              <span className="font-semibold text-gray-900">
                ${trip.budget}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Link to={`/publicviewdetails/${trip._id}`} className="flex-1">
              <button className="w-full bg-cyan-500 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow transition duration-200">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
