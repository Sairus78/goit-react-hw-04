import css from './SearchBar.module.css';

import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ takeQuery }) => {
  const handlerSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim().toLowerCase();
    if (query) {
      takeQuery(query);
    } else {
      toast.error('Input field is empty, enter your query');
      return;
    }
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handlerSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;
