import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ActivityItem from "./ActivityItem";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useOutletContext } from "react-router";
import useAuth from "../../hooks/useAuth"; 

const Itinerary = () => {
    const { trip } = useOutletContext();
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDay, setNewDay] = useState({
        title: "",
        date: "",
        activities: [{ time: "", title: "" }],
    });

    const isCreator = user?.email === trip?.createdBy;

    const { data: days = [], isLoading } = useQuery({
        queryKey: ["itinerary", trip?._id],
        queryFn: async () => {
            if (!trip?._id) return [];
            const res = await axiosPublic.get(`/itinerary?tripId=${trip._id}`);
            return res.data.itinerary || [];
        },
        enabled: !!trip?._id,
    });

    // Mutation to add new day
    const mutation = useMutation({
        mutationFn: async (day) => {
            if (!trip?._id) throw new Error("Trip not found!");
            return axiosSecure.post("/itinerary", {
                tripId: trip._id,
                tripName: trip.tripName,
                createdBy: trip.createdBy,
                day,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["itinerary", trip._id]);
            Swal.fire({
                icon: "success",
                title: "Added!",
                text: "Itinerary day added successfully",
                timer: 1500,
                showConfirmButton: false,
            });
            setNewDay({ title: "", date: "", activities: [{ time: "", title: "" }] });
            setIsModalOpen(false);
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Could not add itinerary day. Try again.",
            });
        },
    });

    // Handlers
    const handleChange = (field, value) => {
        setNewDay({ ...newDay, [field]: value });
    };

    const handleActivityChange = (index, field, value) => {
        const updatedActivities = [...newDay.activities];
        updatedActivities[index][field] = value;
        setNewDay({ ...newDay, activities: updatedActivities });
    };

    const addActivityField = () => {
        setNewDay({
            ...newDay,
            activities: [...newDay.activities, { time: "", title: "" }],
        });
    };

    const handleSubmit = () => {
        if (!newDay.title || !newDay.date) {
            Swal.fire({
                icon: "error",
                title: "Incomplete!",
                text: "Please fill day title and date.",
            });
            return;
        }

        const hasActivity = newDay.activities.some((act) => act.title.trim() !== "");
        if (!hasActivity) {
            Swal.fire({
                icon: "error",
                title: "Incomplete!",
                text: "Please add at least one activity with a title.",
            });
            return;
        }

        mutation.mutate(newDay);
    };

    if (isLoading) return <p>Loading itinerary...</p>;

    return (
        <div className="mt-7 space-y-6">
            {days.map((day, index) => (
                <div key={index} className="border border-black/15 rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">{day.title}</h2>
                        <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                    <div className="space-y-3">
                        {day.activities.map((activity, idx) => (
                            <ActivityItem
                                key={idx}
                                time={activity.time}
                                title={activity.title}
                                isCreator={isCreator} 
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* ✅ Only creator can add new day */}
            {isCreator && (
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
                    >
                        <span className="text-xl">+</span> Add New Day
                    </button>
                </div>
            )}

            {/* ✅ Modal only for creator */}
            {isModalOpen && isCreator && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-lg font-bold mb-4">Add New Day</h2>

                        <input
                            type="text"
                            placeholder="Day Title (e.g. Day 2 - Tokyo Tour)"
                            value={newDay.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <div className="mb-3">
                            <input
                                type="date"
                                value={newDay.rawDate || ""}
                                onChange={(e) => {
                                    const raw = e.target.value;
                                    const options = { weekday: "long", month: "short", day: "numeric" };
                                    const formatted = new Date(raw).toLocaleDateString("en-US", options);
                                    setNewDay({ ...newDay, rawDate: raw, date: formatted });
                                }}
                                className="w-full border p-2 rounded mb-1"
                            />
                            <input
                                type="text"
                                placeholder="Date (e.g. Sunday, Dec 15)"
                                value={newDay.date}
                                readOnly
                                className="w-full border p-2 rounded bg-gray-100"
                            />
                        </div>

                        <h3 className="font-semibold mb-2">Activities</h3>
                        {newDay.activities.map((activity, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input
                                    type="time"
                                    placeholder="Time (e.g. 10:00)"
                                    value={activity.time}
                                    onChange={(e) => handleActivityChange(idx, "time", e.target.value)}
                                    className="border p-2 rounded w-24"
                                />
                                <input
                                    type="text"
                                    placeholder="Activity title"
                                    value={activity.title}
                                    onChange={(e) => handleActivityChange(idx, "title", e.target.value)}
                                    className="border p-2 rounded flex-1"
                                />
                            </div>
                        ))}

                        <button onClick={addActivityField} className="text-sm text-blue-600 mb-4">
                            + Add Another Activity
                        </button>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded bg-black text-white"
                            >
                                Save Day
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Itinerary;
