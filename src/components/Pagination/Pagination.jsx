import React from 'react';
import s from './Pagination.module.css';

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={s.items}>
            <a onClick={() => paginate(number)} href='!#' className={s.link}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;