import { useEffect, useState } from "react";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const ExploreTrips = () => {
    const [tripsData, setTripsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:5000/trips");
                const trips = Array.isArray(response.data) ? response.data : [];
                setTripsData(trips.filter(t => t.visibility === "public"));
            } catch (error) {
                setTripsData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading trips...</p>;
    if (!tripsData.length) return <p className="text-center mt-10">No public trips found</p>;

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold">Explore Trips</h1>
                <p className="text-gray-600 mt-2">
                    Discover amazing adventures created by fellow travelers around the world.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white border rounded-xl p-4 mt-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search trips, destinations, creators..."
                        className="input input-bordered w-full md:flex-1 rounded-lg"
                    />
                    <select className="select select-bordered rounded-lg w-full md:w-48">
                        <option>All Categories</option>
                        <option>Adventure</option>
                        <option>Cultural</option>
                        <option>Food & Culinary</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Filter by destination..."
                        className="input input-bordered w-full md:w-56 rounded-lg"
                    />
                    <button className="btn btn-outline rounded-lg w-full md:w-auto">
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Trips Count */}
            <p className="text-gray-600 mt-6">{tripsData.length} trips found</p>

            {/* Trips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {tripsData.map((trip) => (
                    <div
                        key={trip._id}
                        className="bg-white rounded-xl shadow-md p-4 items-center"
                    >
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

                        {/* Details */}
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
        </div>
    );
};

export default ExploreTrips;
