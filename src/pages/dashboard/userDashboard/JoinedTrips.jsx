import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUsers } from "react-icons/fi";

const JoinedTrips = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trips, setTrips] = useState([]);

  const fetchJoinedTrips = async () => {
    try {
      const res = await axiosSecure.get("/joinRequests", {
        params: { joinedEmail: user?.email },
      });
      setTrips(res.data ?? []);
    } catch (error) {
      console.error("Failed to fetch trips", error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchJoinedTrips();
  }, [user?.email]);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  if (!trips?.length)
    return <p className="text-center text-gray-500 mt-4">No trips yet</p>;

  return (
    <div className="mt-7">
      <div className="bg-white border border-black/15 rounded-xl shadow">
        <div className="px-6 py-4 font-semibold text-gray-700">
          Joined Trips ({trips.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b text-center border-black/15">
              <tr>
                <th className="px-6 py-3">Trip</th>
                <th className="px-6 py-3">Destination</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Participants</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip._id}
                  className={`border-b border-black/15 hover:bg-gray-50 text-center ${
                    trip.status !== "accepted" ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-6 text-left py-4 font-medium">{trip.tripName}</td>
                  <td className="px-6 py-4">{trip.destination || "-"}</td>
                  <td className="px-6 py-4">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-1">
                    <FiUsers size={16} />
                    {trip.participants ?? 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        trip.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : trip.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {trip.status === "accepted" ? (
                      <Link
                        to={`/details/${trip.tripId}`}
                        className="btn w-full bg-cyan-600 hover:bg-cyan-800 text-white font-semibold rounded-xl text-xs sm:text-sm px-3 py-1 shadow"
                      >
                        View Details
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JoinedTrips;
