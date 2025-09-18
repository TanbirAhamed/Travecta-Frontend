import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

const ActivityItem = ({ time, title, Icon }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      onClick={() => setChecked(!checked)}
      className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition 
        ${checked ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Icon className={`text-gray-600 text-lg ${checked ? "text-green-600" : ""}`} />
        <div>
          <p className="text-sm text-gray-500">{time}</p>
          <p className={`font-medium ${checked ? "line-through text-gray-500" : ""}`}>
            {title}
          </p>
        </div>
      </div>

      {/* Checkbox */}
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
