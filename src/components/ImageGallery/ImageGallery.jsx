import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ arrResult, takeImg }) => {
  return (
    <ul className={css.galleryList}>
      {arrResult.map(({ id, urls, alt_description }) => (
        <li
          className={css.galleryListItem}
          key={id}
          onClick={() => takeImg(urls.regular, alt_description)}
        >
          <ImageCard img={urls.small} alt={alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
