import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendarAlt, FaDollarSign, FaUserFriends } from "react-icons/fa";

const CreateTrips = () => {
    const categories = ["Adventure", "Culture", "Food"];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setSelectedImages(previews);
    };

    const onSubmit = (data) => {
        console.log("Trip Data:", data);
    };

    return (
        <div className="mt-10 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold">Create New Trip</h1>
            <p className="mt-2 text-gray-600">
                Plan your next adventure and invite others to join you on an unforgettable journey.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6"
            >
                {/* LEFT SIDE */}
                <div className="col-span-0 md:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="flex items-center gap-2 text-lg font-bold mb-4">
                            <FaCalendarAlt /> Basic Information
                        </h1>

                        {/* Trip Name */}
                        <div>
                            <label className="block">Trip Name *</label>
                            <input
                                placeholder="e.g., European Adventure"
                                {...register("tripName", { required: "Trip name is required" })}
                                className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                            />
                            {errors.tripName && (
                                <p className="text-red-500 text-sm">{errors.tripName.message}</p>
                            )}
                        </div>

                        {/* Destination */}
                        <div className="mt-3">
                            <label className="block">Destination *</label>
                            <input
                                placeholder="e.g., Paris, Rome, Barcelona"
                                {...register("destination", { required: "Destination is required" })}
                                className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                            />
                            {errors.destination && (
                                <p className="text-red-500 text-sm">{errors.destination.message}</p>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="mt-3 flex gap-5">
                            <div className="w-full">
                                <label className="block">Start Date *</label>
                                <input
                                    type="date"
                                    {...register("startDate", { required: "Start date is required" })}
                                    className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                                />
                                {errors.startDate && (
                                    <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="block">End Date *</label>
                                <input
                                    type="date"
                                    {...register("endDate", { required: "End date is required" })}
                                    className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                                />
                                {errors.endDate && (
                                    <p className="text-red-500 text-sm">{errors.endDate.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Multiple Images */}
                        <div className="mt-3">
                            <label className="block">Upload Images *</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                {...register("images", { required: "At least one image is required" })}
                                onChange={handleImageChange}
                                className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                            />
                            {errors.images && (
                                <p className="text-red-500 text-sm">{errors.images.message}</p>
                            )}

                            {/* Image Preview */}
                            {selectedImages.length > 0 && (
                                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {selectedImages.map((src, i) => (
                                        <div key={i} className="relative">
                                            {/* Cancel / Remove Button */}
                                            <button
                                                onClick={() =>
                                                    setSelectedImages((prev) => prev.filter((_, index) => index !== i))
                                                }
                                                className="absolute top-1 right-1 text-red-500  p-1 hover:text-red-800 text-sm font-bold"
                                            >
                                                ✕
                                            </button>

                                            {/* Preview Image */}
                                            <img
                                                src={src}
                                                alt={`preview-${i}`}
                                                className="w-full h-32 object-cover rounded-md border"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mt-3">
                            <label className="block">Category *</label>
                            <select
                                {...register("category", { required: "Please select a category" })}
                                defaultValue=""
                                className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {categories.map((c, i) => (
                                    <option key={i} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="text-lg font-bold mb-2">Description</h1>
                        <label className="block">Trip Description *</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Describe your trip, what makes it special, and what participants can expect..."
                            className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                            Dates and per-person budget may change based on circumstances.
                        </p>
                    </div>

                    {/* Budget & Participants */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="flex items-center gap-2 text-lg font-bold mb-2">
                            <FaDollarSign /> Budget & Participants
                        </h1>
                        <div className="flex gap-5">
                            <div className="w-full">
                                <label className="block">Budget per Person (USD) *</label>
                                <input
                                    type="number"
                                    defaultValue={2500}
                                    {...register("budget", { required: "Budget is required" })}
                                    className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block">Maximum Participants *</label>
                                <input
                                    type="number"
                                    defaultValue={6}
                                    {...register("participants", { required: "Participants required" })}
                                    className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Invite Collaborators */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="flex items-center gap-2 text-lg font-bold mb-2">
                            <FaUserFriends /> Invite Collaborators
                        </h1>
                        <label className="block">Email Addresses</label>
                        <input
                            type="email"
                            {...register("collaborators")}
                            placeholder="friend@example.com"
                            className="border border-gray-300 rounded-md mt-1 w-full shadow-sm p-2"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Add email addresses of people you want to invite as collaborators
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    {/* Visibility */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="text-lg font-bold mb-3">Visibility</h1>
                        <div className="space-y-2 text-sm text-gray-600">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="public"
                                    defaultChecked
                                    {...register("visibility")}
                                />
                                <span>
                                    <b>Public</b> – Anyone can discover and request to join
                                </span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="private"
                                    {...register("visibility")}
                                />
                                <span>
                                    <b>Private</b> – Only invited people can access
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="rounded-xl shadow-md p-6 bg-white space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                        >
                            Create Trip
                        </button>
                        <button
                            type="reset"
                            className="w-full border border-gray-400 py-2 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="rounded-xl shadow-md p-6 bg-white">
                        <h1 className="text-lg font-bold mb-3">Tips for Success</h1>
                        <ul className="list-disc ml-5 space-y-1 text-gray-600 text-sm">
                            <li>Be specific about your destination and activities</li>
                            <li>Set realistic budgets and participant limits</li>
                            <li>Public trips get more visibility and requests</li>
                            <li>You can always edit details later</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTrips;
