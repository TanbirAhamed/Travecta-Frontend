import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import TripCard from '../featuredExploreTripsCard/TripCard';


const ExploreTrips = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch trips
    const { data: tripsData = [], isLoading: loading } = useQuery({
        queryKey: ["trips"],
        queryFn: async () => {
            const res = await axiosPublic.get("/trips");
            return res.data;
        },
    });

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {publicTrips.map((trip) => (
                    <TripCard
                        key={trip?._id}
                        trip={trip}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExploreTrips;
