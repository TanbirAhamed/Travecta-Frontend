import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch trips
  const { data: trips = [], isLoading: loadingTrips } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trips");
      return res.data;
    },
  });

  // Helper with optional chaining
  const getTripsData = (user) => {
    const created =
      trips?.filter((t) => t?.createdBy === user?.email)?.length || 0;

    const joined =
      trips?.filter(
        (t) =>
          Array.isArray(t?.participants) &&
          t?.participants?.includes(user?.email)
      )?.length || 0;

    return { created, joined };
  };

  if (isLoading || loadingTrips) return <div>Loading....</div>

  return (
    <div className="mt-7">
      {/* Table */}
      <div className="bg-white border border-black/15 rounded-xl shadow">
        <div className="px-6 py-4 font-semibold text-gray-700">
          Users ({users?.length || 0})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-black/15">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Trips Created</th>
                <th className="px-6 py-3">Trips Joined</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u, i) => {
                const { created, joined } = getTripsData(u);
                return (
                  <tr
                    key={u?._id}
                    className="border-b border-black/15 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{u?.name}</div>
                      <div className="text-gray-500 text-xs">{u?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-900 text-white">
                        {u?.role || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{created}</td>
                    <td className="px-6 py-4">{joined}</td>
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
                        <div className="absolute right-0 p-1 mt-2 w-40 bg-white border border-black/15 rounded-lg shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => alert(`Viewing details of ${u?.name}`)}
                          >
                            View Details
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={() => alert(`Banning ${u?.name}`)}
                          >
                            Ban User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
