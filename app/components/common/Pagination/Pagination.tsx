import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: currentPage === i ? 'lightblue' : 'white' }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='flex justify-center p-10'>
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
