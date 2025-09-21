import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiUsers, FiTrash2 } from "react-icons/fi";

const AllTrips = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const dropdownRef = useRef(null);
  const trips = [
    {
      trip: "European Adventure",
      location: "Paris, Rome, Barcelona",
      creator: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      visibility: "Public",
      category: "Cultural",
      dates: "Jun 15, 2024 - Jun 30, 2024",
      participants: "4/6",
    },
    {
      trip: "Tokyo Food Tour",
      location: "Tokyo, Japan",
      creator: "Mike Chen",
      avatar: "https://i.pravatar.cc/40?img=2",
      visibility: "Public",
      category: "Food & Culinary",
      dates: "Aug 10, 2024 - Aug 20, 2024",
      participants: "2/4",
    },
    {
      trip: "Bali Wellness Retreat",
      location: "Ubud, Bali",
      creator: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=3",
      visibility: "Private",
      category: "Wellness",
      dates: "Sep 5, 2024 - Sep 15, 2024",
      participants: "3/8",
    },
    {
      trip: "Iceland Northern Lights",
      location: "Reykjavik, Iceland",
      creator: "Alex Thompson",
      avatar: "https://i.pravatar.cc/40?img=4",
      visibility: "Public",
      category: "Adventure",
      dates: "Nov 20, 2024 - Nov 28, 2024",
      participants: "1/5",
    },
    {
      trip: "Morocco Desert Safari",
      location: "Marrakech, Morocco",
      creator: "Fatima Al-Zahra",
      avatar: "https://i.pravatar.cc/40?img=5",
      visibility: "Public",
      category: "Adventure",
      dates: "Oct 12, 2024 - Oct 22, 2024",
      participants: "5/8",
    },
    {
      trip: "New Zealand Road Trip",
      location: "Auckland to Queenstown",
      creator: "James Wilson",
      avatar: "https://i.pravatar.cc/40?img=6",
      visibility: "Public",
      category: "Adventure",
      dates: "Dec 1, 2024 - Dec 20, 2024",
      participants: "2/4",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-7">
      {/* Filters */}
      <div className="bg-white border border-black/15 rounded-xl shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search trips..."
            className="border border-black/15 rounded-lg px-4 py-2 flex-1"
          />
          <select className="border border-black/15 rounded-lg px-4 py-2">
            <option>All Visibility</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <select className="border border-black/15 rounded-lg px-4 py-2">
            <option>All Categories</option>
            <option>Adventure</option>
            <option>Cultural</option>
            <option>Food & Culinary</option>
            <option>Wellness</option>
          </select>
          <button className="border border-black/15 rounded-lg px-4 py-2 bg-gray-100">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/15 rounded-xl shadow">
        <div className="px-6 py-4 font-semibold text-gray-700">
          All Trips (6)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-black/15">
              <tr>
                <th className="px-6 py-3">Trip</th>
                <th className="px-6 py-3">Creator</th>
                <th className="px-6 py-3">Visibility</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Participants</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t, i) => (
                <tr key={i} className="border-b border-black/15 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{t.trip}</div>
                      <div className="text-gray-500 text-xs">{t.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={t.avatar}
                        alt={t.creator}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{t.creator}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        t.visibility === "Public"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {t.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{t.dates}</td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <FiUsers size={16} />
                    {t.participants}
                  </td>
                  <td className="px-6 py-4 relative" ref={dropdownRef}>
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === i ? null : i)
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiMoreVertical size={18} />
                    </button>

                    {openIndex === i && (
                      <div className="absolute right-6 p-1 mt-2 w-40 bg-white border border-black/15 rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`Viewing details of ${t.trip}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => alert(`Removing ${t.trip}`)}
                        >
                          <FiTrash2 size={16} />
                          Remove Trip
                        </button>
                      </div>
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

export default AllTrips;
