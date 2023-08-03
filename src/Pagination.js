import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        {"<<"}
        {/* Pagination to go firstPage */}
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
        {/* Pagination to go previousPage */}
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
        {/* Pagination to go NextPage */}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
        {/* Pagination to go lastPage */}
      </button>
    </div>
  );
};

export default Pagination;
