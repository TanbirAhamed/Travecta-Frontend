import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import axios from "axios";

const MyTrips = () => {
    const [tripsData, setTripsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:5000/trips"); 
                console.log("Trips API response:", response.data);
                const trips = Array.isArray(response.data) ? response.data : [];
                setTripsData(trips);
            } catch (error) {
                console.error("Failed to fetch trips", error);
                setTripsData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    if (loading) return <p>Loading trips...</p>;
    if (!tripsData.length) return <p>No trips found</p>;

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5 mt-10'>
            {tripsData.map((trip) => (
                <div key={trip._id} className='bg-white rounded-xl shadow-md p-4 items-center'>
                    <figure className="rounded-xl">
                        <img src={trip.tripImage} alt={trip.tripName} className="rounded-xl" />
                    </figure>
                    <div className='items-center mt-3.5'>
                        <h2 className="font-bold flex justify-between">
                            {trip.tripName}
                            <div className="badge badge-primary">{trip.visibility}</div>
                        </h2>
                        <p className="mt-2">{trip.description}</p>
                        <p className="flex items-center gap-2 mt-1">
                            <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                            {trip.destination}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                            {trip.startDate} - {trip.endDate}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FiUsers className="text-amber-600 font-extrabold text-xl" />
                            {trip.participants} travelers joined
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Budget <span>${trip.budget}</span>
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Spent <span>${trip.spent || 0}</span>
                        </p>
                        <button className="btn w-full bg-cyan-600 hover:bg-cyan-800 text-white font-semibold rounded-xl mt-3">
                            Manage Trip
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyTrips;
