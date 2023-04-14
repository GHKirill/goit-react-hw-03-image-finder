import React, { Component } from 'react';
import axios, { all } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

const KEY = '33881811-455663e333f2bc5dbb769e41c';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {
  state = {
    queryWord: '',
    page: 1,
    photosList: [],
    loading: false,
    showModals: false,
    photoIndex: 0,
    wrongQuery: false,
    allPhotosNumber: 0,
  };
  handleFormSubmit = input => {
    this.setState({ queryWord: input.trim() });
    this.setState({ photosList: [] });
    this.setState({ wrongQuery: false });
  };
  handleInputUpdate = queryWord => {
    this.setState({ queryWord });
    this.setState({ wrongQuery: true });
  };
  setButtonSearchEnabled = () => {
    this.setState({ wrongQuery: false });
  };
  handlingLoading = loading => {
    this.setState({ loading });
  };
  handlingButtonIncreasePage = page => {
    this.setState({ page });
  };
  handlingPhotosListUpdate = newList => {
    this.setState({ photosList: [...this.state.photosList, ...newList] });
  };
  handlingPhotoIndexUpdate = photoIndex => {
    this.setState({ photoIndex });
  };
  getAllPhotosNumber = number => {
    this.setState({ allPhotosNumber: number });
  };
  // };
  resetLadingStatus = status => {
    this.setState({ loading: status });
  };
  handleShowModals = () => {
    this.setState({ showModals: true });
  };
  toggleModal = () => {
    this.setState({ showModals: !this.state.showModals });
  };
  render() {
    const {
      queryWord,
      page,
      loading,
      photosList,
      photoIndex,
      showModals,
      wrongQuery,
      allPhotosNumber,
    } = this.state;
    return (
      <>
        <div>
          {this.state.showModals && (
            <Modal closeModalWindow={this.toggleModal}>
              <img
                src={photosList[photoIndex].largeImageURL}
                alt={photosList[photoIndex].tag}
                className={css.image}
              />
            </Modal>
          )}
        </div>
        <SearchBar
          input={queryWord}
          wrongQuery={wrongQuery}
          onSubmit={input => this.handleFormSubmit(input)}
          setButtonEnabled={() => this.setButtonSearchEnabled()}
          photosList={photosList}
        />
        <ImageGallery
          input={queryWord}
          page={page}
          photoIndex={photoIndex}
          photosList={photosList}
          allPhotosNumber={allPhotosNumber}
          getAllPhotosNumber={number => this.getAllPhotosNumber(number)}
          inputUpdate={input => this.handleInputUpdate(input)}
          photosListUpdate={newList => this.handlingPhotosListUpdate(newList)}
          photoIndexUpdate={newIndex => this.handlingPhotoIndexUpdate(newIndex)}
          showModalsUpdate={() => this.handleShowModals()}
          changeLoadingStatus={status => this.resetLadingStatus(status)}
        />
        <Button
          addPage={page => this.handlingButtonIncreasePage(page)}
          page={page}
          wrongQuery={wrongQuery}
          allPhotosNumber={allPhotosNumber}
          currentPhotosNumber={photosList}
          loading={loading}
          // changeLoadingStatus={status => this.resetLadingStatus(status)}
        />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
