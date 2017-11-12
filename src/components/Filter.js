import React from 'react';

const Filter = props => {
  return (
    <div className="filter">
      <label htmlFor="assignee">Ответственный:</label>
      <select id="assignee" onChange={props.redirect} value={props.search}>
        <option value='0'></option>
        {
          props.users.map(user => {
            return <option value={user.id} key={user.id}>{user.name}</option>
          })
        }
      </select>
    </div>
  );
};

export default Filter;