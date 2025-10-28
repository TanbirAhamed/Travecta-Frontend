import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers, FiEdit, FiUserPlus } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import Tabs from "./Tabs";
import { Outlet, useParams } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ViewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      });
  }, [id]);

  const handleInvite = async () => {
    if (!inviteEmail) {
      return Swal.fire("Error", "Please enter an email", "error");
    }

    try {
      const res = await axiosSecure.post("/trips/invite", {
        tripId: trip._id,
        email: inviteEmail,
      });

      Swal.fire("Success", res.data.message, "success");
      setInviteEmail("");
      setShowInvite(false);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to invite user",
        "error"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p className="text-gray-600">Trip not found.</p>;

  const isCreator = user?.email === trip?.createdBy;

  const formatDate = (dateStr) => {
    return dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      : "";
  };

  return (
    <div className="mt-14 max-w-[1536px] mx-auto px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        {/* Trip Header */}
        <div className="h-52 bg-black w-full relative">
          <img
            src={trip?.tripImage}
            alt={trip?.tripName}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {trip?.tripName}
              <span className="bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                {trip?.category}
              </span>
            </h1>
            <p className="flex items-center gap-2 text-gray-200 mt-1">
              <IoLocationOutline /> {trip?.destination}
            </p>
          </div>
        </div>

        {/* Trip Info */}
        <div className="p-6 mt-5 mb-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-gray-500" />
                {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
              </div>
              <div className="flex items-center gap-2">
                <BiDollar className="text-gray-500" />${trip?.budget}
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gray-500" />
                {trip?.participants} travelers
              </div>
            </div>

            {/* Buttons for Creator */}
            {isCreator && (
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                  onClick={() => setShowInvite(true)}
                >
                  <FiUserPlus /> Invite
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                  <FiEdit /> Edit Trip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Invite Collaborator</h2>
            <input
              type="email"
              placeholder="Enter user email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="border w-full px-3 py-2 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInvite(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs + Subpages */}
      <Tabs />
      <Outlet context={{ trip }} />
    </div>
  );
};

export default ViewDetails;
