import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import TripCard from "../../pages/featuredExploreTripsCard/TripCard";


const FeaturedTrips = () => {
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

  const publicTrips = tripsData.filter(
    (trip) => trip?.visibility?.toLowerCase() === "public"
  );

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

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spiral size="40" speed="0.9" color="black" />
      </div>
    );

  if (!publicTrips.length) return <p>No public trips found</p>;

  return (
    <div className="max-w-[1536px] mx-auto mt-10 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Featured Trips</h1>
        <p className="mt-3">
          Join these amazing adventures or get inspired to create your own
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {publicTrips.slice(0, 4).map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            handleRequest={handleRequest}
          />
        ))}
      </div>

      <div className="text-center mt-8 justify-items-center">
        <Link
          to="/exploretrips"
          className="btn bg-white text-black/95 font-bold rounded-xl px-8 hover:bg-amber-500 hover:text-white"
        >
          View All Trips
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTrips;
