import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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

    if (!trips?.length)
        return <p className="text-center text-gray-500 mt-4">No trips yet</p>;

    return (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Trip Name</th>
                    <th className="border px-4 py-2">Destination</th>
                    <th className="border px-4 py-2">Start - End Date</th>
                    <th className="border px-4 py-2">Participants</th>
                    <th className="border px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {trips.map((trip) => (
                    <tr
                        key={trip._id}
                        className={`text-center ${trip.status !== "accepted" ? "opacity-60" : ""}`}
                    >
                        <td className="border px-4 py-2">{trip.tripName}</td>
                        <td className="border px-4 py-2">{trip.destination ?? "-"}</td>
                        <td className="border px-4 py-2">
                            {trip.startDate ?? "-"} - {trip.endDate ?? "-"}
                        </td>
                        <td className="border px-4 py-2">{trip.participants ?? 0}</td>
                        <td className="border px-4 py-2 font-semibold">
                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JoinedTrips;
