

const requests = [
    {
        id: 1,
        name: "Sarah Wilson",
        trip: "European Adventure",
        message:
            "I'd love to join this European adventure! I'm an experienced traveler and would love to explore these cities with like-minded people.",
        date: "Mar 20, 2024",
        avatar:
            "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        name: "David Kim",
        trip: "Bali Wellness Retreat",
        message:
            "This wellness retreat sounds perfect for me! I've been looking for a way to disconnect and recharge.",
        date: "Mar 18, 2024",
        avatar:
            "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 3,
        name: "Emma Thompson",
        trip: "European Adventure",
        message:
            "I'm a solo female traveler and would love to join this group trip for safety and companionship!",
        date: "Mar 15, 2024",
        avatar:
            "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

const JoinRequests = () => {

    return (
        <div className="space-y-4 p-6">
            {requests.map((req) => (
                <div
                    key={req.id}
                    className="border rounded-xl p-4 shadow-sm bg-white"
                >
                    {/* Profile Section */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <img
                                src={req.avatar}
                                alt={req.name}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="font-semibold">{req.name}</p>
                                <p className="text-sm text-gray-600">
                                    wants to join "{req.trip}"
                                </p>
                            </div>
                        </div>
                        {/* Date + Actions */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700">
                                    ✓ Accept
                                </button>
                                <button className="border border-gray-400 px-4 py-1 rounded-md hover:bg-gray-200">
                                    ✕ Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="bg-gray-100 rounded-md p-3 text-gray-800 text-sm mb-2">
                        {req.message}
                    </p>
                    <span className="text-xs text-gray-500">
                        Requested on {req.date}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default JoinRequests;
