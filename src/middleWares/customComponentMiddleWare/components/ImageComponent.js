import React, { PropTypes } from 'react';
import style from './ImageComponent.css';

export const ImageComponent = (props) => {
  const { imageUrl, linkUrl, alt, citation } = props;
  return (
    <div className={style.container} >
      <div className={style.videoImg} >
        <img
          className={style.img}
          src={imageUrl}
          alt={alt || imageUrl}
        />
      </div>
    </div>
  );
};

ImageComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
};
export default ImageComponent;