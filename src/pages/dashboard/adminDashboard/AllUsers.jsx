import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";

const AllUsers = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRef = useRef(null);

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      tripsCreated: 2,
      tripsJoined: 1,
      joined: "Jan 15, 2024",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      status: "Active",
      tripsCreated: 1,
      tripsJoined: 3,
      joined: "Jan 20, 2024",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Mike Chen",
      email: "mike@example.com",
      status: "Active",
      tripsCreated: 1,
      tripsJoined: 2,
      joined: "Feb 1, 2024",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "Emma Rodriguez",
      email: "emma@example.com",
      status: "Banned",
      tripsCreated: 0,
      tripsJoined: 1,
      joined: "Feb 10, 2024",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Alex Thompson",
      email: "alex@example.com",
      status: "Active",
      tripsCreated: 1,
      tripsJoined: 0,
      joined: "Feb 20, 2024",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
            placeholder="Search users..."
            className="border border-black/15 rounded-lg px-4 py-2 flex-1"
          />
          <select className="border border-black/15 rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Banned</option>
          </select>
          <button className="border border-black/15 rounded-lg px-4 py-2 bg-gray-100">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/15 rounded-xl shadow">
        <div className="px-6 py-4 font-semibold text-gray-700">
          Users ({users.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-black/15">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Trips Created</th>
                <th className="px-6 py-3">Trips Joined</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b border-black/15 hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-gray-500 text-xs">{u.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        u.status === "Active"
                          ? "bg-gray-900 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.tripsCreated}</td>
                  <td className="px-6 py-4">{u.tripsJoined}</td>
                  <td className="px-6 py-4">{u.joined}</td>
                  <td className="px-6 py-4 relative" ref={dropdownRef}>
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiMoreVertical size={18} />
                    </button>

                    {openIndex === i && (
                      <div className="absolute right-0 p-1 mt-2 w-40 bg-white border border-black/15 rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`Viewing details of ${u.name}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => alert(`Banning ${u.name}`)}
                        >
                          Ban User
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

export default AllUsers;
