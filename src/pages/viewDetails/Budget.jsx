import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const Budget = () => {
  const { trip } = useOutletContext();
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const totalBudget = trip?.budget || 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const isCreator = user?.email === trip?.createdBy; 

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

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentageUsed = totalBudget
    ? ((totalSpent / totalBudget) * 100).toFixed(1)
    : 0;

  // Add expense mutation
  const mutation = useMutation({
    mutationFn: async (expenseData) => axiosSecure.post("/expenses", expenseData),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", trip?._id]);
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Expense added successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      setIsModalOpen(false);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not add expense. Try again.",
      });
    },
  });

  const onSubmit = (data) => {
    const expenseData = {
      tripId: trip?._id,
      tripName: trip?.tripName,
      createdBy: trip?.createdBy,
      expense: {
        title: data.title,
        date: data.date,
        amount: Number(data.amount),
      },
    };
    mutation.mutate(expenseData);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-7">
      {/* Expenses List */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-5 border border-black/15">
        <h2 className="text-lg font-semibold mb-1">Expenses</h2>
        <p className="text-gray-500 text-sm mb-4">Track your trip spending</p>

        <div className="space-y-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            expenses.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border border-black/15 rounded-lg p-3"
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{item.date}</span>
                  </div>
                </div>
                <p className="font-semibold">${item.amount}</p>
              </div>
            ))
          )}

          {/* Add Expense Button - only visible to creator */}
          {isCreator && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full border rounded-lg py-2 text-gray-900 flex border-black/15 items-center justify-center gap-2 hover:bg-gray-50"
            >
              <span className="text-xl">+</span> Add Expense
            </button>
          )}
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
        <div className="w-full bg-gray-200 h-3 rounded-full mb-2 overflow-hidden">
          <div
            className="h-3 bg-black rounded-full"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">{percentageUsed}% of budget used</p>
      </div>

      {/* Modal - only visible to creator */}
      {isCreator && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-3">Add Expense</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded"
                {...register("title", { required: true })}
              />
              <input
                type="date"
                className="border p-2 rounded"
                {...register("date", { required: true })}
              />
              <input
                type="number"
                placeholder="Amount"
                className="border p-2 rounded"
                {...register("amount", { required: true, min: 0 })}
              />
              <button
                type="submit"
                className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
