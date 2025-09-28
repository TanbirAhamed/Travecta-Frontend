import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import TripCard from '../featuredExploreTripsCard/TripCard';


const ExploreTrips = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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
                tripCreatedBy: trip?.createdBy,
                tripName: trip?.tripName,
                userEmail: user?.email,
                userName: user?.displayName,
                userImage: user?.photoURL
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
        <div className="max-w-[1536px] mx-auto mt-10 px-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {publicTrips.map((trip) => (
                    <TripCard 
                      key={trip?._id} 
                      trip={trip} 
                      handleRequest={handleRequest} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ExploreTrips;
