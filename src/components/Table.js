import React from 'react';
import { Link } from 'react-router-dom';

const Table = props => {
  return (
    <table className="vacancies">
      <thead className="vacancies__head">
      <tr>
        <th>Вакансия</th>
        <th>Описание</th>
        <th>Ответственный</th>
      </tr>
      </thead>
      <tbody className="vacancies__body">
      {props.vacancies.map(vacancy => {
        return (
          <tr
            key={vacancy.id}
            className={props.search.length > 0 && vacancy.assignees.filter(item => item == +props.search).length === 0 ? 'hide' : 'show'}>
            <td><Link to={'/vacancies/'+vacancy.id}>{vacancy.title}</Link></td>
            <td>{vacancy.description}</td>
            <td>
              {
                vacancy.assignees.map(
                  (assignee, key) => {
                    return <span className="assignee-name" key={key}>
                            {props.users.map(user => { return (user.id === assignee) && (user.name)}) }
                          </span> })
              }
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default Table;