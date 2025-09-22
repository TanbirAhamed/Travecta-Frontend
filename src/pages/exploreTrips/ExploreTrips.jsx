import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const ExploreTrips = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch trips
    const { data: tripsData = [], isLoading: loading } = useQuery({
        queryKey: ["trips"],
        queryFn: async () => {
            const res = await axiosPublic.get("/trips");
            return res.data;
        },
    });

    // Handle request to join
    const handleRequest = async (trip) => {
        if (!user) {
            Swal.fire("Login Required", "Please log in to request to join.", "warning");
            return;
        }

        try {
            const payload = {
                tripId: trip?._id,
                userId: user?._id,
                userEmail: user?.email,
                userName: user?.name,
            };

            const res = await axiosSecure.post("/joinRequests", payload);

            if (res.data?.insertedId || res.data?.acknowledged) {
                Swal.fire("Request Sent!", "Your join request is pending approval.", "success");
            } else {
                Swal.fire("Notice", "You may have already requested to join this trip.", "info");
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to send join request.", "error");
        }
    };

    const publicTrips = tripsData.filter((trip) => trip?.visibility === "public");

    if (loading)
        return (
            <div className="flex justify-center items-center">
                <Spiral size="40" speed="0.9" color="black" />
            </div>
        );

    if (!publicTrips.length)
        return <p className="flex justify-center items-center">No trips found</p>;

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold">Explore Trips</h1>
                <p className="text-gray-600 mt-2">
                    Discover amazing adventures created by fellow travelers around the world.
                </p>
            </div>

            {/* Trips Count */}
            <p className="text-gray-600 mt-6">{publicTrips?.length} trips found</p>

            {/* Trips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {publicTrips.map((trip) => (
                    <div
                        key={trip?._id}
                        className="bg-white rounded-xl shadow-md p-4 items-center"
                    >
                        {/* Image */}
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
                                <div className="badge badge-primary">{trip?.participants}</div>
                            </h2>
                            <p className="mt-1">{trip?.description}</p>
                            <p className="flex items-center gap-2 mt-1">
                                <IoLocationOutline className="text-cyan-600 text-xl" />
                                {trip?.destination}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FaRegCalendarAlt className="text-green-700 text-xl" />
                                {trip?.startDate} - {trip?.endDate}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FiUsers className="text-amber-600 text-xl" />
                                {trip?.participants} travelers joined
                            </p>
                            <p className="flex justify-between items-center gap-2 mt-1">
                                Budget <span>${trip?.budget}</span>
                            </p>
                            <div className="w-full flex gap-3 mt-2.5">
                                <Link to={`/details/${trip?._id}`}>
                                    <button className="flex-1 btn bg-cyan-600 hover:bg-cyan-800 text-white font-bold rounded-2xl">
                                        View Details
                                    </button>
                                </Link>
                                <button
                                    className="flex-1 btn bg-black text-white font-bold rounded-2xl hover:bg-gray-800"
                                    onClick={() => handleRequest(trip)}
                                >
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
