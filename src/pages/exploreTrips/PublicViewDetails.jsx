import { FaUsers, FaCalendarAlt, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PublicViewDetails = () => {
  const { id } = useParams(); 
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", id],
    queryFn: async() => {
        const res = await axiosPublic.get(`/trips/${id}`);
        return res.data;
    },
    enabled: !!id, 
  });

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading trip.</p>;
  if (!trip) return <p className="text-gray-600">Trip not found.</p>;

  const participants = Array.isArray(trip.participants) ? trip.participants : [];
  const creator = trip.creator || {};

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  return (
    <div className="max-w-[1536px] mx-auto px-4 py-8 gap-6">
      {/* Left Content */}
      <div className="space-y-6">
        {/* Trip Image & Header */}
        <div className="bg-white rounded-xl shadow p-4 border border-black/15">
          <div className="relative">
            <img
              src={trip.tripImage || "https://via.placeholder.com/600x400"}
              alt={trip.tripName || "Trip"}
              className="rounded-lg w-full h-64 object-cover"
            />
            {/* Top Labels */}
            <div className="absolute top-2 left-2 flex gap-2">
              <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                {trip.visibility || "Public"}
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                {trip.category || "General"}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <span className="bg-white text-sm px-2 py-1 rounded shadow">
                {trip.status || "Open to Join"}
              </span>
            </div>
          </div>

          {/* Trip Info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{trip.tripName}</h1>

                <button
                  onClick={() => handleRequest?.(trip)}
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow transition duration-200"
                >
                  Request to Join
                </button>

            </div>

            <p className="flex items-center text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-2" /> {trip.destination || "Unknown"}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Start
                </p>
                <p>{formatDate(trip.startDate)}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2" /> End
                </p>
                <p>{formatDate(trip.endDate)}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaDollarSign className="mr-2" /> Budget
                </p>
                <p>${trip.budget || 0}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaUsers className="mr-2" /> Participants
                </p>
                <p>
                  {participants.length}/{trip.maxParticipants || 0}
                </p>
              </div>
            </div>
          </div>

          {/* About Trip */}
          <div className="mt-6 border-t pt-4">
            <h2 className="font-semibold">About this trip</h2>
            <p className="text-gray-600 mt-2">{trip.description || "No description"}</p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        {/* Trip Creator */}
        <div className="bg-white rounded-xl shadow p-4 border border-black/15">
          <h2 className="font-semibold mb-3">Trip Creator</h2>
          <div className="flex items-center gap-3">
            <img
              src={creator.avatar || "https://via.placeholder.com/50"}
              alt={trip.createdBy || "Creator"}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{trip.createdBy || "Unknown"}</p>
              <p className="text-sm text-gray-500">Trip organizer</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white rounded-xl shadow p-4 border border-black/15">
          <h2 className="font-semibold mb-4">
            Participants ({participants.length}/{trip.maxParticipants || 0})
          </h2>
          <ul className="space-y-3">
            {participants.length > 0 ? (
              participants.map((p, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar || "https://via.placeholder.com/40"}
                      alt={p.name || "Participant"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{p.name || "Unknown"}</p>
                      <p className="text-sm text-gray-500">{p.role || "Member"}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      p.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : p.paymentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {p.paymentStatus || "N/A"}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No participants yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicViewDetails;
