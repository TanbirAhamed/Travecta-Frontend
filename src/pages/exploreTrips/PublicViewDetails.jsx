import {
  FaUsers,
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PublicViewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isRequesting, setIsRequesting] = useState(false);

  // Fetch trip details
  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trips/${id}`);
      return res?.data;
    },
    enabled: !!id,
  });

  // Fetch current user's join requests for this trip
  const { data: joinReqs = [], refetch } = useQuery({
    queryKey: ["joinRequests", user?.email, id],
    queryFn: async () => {
      if (!user) return [];
      const res = await axiosSecure.get("/joinRequests", {
        params: { tripId: id, joinedEmail: user?.email },
      });
      return res?.data;
    },
    enabled: !!user && !!id,
  });

  const userJoinRequest = joinReqs?.[0];
  const isRejected = userJoinRequest?.status === "rejected";
  const isPending = userJoinRequest?.status === "pending";
  const isAccepted = userJoinRequest?.status === "accepted";

  const isTripFull =
    Array.isArray(trip?.collaborators)
      ? trip?.collaborators?.length >= trip?.participants
      : false;

  // Handle join request
  const handleRequest = async () => {
    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please log in to request to join.",
        "warning"
      );
    }

    if (isTripFull) {
      return Swal.fire(
        "Trip Full",
        "Sorry, this trip has reached its participant limit.",
        "info"
      );
    }

    // ✅ Allow re-request only if rejected
    if (isPending || isAccepted) {
      return Swal.fire(
        "Already Requested",
        "You’ve already sent a request to join this trip.",
        "info"
      );
    }

    setIsRequesting(true);

    try {
      const payload = {
        tripId: trip?._id,
        tripName: trip?.tripName,
        tripCreatedBy: trip?.createdBy,
        joinedEmail: user?.email,
        joinedName: user?.displayName,
        joinedPhoto: user?.photoURL,
        status: "pending",
        requestedAt: new Date(),
      };

      const res = await axiosSecure.post("/joinRequests", payload);

      if (res?.data?.insertedId || res?.data?.acknowledged) {
        Swal.fire(
          "Request Sent!",
          "Your join request has been sent successfully.",
          "success"
        );
        refetch();
      } else {
        Swal.fire(
          "Notice",
          res?.data?.message || "You may have already requested this trip.",
          "info"
        );
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to send join request.", "error");
    } finally {
      setIsRequesting(false);
    }
  };

  // Loading & error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading trip.</p>;
  if (!trip) return <p className="text-gray-600">Trip not found.</p>;

  const collaborators = Array.isArray(trip?.collaborators)
    ? trip?.collaborators
    : [];

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr)?.toLocaleDateString("en-US", {
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
              src={trip?.tripImage || "https://via.placeholder.com/600x400"}
              alt={trip?.tripName || "Trip"}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                {trip?.visibility || "Public"}
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                {trip?.category || "General"}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <span className="bg-white text-sm px-2 py-1 rounded shadow">
                {trip?.status || "Open to Join"}
              </span>
            </div>
          </div>

          {/* Trip Info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{trip?.tripName}</h1>

              <button
                onClick={handleRequest}
                disabled={isTripFull || isPending || isAccepted || isRequesting}
                className={`${isAccepted
                  ? "bg-green-500"
                  : isPending
                    ? "bg-gray-400"
                    : isTripFull
                      ? "bg-red-500"
                      : "bg-blue-600 hover:bg-blue-800"
                  } text-white font-bold text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow transition duration-200`}
              >
                {isRequesting
                  ? "Sending..."
                  : isAccepted
                    ? "Accepted"
                    : isPending
                      ? "Requested"
                      : isTripFull
                        ? "Trip Full"
                        : isRejected
                          ? "Request Again"
                          : "Request to Join"}
              </button>
            </div>

            <p className="flex items-center text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-2" /> {trip?.destination || "Unknown"}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Start
                </p>
                <p>{formatDate(trip?.startDate)}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2" /> End
                </p>
                <p>{formatDate(trip?.endDate)}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaDollarSign className="mr-2" /> Budget
                </p>
                <p>${trip?.budget || 0}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <FaUsers className="mr-2" /> Collaborators
                </p>
                <p>
                  {collaborators?.length}/{trip?.participants || 0}
                </p>
              </div>
            </div>
          </div>

          {/* About Trip */}
          <div className="mt-6 border-t pt-4">
            <h2 className="font-semibold">About this trip</h2>
            <p className="text-gray-600 mt-2">
              {trip?.description || "No description"}
            </p>
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
              src={trip?.creatorImg || "https://via.placeholder.com/80"}
              alt="Creator"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{trip?.createdBy}</p>
              <p className="text-sm text-gray-500">Trip organizer</p>
            </div>
          </div>
        </div>

        {/* Collaborators */}
        <div className="bg-white rounded-xl shadow p-4 border border-black/15">
          <h2 className="font-semibold mb-4">
            Collaborators ({collaborators?.length}/{trip?.participants || 0})
          </h2>
          <ul className="space-y-3">
            {collaborators?.length > 0 ? (
              collaborators.map((p, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={p?.image || "https://via.placeholder.com/40"}
                      alt={p?.name || "Collaborator"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{p?.name || "Unknown"}</p>
                      <p className="text-sm text-gray-500">Member</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No collaborators yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicViewDetails;
