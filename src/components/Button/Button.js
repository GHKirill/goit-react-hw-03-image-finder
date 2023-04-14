import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import css from './Button.module.css';

export default class Button extends Component {
  handlingButtonMore = event => {
    this.props.addPage(this.props.page + 1);
  };
  render() {
    const { wrongQuery, allPhotosNumber, currentPhotosNumber } = this.props;
    return (
      <div className={css.buttonWrapper}>
        {this.props.loading ? (
          <Circles
            className={css.spinner}
            height="40"
            width="40"
            color="#9f51e7"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <div style={{ width: 40 }}></div>
        )}
        {wrongQuery ||
        allPhotosNumber - currentPhotosNumber.length < 12 ||
        currentPhotosNumber.length < 12 ? (
          <></>
        ) : (
          <button
            type="button"
            onClick={this.handlingButtonMore}
            className={css.button}
          >
            load next
          </button>
        )}
      </div>
    );
  }
}
Button.propTypes = {
  addPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  wrongQuery: PropTypes.bool.isRequired,
  allPhotosNumber: PropTypes.number.isRequired,
  currentPhotosNumber: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
// addPage={page => this.handlingButtonIncreasePage(page)}
// page={page}
// wrongQuery={wrongQuery}
// allPhotosNumber={allPhotosNumber}
// currentPhotosNumber={photosList}
// loading={loading}
