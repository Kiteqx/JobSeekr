import React, { ReactElement } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '@/utils/hooks/redux';
import { changePage } from '@/store/reducers/allJobsSlice';
import styles from './Pagination.module.scss';

const Pagination = (): ReactElement => {
  const { numOfPages, currentPage } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handleNextPage = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let newPage = currentPage + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }

    dispatch(changePage(newPage));
  };

  const handlePrevPage = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = numOfPages; // last page
    }

    dispatch(changePage(newPage));
  };

  const handleChangePage = (pageNumber: number): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(changePage(pageNumber));
  };

  return (
    <section className={styles.section}>
      <button className={styles.prevBtn} onClick={handlePrevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className={styles.btnContainer}>
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={`${styles.pageBtn} ${pageNumber === currentPage ? styles.active : ''}`}
              key={pageNumber}
              onClick={(): void => handleChangePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className={styles.nextBtn} onClick={handleNextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </section>
  );
};

export default Pagination;
