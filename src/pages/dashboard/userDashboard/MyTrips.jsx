import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const MyTrips = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: tripsData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['trips', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/trips?email=${user?.email}`);
            return res.data;
        }
    });

    if (loading) return <div className="flex justify-center items-center">
        <Spiral
            size="40"
            speed="0.9"
            color="black"
        />
    </div>;
    if (!tripsData.length) return <p className="flex justify-center items-center">No trips found</p>;

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5 mt-10'>
            {tripsData.map((trip) => (
                <div key={trip._id} className='bg-white rounded-xl shadow-md p-4 items-center'>
                    <figure className="rounded-xl">
                        <img src={trip?.tripImage} alt={trip?.tripName} className="rounded-xl" />
                    </figure>
                    <div className='items-center mt-3.5'>
                        <h2 className="font-bold flex justify-between">
                            {trip?.tripName}
                            <div className="badge badge-primary">{trip?.visibility}</div>
                        </h2>
                        <p className="mt-2">{trip?.description}</p>
                        <p className="flex items-center gap-2 mt-1">
                            <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                            {trip?.destination}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                            {trip?.startDate} - {trip?.endDate}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FiUsers className="text-amber-600 font-extrabold text-xl" />
                            {trip?.participants} travelers joined
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Budget <span>${trip?.budget}</span>
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Spent <span>${trip?.spent || 0}</span>
                        </p>
                        <Link to={`/details/${trip?._id}`} className="btn w-full bg-cyan-600 hover:bg-cyan-800 text-white font-semibold rounded-xl mt-3">
                            Manage Trip
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyTrips;
