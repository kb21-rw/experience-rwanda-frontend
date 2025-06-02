"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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
  return (
    <div className="flex justify-center gap-2 mt-6 sticky bottom-0 rounded-full shadow-md p-2 border-b-2 bg-white">
      <button
        className="p-2 rounded-full bg-gray-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-8 h-8 rounded-full text-sm font-medium ${
            page === currentPage ? "bg-black text-white" : "text-black"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="p-2 rounded-full bg-gray-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
