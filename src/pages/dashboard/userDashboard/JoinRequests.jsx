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
        <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">User</th>
                    <th className="border px-4 py-2">Trip Name</th>
                    <th className="border px-4 py-2">Requested At</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((req) => (
                    <tr key={req._id} className="text-center">
                        <td className="border px-4 py-2 flex items-center gap-2 justify-center">
                            <img
                                src={req?.userImage || "https://i.pravatar.cc/40"}
                                alt={req?.userName}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            {req?.userName}
                        </td>
                        <td className="border px-4 py-2">{req?.tripName}</td>
                        <td className="border px-4 py-2">
                            {new Date(req?.requestedAt).toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </td>
                        <td className="border px-4 py-2 flex justify-center gap-2">
                            {req.status === "pending" && (
                                <>
                                    <button
                                        onClick={() => handleStatusUpdate(req._id, "accepted")}
                                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(req._id, "rejected")}
                                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JoinRequests;
