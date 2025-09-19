import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Overview = () => {
    const { trip } = useOutletContext();
    const axiosSecure = useAxiosSecure();

    // Fetch expenses
    const { data: expenses = [], isLoading } = useQuery({
        queryKey: ["expenses", trip?._id],
        queryFn: async () => {
            if (!trip?._id) return [];
            const res = await axiosSecure.get(`/expenses?tripId=${trip._id}`);
            return res.data.expenses || [];
        },
        enabled: !!trip?._id,
    });

    if (!trip || isLoading) return <p>Loading trip...</p>;

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = trip?.budget - totalSpent;
    const percentageUsed = trip?.budget
        ? ((totalSpent / trip.budget) * 100).toFixed(1)
        : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-6">
                {/* About This Trip */}
                <div className="bg-white shadow-sm rounded-lg p-5 border border-black/15">
                    <h2 className="font-bold mb-5">About This Trip</h2>
                    <p className="text-gray-600">{trip?.description}</p>
                </div>

                {/* Budget Overview */}
                <div className="bg-white shadow-sm rounded-lg p-5 border border-black/15">
                    <h2 className="font-bold mb-5">Budget Overview</h2>
                    <div className="flex justify-between mb-2.5">
                        <span>Total Budget</span>
                        <span className="font-bold">${trip?.budget}</span>
                    </div>
                    <div className="flex justify-between mb-2.5">
                        <span>Spent</span>
                        <span className="font-bold">${totalSpent}</span>
                    </div>
                    <div className="flex justify-between mb-2.5">
                        <span>Remaining</span>
                        <span className="text-green-600 font-bold">${remaining}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                        <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${percentageUsed}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{percentageUsed}% of budget used</p>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
                <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5">
                    <h2 className="font-bold mb-4">Travel Companions</h2>
                    <p className="text-gray-600 mb-2">{trip.participants} travelers</p>

                    <button className="mt-5 w-full flex items-center justify-center gap-2 px-3 py-2 shadow border border-black/15 rounded-lg text-sm hover:bg-gray-100">
                        ＋ Invite More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Overview;
