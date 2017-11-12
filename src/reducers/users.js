const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS':
    case 'GET_USERS_BY_VACANCY':
      return action.payload;

    default:
      return state;
  }
}