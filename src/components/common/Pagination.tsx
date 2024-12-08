import React, { useState } from "react";
import {
  TbSquareChevronLeftFilled,
  TbSquareChevronRightFilled,
} from "react-icons/tb";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState(currentPage.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    const pageNum = parseInt(inputPage);
    if (pageNum > 0 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      // Reset to current page if input is invalid
      setInputPage(currentPage.toString());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {/* Previous Page Button */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="
          p-2 rounded-full 
          bg-gray-200 text-gray-700 
          hover:bg-gray-300 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        "
      >
        <TbSquareChevronLeftFilled className="w-5 h-5" />
      </button>

      {/* Page Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          className="
            w-16 h-10 text-center 
            border-2 border-gray-300 
            rounded-md 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            text-sm
          "
        />
        <span className="text-gray-600 text-sm">of {totalPages}</span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="
          p-2 rounded-full 
          bg-gray-200 text-gray-700 
          hover:bg-gray-300 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        "
      >
        <TbSquareChevronRightFilled className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
