import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const TripCard = ({ trip, handleRequest, showRequestButton = true }) => {
    return (
        <div className="relative bg-white/30 border border-black/15 rounded-xl shadow-md items-center overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%)",
                }}
            ></div>

            {/* Image with badges */}
            <div className="relative">
                <img
                    src={trip.tripImage}
                    alt={trip.tripName}
                    className="h-60 object-cover rounded-xl rounded-b-[115px]"
                />
                <div className="absolute top-2 left-2">
                    <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-md shadow">
                        Public
                    </span>
                </div>
                {trip.category && (
                    <div className="absolute top-2 right-2">
                        <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-md shadow">
                            {trip.category}
                        </span>
                    </div>
                )}
            </div>

            <div className="card-body p-5 relative z-10">
                <h2 className="card-title font-bold">
                    {trip.tripName}
                    <div className="badge badge-primary">
                        {Array.isArray(trip.participants) ? trip.participants.length : 0}
                    </div>
                </h2>
                <p className="mt-1">{trip.description}</p>
                <p className="flex items-center gap-2 mt-1">
                    <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                    {trip.destination}
                </p>
                <p className="flex items-center gap-2 mt-1">
                    <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                    {trip.startDate} - {trip.endDate}
                </p>
                <p className="flex items-center gap-2 mt-1">
                    <FiUsers className="text-amber-600 font-extrabold text-xl" />
                    {Array.isArray(trip.participants) ? trip.participants.length : 0} travelers joined
                </p>
                <p className="flex justify-between items-center gap-2 mt-1">
                    Budget <span>${trip.budget}</span>
                </p>

                {/* Buttons */}
                <div className="w-full flex gap-3 mt-2.5">
                    {/* View Details */}
                    <Link to={`/publicviewdetails/${trip._id}`} className="flex-1">
                        <button className="w-full btn bg-cyan-600 hover:bg-cyan-800 text-white font-bold rounded-2xl">
                            View Details
                        </button>
                    </Link>

                    {/* Request to Join */}
                    {showRequestButton && (
                        <div className="flex-1">
                            <button
                                className="w-full btn bg-black text-white font-bold rounded-2xl hover:bg-gray-800"
                                onClick={() => handleRequest(trip)}
                            >
                                Request to Join
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripCard;
