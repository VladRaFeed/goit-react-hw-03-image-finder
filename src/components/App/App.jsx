import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import fetchData from 'servises/imagesApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'components/Loader/Loader';
import css from './App.module.css';

export default class App extends Component {
  state = {
    request: 'cat',
    images: [],
    largeImage: null,
    page: 1,
    loading: false,
    modal: false,
  };

  componentDidMount() {
    const { request, page } = this.state;
    this.fetchImg(request, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.fetchImg(request, page);
    }
  }

  handleFormSubmit = request => {
    this.setState({ images: [], request, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImg = async (request, page) => {
    if (!request) {
      return;
    }
    try {
      this.setState({ loading: true });
      const { hits } = await fetchData(request, page);

      if (hits.length === 0) {
        return alert('Sorry, images not found...');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.log('Error ;(', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  onOpenModal = url => {
    this.setState(({ modal }) => ({ modal: !modal, largeImage: url }));
    window.addEventListener('keydown', this.handleKeyDown);
  };

  onModalClose = () => {
    this.setState(({ modal }) => ({ modal: !modal, largeImage: null }));
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onModalClose();
    }
  };

  handleBackdropCLick = e => {
    if (e.currentTarget === e.target) {
      this.onModalClose();
    }
  };

  render() {
    const { loading, images, modal, largeImage } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        <ImageGallery images={images} modalOpen={this.onOpenModal} />
        {images.length > 0 ? (
          <Button onLoadMore={this.onLoadMore} />
        ) : (
          <h2>please, type your request</h2>
        )}
        {modal && (
          <Modal
            onCLick={this.handleBackdropCLick}
            largeImageUrl={largeImage}
          />
        )}
      </div>
    );
  }
}
