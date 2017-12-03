import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Vacancies from './Vacancies';
import Vacancy from './Vacancy';
import VacancyForm from './VacancyForm';

import '../assets/styles.less';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route path="/vacancies/:id/:action" component={VacancyForm}/>
          <Route path="/vacancies/create" component={VacancyForm}/>
          <Route path="/vacancies/:id" component={Vacancy}/>
          <Route path="/vacancies" component={Vacancies} />
          <Redirect from='/' to='/vacancies'/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);