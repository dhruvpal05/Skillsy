import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems,
  itemsPerPage,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.container}>
      {showInfo && totalItems && itemsPerPage && (
        <div className={styles.info}>
          Showing {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)} to{' '}
          {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems} results
        </div>
      )}
      
      <nav className={styles.pagination} aria-label="Pagination">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className={styles.pages}>
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className={styles.ellipsis}>...</span>
              ) : (
                <Button
                  variant={page === currentPage ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </nav>
    </div>
  );
};