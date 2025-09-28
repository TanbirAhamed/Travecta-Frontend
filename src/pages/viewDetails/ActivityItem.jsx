import { useState } from "react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

const ActivityItem = ({ time, title, isCreator }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (!isCreator) return; 
    setChecked(!checked);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between border rounded-lg p-3 transition
        ${checked ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}
        ${!isCreator ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {checked ? (
          <BsCheckCircle className="text-green-600 text-xl" />
        ) : (
          <BsCircle className="text-gray-400 text-xl" />
        )}
        <div>
          <p className="text-sm text-gray-500">{time}</p>
          <p className={`font-medium ${checked ? "line-through text-gray-500" : ""}`}>
            {title}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div>
        {checked ? (
          <BsCheckCircle className="text-green-600 text-xl" />
        ) : (
          <span className="w-5 h-5 border border-gray-400 rounded-full inline-block" />
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
