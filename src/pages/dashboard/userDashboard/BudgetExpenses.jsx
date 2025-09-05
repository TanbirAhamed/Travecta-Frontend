import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const categoryData = [
    { name: "Transportation", value: 800 },
    { name: "Accommodation", value: 1200 },
    { name: "Food & Dining", value: 600 },
    { name: "Activities", value: 400 },
    { name: "Shopping", value: 300 },
    { name: "Other", value: 200 },
];

const monthlyData = [
    { name: "Jan", amount: 1200 },
    { name: "Feb", amount: 800 },
    { name: "Mar", amount: 1800 },
    { name: "Apr", amount: 600 },
    { name: "May", amount: 2200 },
    { name: "Jun", amount: 4000 },
];

const infoCard = [
    { id: 1, title: "Amount", amount: "5,000", description: "For all trips this year" },
    { id: 2, title: "Total Spent", amount: "3,500", description: "70.0% of budget used" },
    { id: 3, title: "Remaining", amount: "1,500", description: "Under budget" },
];

const recentExpenses = [
    {
        id: 1,
        title: "Flight to Tokyo",
        category: "Transportation",
        date: "12/1/2024",
        amount: 650,
        trip: "Tokyo Adventure",
    },
    {
        id: 2,
        title: "Hotel Booking",
        category: "Accommodation",
        date: "12/2/2024",
        amount: 400,
        trip: "Tokyo Adventure",
    },
    {
        id: 3,
        title: "Dinner at Sushi Restaurant",
        category: "Food & Dining",
        date: "12/3/2024",
        amount: 85,
        trip: "Tokyo Adventure",
    },
    {
        id: 4,
        title: "Tokyo Disneyland Tickets",
        category: "Activities",
        date: "12/4/2024",
        amount: 120,
        trip: "Tokyo Adventure",
    },
    {
        id: 5,
        title: "Souvenirs",
        category: "Shopping",
        date: "12/5/2024",
        amount: 75,
        trip: "Tokyo Adventure",
    },
];

const COLORS = ["#4285F4", "#00C49F", "#FFBB28", "#FF4C4C", "#A142F4", "#5F6368"];

const BudgetExpenses = () => {
    const [expenses, setExpenses] = useState(recentExpenses);
    const [form, setForm] = useState({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!form.description || !form.amount || !form.category) return;

        const newExpense = {
            id: expenses.length + 1,
            title: form.description,
            category: form.category,
            date: form.date,
            amount: parseFloat(form.amount),
            trip: "Tokyo Adventure",
        };

        setExpenses([newExpense, ...expenses]);
        setForm({
            description: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        });
    };
    return (
        <div className="mb-5 mt-10">
            <div>
                <h1 className="text-xl font-bold">Budget & Expenses</h1>
                <p className="text-gray-500">Track your travel spending and stay within budget</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                {infoCard.map((info) => (
                    <div key={info.id} className="bg-white rounded-xl shadow-md p-6">
                        <div className="mt-3.5">
                            <h2 className="font-bold">{info.title}</h2>
                            <h2 className="font-bold text-lg">{info.amount}</h2>
                            <p className="mt-2 text-gray-600">{info.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Budget Progress */}
            <div className="mt-10">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h1 className="font-bold">Budget Progress</h1>
                    <p className="text-gray-500 text-sm">How much you've spent across all categories</p>
                    <div className="flex justify-between mt-4">
                        <p>Overall Progress</p>
                        <p>$3500 / $5000</p>
                    </div>
                    <progress className="progress w-full mt-2" value="70" max="100"></progress>
                </div>
            </div>

            {/* Spending by Category & Monthly Spending */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {/* Pie Chart Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="font-bold">Spending by Category</h2>
                    <p className="text-gray-500 text-sm mb-6">Breakdown of your travel expenses</p>

                    {/* Donut Chart */}
                    <div style={{ width: "100%", height: 250 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend below chart */}
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-6 text-sm">
                        {categoryData.map((item, index) => (
                            <div key={item.name} className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span
                                        className="inline-block w-3 h-3 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></span>
                                    <span className="text-gray-700">{item.name}</span>
                                </div>
                                <span className="font-medium">${item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Spending (Bar Chart) */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="font-bold">Monthly Spending</h2>
                    <p className="text-gray-500 text-sm mb-6">Your travel expenses over time</p>

                    <div style={{ width: "100%", height: 250 }}>
                        <ResponsiveContainer>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#4285F4" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            {/* Add Expense + Recent Expenses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {/* Add New Expense Form */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="font-bold mb-1">Add New Expense</h2>
                    <p className="text-gray-600 mb-4">Record a new travel expense</p>

                    <form onSubmit={handleAddExpense} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="e.g., Flight to Paris"
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">Select category</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Accommodation">Accommodation</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Activities">Activities</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                        >
                            <span>＋</span>
                            <span>Add Expense</span>
                        </button>
                    </form>
                </div>

                {/* Recent Expenses List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="font-bold mb-1">Recent Expenses</h2>
                    <p className="text-gray-600 mb-4">Your latest travel expenses</p>

                    <div className="space-y-4">
                        {expenses.map((exp) => (
                            <div
                                key={exp.id}
                                className="flex justify-between items-center border rounded-lg p-4"
                            >
                                <div>
                                    <h3 className="font-medium">{exp.title}</h3>
                                    <div className="flex flex-wrap items-center text-xs text-gray-600 space-x-2 mt-1">
                                        <span className="border px-2 py-0.5 rounded-full text-gray-700">
                                            {exp.category}
                                        </span>
                                        <span>{exp.date}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">${exp.amount}</p>
                                    <p className="text-gray-600 text-xs">{exp.trip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BudgetExpenses;
