import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const JoinRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/joinRequests", {
        params: { email: user?.email },
      });
      setRequests(res.data ?? []);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user?.email]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/joinRequests/${id}`, { status });
      Swal.fire("Success", `Request ${status}`, "success");
      fetchRequests();
    } catch (error) {
      Swal.fire("Error", "Failed to update request", "error");
    }
  };

  if (!requests?.length)
    return <p className="text-center text-gray-500 mt-4">No join requests</p>;

  return (
    <div className="mt-7">
      <div className="bg-white border border-black/15 rounded-xl shadow">
        <div className="px-6 py-4 font-semibold text-gray-700">
          Join Requests ({requests?.length || 0})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-gray-500 border-b border-black/15">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Trip Name</th>
                <th className="px-6 py-3">Requested At</th>
                <th className="px-6 py-3">Status / Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-black/15 hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={req?.userImage || "https://i.pravatar.cc/40"}
                      alt={req?.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{req?.userName}</span>
                  </td>

                  {/* Trip Name */}
                  <td className="px-6 py-4">{req?.tripName}</td>

                  {/* Requested At */}
                  <td className="px-6 py-4">
                    {new Date(req?.requestedAt).toLocaleDateString()}
                  </td>

                  {/* Status / Action */}
                  <td className="px-6 py-4">
                    {req.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "accepted")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "rejected")
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          req.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
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

export default JoinRequests;
