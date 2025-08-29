import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const cardInfo = [
  {
    id: 1,
    icon: FaMapMarkerAlt,
    title: 1,
    description: "Trips Created",
    color: "text-blue-500",
  },
  {
    id: 2,
    icon: FiUsers,
    title: 1,
    description: "Trips Joined",
    color: "text-green-500",
  },
  {
    id: 3,
    icon: IoMdTime,
    title: 0,
    description: "Pending Requests",
    color: "text-orange-500",
  },
  {
    id: 4,
    icon: FaRegCalendarAlt,
    title: "$1,800.00",
    description: "Total Budget",
    color: "text-green-500",
  },
  {
    id: 5,
    icon: FaRegCalendarAlt,
    title: "$450.00",
    description: "Total Expenses",
    color: "text-red-500",
  },
];

const InfoSection = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5 mb-5 mt-10'>
            {cardInfo.map((info) =>
                <div key={info.id} className=' bg-white rounded-xl shadow-md p-10 flex items-center just'>
                    <div className='flex items-center gap-3 '>
                        {info.icon && <info.icon className={`text-4xl ${info.color}`} />}           
                        <div>
                            <h1 className="text-2xl font-bold">{info.title}</h1>
                            <p>{info.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoSection