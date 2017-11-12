import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../actions/';

import Filter from './Filter';
import Table from './Table';

class Vacancies extends PureComponent {
  constructor(props) {
    super(props);
    this.props.actions.getVacancies();
    this.props.actions.getUsers();
  }

  redirect(e) {
    if (e.target.value > 0) {
      this.props.history.push('/vacancies/?assignee=' + e.target.value);
    } else {
      this.props.history.push('/vacancies');
    }
  }

  render() {
    this.search = this.props.location.search.replace('?', '').split('=');
    return (
      <div className="vacancies-wrapper">
        <Filter
          users={this.props.users}
          redirect={::this.redirect}
          search={this.search !== undefined && this.search[0] === 'assignee' ? this.search[1] : ''} />
        <Table
          vacancies={this.props.vacancies}
          users={this.props.users}
          search={this.search !== undefined && this.search[0] === 'assignee' ? this.search[1] : ''} />
        <div className="vacancies-control">
          <Link to='/vacancies/create'>Добавить вакансию</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacancies: state.vacancies,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vacancies));