import React, { useState } from "react";
import { FiMoreVertical, FiUsers, FiTrash2 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllTrips = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch trips from backend
  const { data: trips = [], isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trips");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading....</div>

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
          All Trips ({trips?.length || 0})
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
              {trips?.map((t, i) => (
                <tr
                  key={t?._id}
                  className="border-b border-black/15 hover:bg-gray-50"
                >
                  {/* Trip info */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{t?.tripName}</div>
                      <div className="text-gray-500 text-xs">
                        {t?.destination}
                      </div>
                    </div>
                  </td>

                  {/* Creator */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={t?.tripImage}
                        alt={t?.createdBy}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{t?.createdBy}</span>
                    </div>
                  </td>

                  {/* Visibility */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${t?.visibility === "public"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {t?.visibility}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {t?.category}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="px-6 py-4">
                    {t?.startDate} - {t?.endDate}
                  </td>

                  {/* Participants */}
                  <td className="px-6 py-4 flex items-center gap-1">
                    <FiUsers size={16} />
                    {t?.participants || 0}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 relative">
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
                          onClick={() =>
                            alert(`Viewing details of ${t?.tripName}`)
                          }
                        >
                          View Details
                        </button>
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => alert(`Removing ${t?.tripName}`)}
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
