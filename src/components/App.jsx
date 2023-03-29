import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageSearch: '',
  };

  handleFormSubmit = imageSearch => {
    this.setState({ imageSearch });
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery value={this.state.imageSearch} />
      </div>
    );
  }
}
