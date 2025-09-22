import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const JoinedTrips = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [trips, setTrips] = useState([]);

    const fetchJoinedTrips = async () => {
        try {
            const res = await axiosSecure.get("/joinRequests", {
                params: { email: user?.email },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 mt-10">
            {trips?.map((trip) => {
                const isAccepted = trip?.status === "accepted";

                return (
                    <div
                        key={trip?._id}
                        className={`bg-white rounded-xl shadow-md p-4 items-center ${!isAccepted ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        <figure className="rounded-xl">
                            <img
                                src={trip?.tripImage ?? "https://i.ibb.co/fYRQTwTc/nepal.jpg"}
                                alt={trip?.tripName}
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="items-center mt-3.5">
                            <h2 className="font-bold flex justify-between">
                                {trip?.tripName}
                                <div className={`badge ${isAccepted ? "badge-primary" : "badge-warning"}`}>
                                    {isAccepted ? "Joined" : "Pending"}
                                </div>
                            </h2>
                            <p className="mt-2">{trip?.description}</p>
                            <p className="flex items-center gap-2 mt-1">
                                <IoLocationOutline className="text-cyan-600 text-xl" />
                                {trip?.destination}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FaRegCalendarAlt className="text-green-700 text-xl" />
                                {trip?.startDate} - {trip?.endDate}
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                <FiUsers className="text-amber-600 text-xl" />
                                {trip?.participants ?? 0} travelers joined
                            </p>
                            <button
                                className={`btn w-full text-black font-semibold rounded-xl mt-3 ${isAccepted
                                        ? "bg-white hover:bg-orange-500 hover:text-white"
                                        : "bg-gray-200 cursor-not-allowed"
                                    }`}
                                disabled={!isAccepted}
                            >
                                View Trip
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default JoinedTrips;
