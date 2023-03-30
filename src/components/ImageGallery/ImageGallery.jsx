import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchApi } from 'Service/API';
import { GalleryList, ErrorMessage, ListItem } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ value }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState(0);

  useEffect(() => {
    if (!value) {
      return;
    }

    const fetchImages = async (query, currentPage) => {
      try {
        setLoading(true);
        const resp = await fetchApi(query, currentPage);

        if (!resp || resp.hits.length === 0) {
          setError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prevState =>
          page === 1 ? [...resp.hits] : [...prevState, ...resp.hits]
        );
        setError(null);
        setHits(resp.totalHits);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchImages(value.trim(), page);
  }, [value, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [value]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const PER_PAGE = 12;

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <GalleryList>
        {images.length > 0 &&
          images.map(image => (
            <ListItem key={image.id}>
              <GalleryItem image={image} />
            </ListItem>
          ))}
      </GalleryList>

      {PER_PAGE < hits && <LoadMore handleClick={loadMore} />}
      {loading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
