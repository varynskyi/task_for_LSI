import React from 'react';
import s from './CourseTable.module.css'
import { Audio } from  'react-loader-spinner'

const CourseTable = ({ courses, loading }) => {
  if (loading) {
    return <Audio
    height="100"
    width="100"
    color='grey'
    ariaLabel='loading'
  />;
  }

  return (
    <div className='s.container'>
      <table className={s.table}>
        <thead className={s.head}>
          <tr>
            <th className={s.cell}>Symbol waluty</th>
            <th className={s.cell}>Waluta</th>
            <th className={s.cell}>Kurs waluty</th>
          </tr>
        </thead>

        <tbody>
          {courses.map(({ id, currency, code, mid }) => (
            <tr key={id}>
              <td className={s.cell}>{currency}</td>
              <td className={s.cell}>{code}</td>
              <td className={s.cell}>{mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
