import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import ThemeSwitcher from 'react-theme-switcher';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CourseTable from './components/CourseTable/CourseTable';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [startDate, setStartDate] = useState(new Date());

  let ddate = startDate.toISOString().slice(0, 10);

  const notify = () => toast('Success!');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.nbp.pl/api/exchangerates/tables/A/${ddate}/?format=json`,
      );
      setCourses(res.data[0].rates);
      setLoading(false);
      notify();
    };
    fetchCourses();
  }, [ddate]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className={s.header}>
        <button className={s.button} onClick={() => setCourses([])}>
          {' '}
          Clear{' '}
        </button>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          className={s.date}
        />
      </div>
      <CourseTable courses={currentCourses} loading={loading} />
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={courses.length}
        paginate={paginate}
      />
      <ThemeSwitcher />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
