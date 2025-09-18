
const Overview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-6">
                {/* About This Trip */}
                <div className="bg-white shadow-sm rounded-lg p-5 border border-black/15">
                    <h2 className="font-bold mb-5">About This Trip</h2>
                    <p className="text-gray-600">
                        Exploring the vibrant culture and cuisine of Tokyo with friends.
                        We’ll visit temples, try authentic ramen, and experience the
                        bustling city life.
                    </p>
                </div>

                {/* Budget Overview */}
                <div className="bg-white shadow-sm rounded-lg p-5 border border-black/15">
                    <h2 className="font-bold mb-5">Budget Overview</h2>
                    <div className="flex justify-between mb-2.5">
                        <span>Total Budget</span>
                        <span className="font-bold">$2500</span>
                    </div>
                    <div className="flex justify-between mb-2.5">
                        <span>Spent</span>
                        <span className="font-bold">$1800</span>
                    </div>
                    <div className="flex justify-between mb-2.5">
                        <span>Remaining</span>
                        <span className="text-green-600 font-bold">$700</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                        <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: "72%" }}
                        ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">72.0% of budget used</p>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
                <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5">
                    <h2 className="font-bold mb-4">Travel Companions</h2>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                            D
                        </div>
                        <div>
                            <p className="font-medium">Demo User</p>
                            <p className="text-gray-500 text-sm">Trip Organizer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                            J
                        </div>
                        <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-gray-500 text-sm">john@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                            J
                        </div>
                        <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-gray-500 text-sm">jane@example.com</p>
                        </div>
                    </div>
                    <button className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 shadow border border-black/15 rounded-lg text-sm hover:bg-gray-100">
                        ＋ Invite More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Overview