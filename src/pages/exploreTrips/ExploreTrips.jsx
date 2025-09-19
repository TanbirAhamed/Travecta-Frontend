import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import { Link } from "react-router";

const ExploreTrips = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tripsData = [], isLoading: loading } = useQuery({
        queryKey: ['trips'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trips');
            return res.data;
        }
    });

    const publicTrips = tripsData.filter(trip => trip.visibility === "public");

    if (loading) return <div className="flex justify-center items-center">
        <Spiral
            size="40"
            speed="0.9"
            color="black"
        />
    </div>;
    if (!publicTrips.length) return <p className="flex justify-center items-center">No trips found</p>;

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
            <p className="text-gray-600 mt-6">{publicTrips?.length} trips found</p>

            {/* Trips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {publicTrips.map((trip) => (
                    <div
                        key={trip._id}
                        className="bg-white rounded-xl shadow-md p-4 items-center"
                    >
                        {/* Image with badges */}
                        <div className="relative">
                            <img
                                src={trip?.tripImage}
                                alt={trip?.tripName}
                                className="rounded-xl"
                            />
                            <div className="absolute top-2 left-2">
                                <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-md shadow">
                                    Public
                                </span>
                            </div>
                            {trip?.category && (
                                <div className="absolute top-2 right-2">
                                    <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-md shadow">
                                        {trip?.category}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="card-body p-0 mt-4">
                            <h2 className="card-title font-bold">
                                {trip?.tripName}
                                <div className="badge badge-primary">
                                    {trip?.participants}
                                </div>
                            </h2>
                            <p className="mt-1">{trip?.description}</p>
                            <p className="flex items-center gap-2 mt-1">
                                <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                                {trip?.destination}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                                {trip?.startDate} - {trip?.endDate}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FiUsers className="text-amber-600 font-extrabold text-xl" />
                                {trip?.participants} travelers joined
                            </p>
                            <p className="flex justify-between items-center gap-2 mt-1">
                                Budget <span>${trip?.budget}</span>
                            </p>
                            <div className="w-full flex gap-3 mt-2.5">
                                <Link to={`/details/${trip._id}`}>
                                    <button className="flex-1 btn bg-cyan-600 hover:bg-cyan-800 text-white border-gray-300  font-bold rounded-2xl">
                                        View Details
                                    </button>
                                </Link>
                                <button className="flex-1 btn bg-black text-white font-bold rounded-2xl hover:bg-gray-800">
                                    Request to Join
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreTrips;
