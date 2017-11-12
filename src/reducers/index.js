import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import vacancies from './vacancies';
import users from './users';

export default combineReducers({
  vacancies,
  users,
  routerReducer
});