import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const tripsData = [
  {
    id: 1,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Jun 15, 2024 - Jun 22, 2024",
    travelers: 3,
    total: 6,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Explore the vibrant culture and cuisine of Tokyo",
  },
  {
    id: 1,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Jun 15, 2024 - Jun 22, 2024",
    travelers: 3,
    total: 6,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Explore the vibrant culture and cuisine of Tokyo",
  },
  {
    id: 1,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Jun 15, 2024 - Jun 22, 2024",
    travelers: 3,
    total: 6,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Explore the vibrant culture and cuisine of Tokyo",
  },
  {
    id: 1,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Jun 15, 2024 - Jun 22, 2024",
    travelers: 3,
    total: 6,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Explore the vibrant culture and cuisine of Tokyo",
  },
  {
    id: 1,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Jun 15, 2024 - Jun 22, 2024",
    travelers: 3,
    total: 6,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Explore the vibrant culture and cuisine of Tokyo",
  },
];

const FeaturedTrips = () => {

  return (
    <div className="justify-items-center items-center mt-14 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Featured Trips</h1>
        <p className="mt-3">
          Join these amazing adventures or get inspired to create your own
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {tripsData.slice(0, 3).map((trip) => (
          <div key={trip.id} className="card bg-base-100 shadow-md h-96">
            <figure className="">
              <img src={trip.image} alt={trip.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold">
                {trip.title}
                <div className="badge badge-primary">
                  {trip.travelers}/{trip.total}
                </div>
              </h2>
              <p className="mt-1">{trip.description}</p>
              <p className="flex items-center gap-2 mt-0.5">
                <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                {trip.location}
              </p>
              <p className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                {trip.date}
              </p>
              <p className="flex items-center gap-2">
                <FiUsers className="text-amber-600 font-extrabold text-xl" />
                {trip.travelers} travelers joined
              </p>
              <button className="btn bg-cyan-600 text-white font-bold rounded-2xl mt-2.5">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
        <div className="text-center mt-8 justify-items-center">
          <button           
            className="btn bg-white text-black/95 font-bold rounded-xl px-8 hover:bg-amber-500 hover:text-white"
          >
            View All Trips
          </button>
        </div>
    </div>
  );
};

export default FeaturedTrips;
