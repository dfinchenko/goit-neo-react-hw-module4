import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const validateSearchData = (event) => {
    event.preventDefault();

    const searchData = event.target.elements.searchData.value.trim();

    if (!searchData) {
      toast.error("Enter correct search query!");
    } else {
      onSubmit(searchData);
    }

    event.target.reset();
  };

  return (
    <header>
      <form className={css.searchBar} onSubmit={validateSearchData}>
        <input
          type="text"
          autoComplete="off"
          name="searchData"
          autoFocus
          placeholder="Search images and photos"
          aria-label="Search images and photos"
        />
      </form>
      <Toaster position="top-right" />
    </header>
  );
};

export default SearchBar;
