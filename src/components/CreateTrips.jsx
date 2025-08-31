import { FaInfo } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const CreateTrips = () => {
    const categories = ["Adventure", "Culture", "Food"];
    const [selected, setSelected] = useState(categories[0]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="mt-10 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold">Create New Trip</h1>
            <p className="mt-2">
                Plan your next adventure and invite others to join you on an unforgettable journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-6 p-4 md:p-0">
                <div className="col-span-0 md:col-span-2 rounded-xl shadow-md p-6 font-semibold">
                    <h1 className="flex items-center gap-0.5 text-xl font-bold">
                        <FaInfo />Basic Information
                    </h1>

                    <div className="mt-4">
                        <label className="block">Trip Name</label>
                        <input className="border border-black/30 rounded-md mt-1 w-full shadow-sm p-1.5" />
                    </div>

                    <div className="mt-2">
                        <label className="block">Destination</label>
                        <input className="border border-black/30 rounded-md mt-1 w-full shadow-sm p-1.5" />
                    </div>

                    <div className="mt-2 flex gap-5 justify-between">
                        <div>
                            <label className="block">Start Date</label>
                            <input className="border border-black/30 rounded-md mt-1 w-full shadow-sm p-1.5" />
                        </div>
                        <div>
                            <label className="block">End Date</label>
                            <input className="border border-black/30 rounded-md mt-1 w-full shadow-sm p-1.5" />
                        </div>
                    </div>

                    {/* ✅ Custom Dropdown with outside click close */}
                    <div className="mt-2 w-60 relative" ref={dropdownRef}>
                        <label className="block mb-1">Category</label>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="w-full rounded-md border border-black/30 p-2 text-left
                                       transition-all duration-300 ease-in-out 
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                                       hover:border-blue-400 hover:shadow-md"
                        >
                            {selected}
                        </button>

                        {open && (
                            <div className="absolute mt-1 w-full rounded-md border border-black/30 bg-white shadow-lg z-10">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelected(category);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer select-none p-2 rounded-md transition-colors 
                                                   hover:bg-blue-500 hover:text-white"
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="rounded-2xl shadow-md p-4">
                    <h1>Visibility</h1>
                </div>
                <div className="col-span-0 md:col-span-2 rounded-xl shadow-md p-6 font-semibold">
                    <h1 className="flex items-center gap-0.5 text-xl font-bold">
                       Basic Information
                    </h1>
                    <div className="mt-2">
                        <label className="block">Trip Description</label>
                        <input className="border border-black/30 rounded-md mt-1 w-full shadow-sm p-1.5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTrips;
