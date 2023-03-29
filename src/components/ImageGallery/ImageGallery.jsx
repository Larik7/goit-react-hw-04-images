import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchApi } from 'Service/API';
import { GalleryList, ErrorMessage, ListItem } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    error: null,
    loading: false,
    hits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ images: [], page: 1 });
      this.fetchImages();
    }

    if (prevState.page < this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ loading: true });
      const resp = await fetchApi(this.props.value.trim(), this.state.page);

      if (!resp || resp.hits.length === 0) {
        this.setState({
          error:
            'Sorry, there are no images matching your search query. Please try again.',
        });
        return;
      }

      this.setState({
        images: [...this.state.images, ...resp.hits],
        error: null,
      });
      this.setState({ hits: resp.totalHits });
    } catch (err) {
      this.setState({ error: String(err) });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const PER_PAGE = 12;
    const { images, error, hits, loading } = this.state;

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

        {PER_PAGE < hits && <LoadMore handleClick={this.loadMore} />}
        {loading && <Loader />}
      </>
    );
  }
}
