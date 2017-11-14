export function getVacancies() {
  return dispatch => {
    if (localStorage.getItem('vacancies')) {
      dispatch({type: 'SET_VACANCIES', payload: JSON.parse(localStorage.getItem('vacancies'))});
    } else {
      fetch('https://arainay.github.io/vacancies/api/vacancies.json')
        .then(
          response => {
            if (response.status === 200)
              return response.json();
            throw new Error(response.status);
          }
        )
        .then(json => {
          localStorage.setItem('vacancies', JSON.stringify(json));
          dispatch({type: 'SET_VACANCIES', payload: json});
        })
        .catch(err => console.error(err.message));
    }
  };
}

export function getVacancyByd(id) {
  return dispatch => {
    if (localStorage.getItem('vacancies')) {
      let storage = JSON.parse(localStorage.getItem('vacancies'));
      dispatch({type: 'SET_VACANCIES', payload: storage.filter(vacancy => vacancy.id == id)});
    } else {
      fetch('https://arainay.github.io/vacancies/api/vacancies.json')
        .then(
          response => {
            if (response.status === 200)
              return response.json();
            throw new Error(response.status);
          }
        )
        .then(vacancies => {
          let json = vacancies.filter(vacancy => vacancy.id == id);
          dispatch({type: 'SET_VACANCY', payload: json});
        })
        .catch(err => console.error(err.message));
    }
  };
}

export function setEmptyVacancies() {
  return { type: 'SET_EMPTY_VACANCIES' };
}

export function addVacancy(title, assignees, description) {
  return dispatch => {
    let storage = JSON.parse(localStorage.getItem('vacancies'));
    storage.push({
      id: storage.length + 1,
      title: title,
      assignees: assignees,
      description: description
    });
    localStorage.setItem('vacancies', JSON.stringify(storage));
    dispatch({ type: 'SET_VACANCIES', payload: storage });
  }
}

export function editVacancy(id, title, assignees, description) {
  return dispatch => {
    let storage = JSON.parse(localStorage.getItem('vacancies'));
    storage.forEach(item => {
      if (item.id === id) {
        item.title = title;
        item.assignees = assignees;
        item.description = description;
      }
    });
    localStorage.setItem('vacancies', JSON.stringify(storage));
    dispatch({ type: 'SET_VACANCIES', payload: storage });
  }
}

export function getUsers() {
  return dispatch => {
    fetch('https://arainay.github.io/vacancies/api/users.json')
      .then(
        response => {
          if (response.status === 200)
            return response.json();
          throw new Error(response.status);
        }
      )
      .then(json => { dispatch( { type: 'SET_USERS', payload: json } ); })
      .catch(err => console.error(err.message));
  };
}

export function getUsersByIds(ids) {
  return dispatch => {
    fetch('https://arainay.github.io/vacancies/api/users.json')
      .then(
        response => {
          if (response.status === 200)
            return response.json();
          throw new Error(response.status);
        }
      )
      .then(users => {
        let json = users.filter(user => ids.includes(user.id));
        dispatch( { type: 'SET_USERS_BY_VACANCY', payload: json } );
      })
      .catch(err => console.error(err.message));
  };
}