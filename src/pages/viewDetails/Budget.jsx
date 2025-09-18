import React from "react";

const Budget = () => {
  const expenses = [
    {
      title: "Flight tickets",
      category: "Transportation",
      date: "12/1/2024",
      amount: 650,
    },
    {
      title: "Hotel booking",
      category: "Accommodation",
      date: "12/2/2024",
      amount: 400,
    },
    {
      title: "Travel insurance",
      category: "Other",
      date: "12/3/2024",
      amount: 85,
    },
  ];

  const totalBudget = 2500;
  const totalSpent = 1800;
  const remaining = totalBudget - totalSpent;
  const percentageUsed = ((totalSpent / totalBudget) * 100).toFixed(1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-7">
      {/* Expenses */}
      <div className="w-full lg:w-1/2 bg-white  shadow-md rounded-lg p-5 border border-black/15">
        <h2 className="text-lg font-semibold mb-1">Expenses</h2>
        <p className="text-gray-500 text-sm mb-4">Track your trip spending</p>

        <div className="space-y-3">
          {expenses.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border border-black/15 rounded-lg p-3"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md mt-1 text-xs">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
              <p className="font-semibold">${item.amount}</p>
            </div>
          ))}

          {/* Add Expense */}
          <button className="w-full border rounded-lg py-2 text-gray-900 flex border-black/15 items-center justify-center gap-2 hover:bg-gray-50">
            <span className="text-xl">+</span> Add Expense
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="w-full lg:w-1/2 bg-white shadow-md border border-black/15 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Budget Summary</h2>

        <div className="flex justify-between text-sm mb-3">
          <span>Total Budget</span>
          <span className="font-semibold">${totalBudget}</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span>Total Spent</span>
          <span className="font-semibold">${totalSpent}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Remaining</span>
          <span className="font-semibold text-green-600">${remaining}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full mb-2">
          <div
            className="h-3 bg-black rounded-full"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">{percentageUsed}% of budget used</p>
      </div>
    </div>
  );
};

export default Budget;
