import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../actions/';

class Vacancy extends PureComponent {
  componentDidMount() {
    if (this.props.match.params.id > 0) {
      this.props.actions.getVacancyByd(this.props.match.params.id);
      this.props.actions.getUsers();
    }
  }

  render() {
    return (
      <div className="vacancy-info">
        <p>
          <strong>Название:</strong> {this.props.vacancies.length > 0 ? this.props.vacancies[0].title : ''}
        </p>
        <p>
          <strong>Ответственные:</strong>
          {
            this.props.vacancies.length > 0
              ? this.props.users
                .filter(
                  user => { return this.props.vacancies[0].assignees.includes(user.id); }
                )
                .map(
                  (item, i) => { return <span key={i}>{item.name}</span> }
                )
              : ''}
        </p>
        <p>
          <strong>Описание:</strong>
          {this.props.vacancies.length > 0 ? this.props.vacancies[0].description : ''}
        </p>
        <p>
          <Link to='/vacancies'>Все вакансии</Link>&nbsp;
          <Link to={`/vacancies/${this.props.match.params.id}/edit`}>Редактировать</Link>
        </p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vacancy));