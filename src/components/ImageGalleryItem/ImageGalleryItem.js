import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handlePhotoClick = event => {
    const newPhotoIndex = this.props.photosList.findIndex(
      item => item.webformatURL === event.currentTarget.src
    );
    this.props.photoIndexUpdate(newPhotoIndex);
    this.props.showModalsUpdate();
  };
  render() {
    const { item } = this.props;
    return (
      <img
        src={item.webformatURL}
        alt={item.tag}
        width="300"
        className={css.imageItem}
        onClick={this.handlePhotoClick}
      />
    );
  }
}
ImageGalleryItem.propTypes = {
  photoIndex: PropTypes.number.isRequired,
  photosList: PropTypes.array.isRequired,
  photoIndexUpdate: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string,
  }),
};

// item = { item }
//                   photoIndex={this.props.photoIndex}
//                   photosList={this.props.photosList}
//                   photoIndexUpdate={this.props.photoIndexUpdate}
//                   showModalsUpdate={this.props.showModalsUpdate}

//  contacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string,
//       number: PropTypes.string,
//       id: PropTypes.string,
//     })
//   ),
