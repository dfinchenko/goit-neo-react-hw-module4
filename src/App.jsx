import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchSearch } from "./api";

const useApi = () => {
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchData = async (callback) => {
    setLoader(true);
    setErrorMessage(false);

    try {
      await callback();
    } catch (error) {
      setErrorMessage(true);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return { loader, errorMessage, fetchData };
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState({});
  const { loader, errorMessage, fetchData } = useApi();

  const loaderHandler = () =>
    fetchData(async () => {
      const nextPage = page + 1;
      const newCards = await fetchSearch({ searchData, page: nextPage });
      if (newCards.length > 0) {
        setCards((prevCards) => [...prevCards, ...newCards]);
        setPage(nextPage);
      }
    });

  const searchHandler = (searchData) =>
    fetchData(async () => {
      setCards([]);
      setPage(1);
      const fetchedCards = await fetchSearch({ searchData });
      setCards(fetchedCards);
      setSearchData(searchData);
    });

  const onOpenModal = (data) => {
    setIsOpen(true);
    setParams(data);
  };

  const renderGallery = () =>
    !!cards.length && <ImageGallery onOpenModal={onOpenModal} cards={cards} />;

  const renderLoadMoreBtn = () =>
    cards.length > 0 &&
    !loader &&
    !errorMessage && <LoadMoreBtn onLoadMore={loaderHandler} />;

  return (
    <>
      <SearchBar onSubmit={searchHandler} />
      {renderGallery()}
      {loader && <Loader />}
      {errorMessage && <ErrorMessage />}
      {renderLoadMoreBtn()}
      <ImageModal
        {...params}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default App;
