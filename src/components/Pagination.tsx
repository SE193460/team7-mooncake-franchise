import { useState } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [goToPageInput, setGoToPageInput] = useState('');
  
  // Smart pagination logic
  const isSmallPagination = totalPages <= 10;
  const maxPagesToShow = isSmallPagination ? totalPages : 5;
  
  let startPage = isSmallPagination ? 1 : Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = isSmallPagination ? totalPages : Math.min(totalPages, startPage + maxPagesToShow - 1);
  startPage = Math.max(1, endPage - maxPagesToShow + 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPageInput, 10);
    
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setGoToPageInput('');
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
        title="Trang trước"
      >
        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {!isSmallPagination && startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={styles.button}
          >
            1
          </button>
          {startPage > 2 && (
            <span className={styles.ellipsis}>...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.button} ${currentPage === page ? styles.buttonActive : ''}`}
        >
          {page}
        </button>
      ))}

      {!isSmallPagination && endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className={styles.ellipsis}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={styles.button}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
        title="Trang sau"
      >
        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {!isSmallPagination && (
        <form onSubmit={handleGoToPage} className={styles.goToForm}>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPageInput}
            onChange={(e) => setGoToPageInput(e.target.value)}
            placeholder="Trang..."
            className={styles.goToInput}
          />
          <button type="submit" className={styles.goToButton}>
            Go
          </button>
        </form>
      )}
    </div>
  );
}
