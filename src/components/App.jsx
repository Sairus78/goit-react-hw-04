import Modal from 'react-modal';

import { useEffect, useState, useRef } from 'react';
import SearchBar from './SearchBar/SearchBar';

import { search } from './pixabay-api';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('query');
    return savedQuery ? JSON.parse(savedQuery) : '';
  });
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState([]);

  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // start query and reset settings
  const takeQuery = formQuery => {
    setQuery(formQuery);
    setPage(1);
    setResponse([]);
    setError(null);
  };

  //search and show more
  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const response = await search(query, page);
        setResponse(prevResponse =>
          page === 1
            ? response.data.results
            : [...prevResponse, ...response.data.results]
        );
        if (page !== 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }
        const totalPages = Math.ceil(response.data.total_pages / 12);
        setHasMoreResults(page < totalPages);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
        localStorage.setItem('query', JSON.stringify(query));
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const currentImgRef = useRef('');
  const currentAltRef = useRef('');

  const takeImg = (currentImg, alt) => {
    currentImgRef.current = currentImg;
    currentAltRef.current = alt;
    setIsOpen(true);
  };

  //closeModal
  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <>
      <SearchBar takeQuery={takeQuery} />

      {response.length > 0 && !error ? (
        <ImageGallery arrResult={response} takeImg={takeImg}/>
      ) : (
        <ErrorMessage message={error} />
      )}
      {loading && <Loader />}
      {hasMoreResults && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        currentImg={currentImgRef.current}
        currentAlt={currentAltRef.current}
      />
    </>
  );
}

export default App;
