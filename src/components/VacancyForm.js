import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../actions/';

class VacancyForm extends PureComponent {
  constructor(props) {
    super(props);
    if (Object.keys(this.props.match.params).length > 0) {
      this.props.actions.getVacancyByd(this.props.match.params.id);
    } else {
      this.props.actions.setEmptyVacancies();
      this.search = this.props.location.search.split('=')[1];
    }
    this.props.actions.getUsers();
    this.selected = [];
  }

  componentWillUpdate(nextProps, nextState) {
    this.vacancies = nextProps.vacancies;
  }

  componentDidUpdate() {
    if (this.search) {
      Array.from(this.assignees.options)
        .forEach(option => {
          if (option.value === this.search) {
            option.selected = true;
          }
        });
    }
    if (this.vacancies !== undefined && this.vacancies.length > 0) {
      this.title.value = this.vacancies[0].title;
      Array.from(this.assignees.options)
        .forEach(option => {
          if (this.vacancies[0].assignees.includes(+option.value)) {
            option.selected = true;
          }
        });
      this.desc.value = this.vacancies[0].description;
    }
  }

  formSubmitHandler(e) {
    e.preventDefault();
    let selected = [];
    Array.from(this.assignees.options).forEach(option => { (option.selected) && (selected.push(+option.value)) });
    if (this.props.match.params.action === 'edit') {
      this.props.actions.editVacancy(this.vacancies[0].id, this.title.value, selected, this.desc.value);
      this.props.history.push(`/vacancies/${this.props.match.params.id}`);
    } else {
      this.props.actions.addVacancy(this.title.value, selected, this.desc.value);
      this.props.history.push('/vacancies');
    }
  }

  render() {
    return (
      <form action="" onSubmit={::this.formSubmitHandler}>
        <div className="form-line">
          <label htmlFor="title">Название:</label>
          <input
            type="text"
            id="title"
            defaultValue={this.vacancies !== undefined && this.vacancies.length > 0 ? this.vacancies[0].title : ''}
            ref={title => this.title = title}
            required />
        </div>
        <div className="form-line">
          <label htmlFor="assignees">Ответственные:</label>
          <select
            id="assignees"
            defaultValue={
              this.vacancies !== undefined && this.vacancies.length > 0
                ? this.props.users
                  .filter(
                    user => { return this.vacancies[0].assignees.includes(user.id); }
                  )
                  .map(
                    (item, i) => { return <option key={i}>{item.name}</option> }
                  )
                : []}
            ref={assignees => this.assignees = assignees}
            required
            multiple
            size="5">
            <option value="0"></option>
            {this.props.users.length > 0
              ? this.props.users.map(user => { return <option value={user.id} key={user.id}>{user.name}</option> } )
              : ''}
          </select>
        </div>
        <div className="form-line">
          <label htmlFor="desc">Описание:</label>
          <textarea
            id="desc"
            defaultValue={this.vacancies !== undefined && this.vacancies.length > 0 ? this.vacancies[0].title : ''}
            ref={desc => this.desc = desc}
            required>
          </textarea>
        </div>
        <div className="form-submit">
          <Link to='/vacancies'>Все вакансии</Link>
          <button className="submit" type="subtit">Сохранить</button>
        </div>
      </form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VacancyForm));