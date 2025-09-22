import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const JoinRequests = ({ tripId }) => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get("/joinRequests", {
                params: { tripId },
            });
            setRequests(res.data ?? []);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [tripId]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/joinRequests/${id}`, { status });
            Swal.fire("Success", `Request ${status}`, "success");
            fetchRequests(); // refresh list
        } catch (error) {
            Swal.fire("Error", "Failed to update request", "error");
        }
    };

    if (!requests?.length)
        return <p className="text-center text-gray-500 mt-4">No join requests</p>;

    return (
        <div className="space-y-4 p-6">
            {requests?.map((req) => (
                <div
                    key={req?._id}
                    className="border rounded-xl p-4 shadow-sm bg-white"
                >
                    {/* Profile Section */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <img
                                src={req?.avatar || "https://i.pravatar.cc/40"}
                                alt={req?.userName}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="font-semibold">{req?.userName}</p>
                                <p className="text-sm text-gray-600">
                                    wants to join "{req?.tripName ?? 'Trip'}"
                                </p>
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex gap-2">
                            {req?.status === "pending" && (
                                <>
                                    <button
                                        onClick={() => handleStatusUpdate(req?._id, "accepted")}
                                        className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
                                    >
                                        ✓ Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(req?._id, "rejected")}
                                        className="border border-gray-400 px-4 py-1 rounded-md hover:bg-gray-200"
                                    >
                                        ✕ Reject
                                    </button>
                                </>
                            )}
                            {req?.status === "accepted" && (
                                <span className="text-green-600 font-semibold">Accepted</span>
                            )}
                            {req?.status === "rejected" && (
                                <span className="text-red-600 font-semibold">Rejected</span>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <p className="bg-gray-100 rounded-md p-3 text-gray-800 text-sm mb-2">
                        {req?.message}
                    </p>
                    <span className="text-xs text-gray-500">
                        Requested on {new Date(req?.requestedAt).toLocaleDateString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default JoinRequests;
