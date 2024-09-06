import css from "./ImageCard.module.css";

const ImageCard = ({ description, urls: { small, regular }, onOpenModal }) => {
  return (
    <div
      onClick={() => onOpenModal({ description, regular })}
      className={css.image}
    >
      <img src={small} alt={description} className={css.imgCard} />
    </div>
  );
};

export default ImageCard;
