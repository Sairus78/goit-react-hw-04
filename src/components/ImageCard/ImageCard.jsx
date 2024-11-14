import css from './ImageCard.module.css';

const ImageCard = ({ img, alt }) => {
  return (
    <div>
      <img className={css.galleryImg} src={img} alt={alt} />
    </div>
  );
};

export default ImageCard;
