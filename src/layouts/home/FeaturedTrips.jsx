import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const FeaturedTrips = () => {
  const [tripsData, setTripsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trips");
        const trips = Array.isArray(response.data) ? response.data : [];
        setTripsData(trips);
      } catch (error) {
        setTripsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;

  const publicTrips = tripsData.filter(trip => trip.visibility.toLowerCase() === "public");

  if (!publicTrips.length) return <p>No public trips found</p>;

  return (
    <div className="justify-items-center items-center mt-14 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Featured Trips</h1>
        <p className="mt-3">
          Join these amazing adventures or get inspired to create your own
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {publicTrips.slice(0, 3).map((trip) => (
          <div key={trip._id} className="bg-white rounded-xl shadow-md p-4 items-center">
            {/* Image with badges */}
            <div className="relative">
              <img
                src={trip.tripImage}
                alt={trip.tripName}
                className="rounded-xl"
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
            <div className="card-body p-0 mt-4">
              <h2 className="card-title font-bold">
                {trip.tripName}
                <div className="badge badge-primary">
                  {trip.participants}/{trip.participants}
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
                {trip.participants} travelers joined
              </p>
              <p className="flex justify-between items-center gap-2 mt-1">
                Budget <span>${trip.budget}</span>
              </p>
              <button className="btn bg-cyan-600 hover:bg-cyan-800 text-white font-bold rounded-2xl mt-2.5">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 justify-items-center">
        <Link to='/exploretrips' className="btn bg-white text-black/95 font-bold rounded-xl px-8 hover:bg-amber-500 hover:text-white">
          View All Trips
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTrips;
