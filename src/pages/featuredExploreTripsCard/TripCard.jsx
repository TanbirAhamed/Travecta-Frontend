import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const TripCard = ({ trip, handleRequest, showRequestButton = true }) => {

  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #63e0ff 100%)",
        }}
      ></div>

      {/* Card Container */}
      <div className="relative bg-white/40 border border-black/10 rounded-xl overflow-hidden">
        {/* Image + SVG Wave Wrapper */}
        <div className="relative h-60 w-full overflow-hidden transition-transform duration-500 group-hover:scale-105">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${trip.tripImage})` }}
          ></div>

          {/* SVG Wave */}
          <svg
            className="absolute bottom-0 left-0 w-full h-16 "
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L60,192C120,160,240,96,360,80C480,64,600,96,720,122.7C840,149,960,171,1080,165.3C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z"
            ></path>
          </svg>

          {/* Badges */}
          <div className="absolute top-3 left-3">
            <span className="bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Public
            </span>
          </div>
          {trip.category && (
            <div className="absolute top-3 right-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {trip.category}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 relative z-10">
          <h2 className="card-title font-bold text-lg flex justify-between items-center">
            {trip.tripName}
            <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              0 Joined
            </span>
          </h2>

          <p className="mt-2 text-gray-800 text-sm">{trip.description}</p>

          <div className="mt-3 space-y-2 text-gray-800 text-sm">
            <p className="flex items-center gap-2">
              <IoLocationOutline className="text-cyan-600 text-xl" />
              {trip.destination}
            </p>
            <p className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-green-600 text-xl" />
              {trip.startDate} - {trip.endDate}
            </p>
            <p className="flex items-center gap-2">
              <FiUsers className="text-amber-600 text-xl" />
              {trip.participants} travelers
            </p>
            <p className="flex justify-between items-center mt-1 font-medium">
              Budget <span className="font-semibold text-gray-900">${trip.budget}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Link to={`/publicviewdetails/${trip._id}`} className="flex-1">
              <button className="w-full bg-cyan-500 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-2xl shadow transition duration-200">
                View Details
              </button>
            </Link>

            {showRequestButton && (
              <button
                onClick={() => handleRequest(trip)}
                className="flex-1 bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-2xl shadow transition duration-200"
              >
                Request to Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
