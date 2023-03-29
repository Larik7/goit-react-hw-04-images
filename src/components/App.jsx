import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [imageSearch, setImageSearch] = useState('');

  const handleFormSubmit = imageSearch => {
    setImageSearch(imageSearch);
  };

  return (
    <div>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery value={imageSearch} />
    </div>
  );
};
