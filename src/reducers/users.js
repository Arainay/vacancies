const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
    case 'SET_USERS_BY_VACANCY':
      return action.payload;

    default:
      return state;
  }
}