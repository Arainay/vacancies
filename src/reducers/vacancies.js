const initialState = [];

export default function vacancies(state = initialState, action) {
  switch (action.type) {
    case 'SET_VACANCIES':
      return action.payload;

    case 'SET_VACANCY':
      return action.payload;

    case 'SET_EMPTY_VACANCIES':
      return [];

    default:
      return state;
  }
}