import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div className={css.loadMoreBlock}>
      <button className={css.loadMoreBtn}
        onClick={() => {
          onLoadMore();
        }
        }>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;