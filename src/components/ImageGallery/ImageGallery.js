import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
const KEY = '33881811-455663e333f2bc5dbb769e41c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ImageGallery extends Component {
  state = {
    currentGallery: [],
    loading: false,
  };
  async componentDidUpdate(prevProps) {
    try {
      if (
        (prevProps.input !== this.props.input ||
          prevProps.page !== this.props.page) &&
        this.props.input
      ) {
        if (prevProps.input !== this.props.input) {
          this.setState({ currentGallery: [] });
          this.props.photosListUpdate([]);
        }

        let { input, page } = this.props;
        this.props.changeLoadingStatus(true);
        const response = await axios(
          `?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) {
          throw new Error(
            `No images in dataBase according to your query "${this.props.input}"`
          );
        }
        const gallery = response.data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        this.setState({ currentGallery: gallery });
        this.props.photosListUpdate(gallery);
        this.props.getAllPhotosNumber(response.data.totalHits);
        this.props.changeLoadingStatus(false);
        if (
          this.props.allPhotosNumber &&
          this.props.allPhotosNumber - this.props.photosList.length <= 12
        ) {
          toast.info('No more photos in this collection');
        }
      }
    } catch (error) {
      toast.error(error.message);
      this.setState({ currentGallery: [] });
      this.props.photosListUpdate([]);
      this.props.inputUpdate('');
      this.props.changeLoadingStatus(false);
    }
  }

  render() {
    return (
      <>
        {this.props.photosList.length > 0 && (
          <ul className={css.imageGallery}>
            {this.props.photosList.map(item => (
              <li key={item.id} className={css.imageItem}>
                <ImageGalleryItem
                  item={item}
                  photoIndex={this.props.photoIndex}
                  photosList={this.props.photosList}
                  photoIndexUpdate={this.props.photoIndexUpdate}
                  showModalsUpdate={this.props.showModalsUpdate}
                />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  photoIndex: PropTypes.number.isRequired,
  photosList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  allPhotosNumber: PropTypes.number.isRequired,
  getAllPhotosNumber: PropTypes.func.isRequired,
  inputUpdate: PropTypes.func.isRequired,
  photosListUpdate: PropTypes.func.isRequired,
  photoIndexUpdate: PropTypes.func.isRequired,
  showModalsUpdate: PropTypes.func.isRequired,
  changeLoadingStatus: PropTypes.func.isRequired,
};
