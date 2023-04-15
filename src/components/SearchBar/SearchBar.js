import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

export default class SearchBar extends Component {
  state = {
    input: '',
  };

  handleFormInput = event => {
    const { value } = event.currentTarget;
    this.setState({ input: value.toLowerCase() });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.input.trim() === '') {
      toast.error('please input correct word');
      return;
    }
    if (this.state.input.trim() === this.props.input) {
      toast.error(
        'please input another search word or press button "load next"'
      );
      return;
    }
    this.props.onSubmit(this.state.input);
  };
  handleFormInputClick = event => {
    this.setState({ input: '' });
    this.props.setButtonEnabled();
  };

  render() {
    const { input } = this.state;
    return (
      <div className={css.form}>
        <form onSubmit={this.handleFormSubmit} className={css.formSearchBar}>
          {this.props.wrongQuery ||
          (this.props.allPhotosNumber &&
            this.props.allPhotosNumber === this.props.photosList.length) ? (
            <button type="submit" disabled={true} className={css.formButton}>
              <FaSearch />
            </button>
          ) : (
            <button type="submit" className={css.formButton}>
              <FaSearch />
            </button>
          )}
          <input
            type="text"
            name="input"
            value={input}
            onChange={this.handleFormInput}
            onClick={this.handleFormInputClick}
            className={css.inputForm}
          ></input>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  input: PropTypes.string.isRequired,
  wrongQuery: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setButtonEnabled: PropTypes.func.isRequired,
};
