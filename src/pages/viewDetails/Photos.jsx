import React from "react";

const Photos = () => {
  const photos = [
    "https://via.placeholder.com/200x120", 
    "https://via.placeholder.com/200x120",
    "https://via.placeholder.com/200x120",
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-7 border border-black/15">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Trip Photos</h2>
          <p className="text-sm text-gray-500 mt-0.5">Share your travel memories</p>
        </div>

        {/* Upload Button */}
        <button className="flex items-center gap-1 bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800">
          <span className="text-lg">+</span> Upload Photos
        </button>
      </div>

      {/* Photos Grid */}
      <div className="flex gap-4">
        {photos.map((src, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden">
            <img
              src={src}
              alt={`Trip ${idx}`}
              className="w-48 h-28 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
