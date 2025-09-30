import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePrevious = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-slate-200 mt-6 pt-4">
            <button
                onClick={handlePrevious}
                disabled={isFirstPage}
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                <span>Trang trước</span>
            </button>
            <div className="text-sm text-slate-700">
                Trang <span className="font-medium">{currentPage}</span> trên <span className="font-medium">{totalPages}</span>
            </div>
            <button
                onClick={handleNext}
                disabled={isLastPage}
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <span>Trang sau</span>
                <ChevronRightIcon className="h-5 w-5 ml-2" />
            </button>
        </div>
    );
};

export default Pagination;
