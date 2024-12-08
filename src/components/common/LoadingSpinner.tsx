import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-24 h-24",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          ${sizeClasses[size]} 
          border-4 border-blue-500 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
