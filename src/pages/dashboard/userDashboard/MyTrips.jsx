import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const tripsData = [
    {
        id: 111,
        title: "Tokyo Adventure",
        location: "Tokyo, Japan",
        date: "Jun 15, 2024 - Jun 22, 2024",
        travelers: 3,
        total: 6,
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        description: "Explore the vibrant culture and cuisine of Tokyo",
        type: "Public",
        budget: '1,800.00',
        spent: '400'
    },
    {
        id: 133,
        title: "Tokyo Adventure",
        location: "Tokyo, Japan",
        date: "Jun 15, 2024 - Jun 22, 2024",
        travelers: 3,
        total: 6,
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        description: "Explore the vibrant culture and cuisine of Tokyo",
        type: "Public",
        budget: '1,800.00',
        spent: '400'
    },
    {
        id: 11,
        title: "Tokyo Adventure",
        location: "Tokyo, Japan",
        date: "Jun 15, 2024 - Jun 22, 2024",
        travelers: 3,
        total: 6,
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        description: "Explore the vibrant culture and cuisine of Tokyo",
        type: "Public",
        budget: '1,800.00',
        spent: '400'
    },
    {
        id: 2,
        title: "Tokyo Adventure",
        location: "Tokyo, Japan",
        date: "Jun 15, 2024 - Jun 22, 2024",
        travelers: 3,
        total: 6,
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        description: "Explore the vibrant culture and cuisine of Tokyo",
        type: "Private",
        budget: '1,800.00',
        spent: '400'
    },
    {
        id: 3,
        title: "Tokyo Adventure",
        location: "Tokyo, Japan",
        date: "Jun 15, 2024 - Jun 22, 2024",
        travelers: 3,
        total: 6,
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        description: "Explore the vibrant culture and cuisine of Tokyo",
        type: "Private",
        budget: '1,800.00',
        spent: '400'
    },
];

const MyTrips = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5 mt-10'>
            {tripsData.map((trips) =>
                <div key={trips.id} className=' bg-white rounded-xl shadow-md p-4 items-center just'>
                    <figure className="rounded-xl">
                        <img src={trips.image} alt={trips.title} className="rounded-xl"/>
                    </figure>
                    <div className='items-center mt-3.5'>
                        <h2 className="font-bold flex justify-between">
                            {trips.title}
                            <div className="badge badge-primary">
                                {trips.type}
                            </div>
                        </h2>
                        <p className="mt-2">{trips.description}</p>
                        <p className="flex items-center gap-2 mt-1">
                            <IoLocationOutline className="text-cyan-600 font-extrabold text-xl" />
                            {trips.location}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FaRegCalendarAlt className="text-green-700 font-bold text-xl" />
                            {trips.date}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <FiUsers className="text-amber-600 font-extrabold text-xl" />
                            {trips.travelers} travelers joined
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Budget <span>${trips.budget}</span> 
                        </p>
                        <p className="flex justify-between items-center gap-2 mt-1">
                            Spent <span>${trips.spent}</span> 
                        </p>
                        <button className="btn w-full bg-cyan-600 text-white font-bold rounded-xl mt-3">
                            Manage Trips
                        </button> 
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyTrips