import { useState } from "react";
import { FaPlaneArrival, FaHotel, FaUtensils, FaLandmark } from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";
import ActivityItem from "./ActivityItem";

const Itinerary = () => {
    const [days, setDays] = useState([
        {
            title: "Day 1 - Arrival & Shibuya",
            date: "Sunday, Dec 15",
            activities: [
                { time: "14:00", title: "Arrive at Narita Airport", Icon: FaPlaneArrival },
                { time: "16:00", title: "Check into Hotel", Icon: FaHotel },
                { time: "18:00", title: "Shibuya Crossing & Dinner", Icon: MdDinnerDining },
            ],
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDay, setNewDay] = useState({
        title: "",
        date: "",
        activities: [{ time: "", title: "", Icon: FaLandmark }],
    });

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
            activities: [...newDay.activities, { time: "", title: "", Icon: FaLandmark }],
        });
    };

    const handleSubmit = () => {
        if (!newDay.title || !newDay.date) return;
        setDays([...days, newDay]);
        setNewDay({ title: "", date: "", activities: [{ time: "", title: "", Icon: FaLandmark }] });
        setIsModalOpen(false);
    };

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
                                Icon={activity.Icon}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Add New Day Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
                >
                    <span className="text-xl">+</span> Add New Day
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
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

                        <button
                            onClick={addActivityField}
                            className="text-sm text-blue-600 mb-4"
                        >
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
