const initialState = [];

export default function vacancies(state = initialState, action) {
  switch (action.type) {
    case 'GET_VACANCIES':
      return action.payload;

    case 'GET_VACANCY':
      return action.payload;

    case 'SET_EMPTY_VACANCIES':
      return [];

    default:
      return state;
  }
}