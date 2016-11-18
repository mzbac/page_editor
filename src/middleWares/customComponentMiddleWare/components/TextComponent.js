import React, { PropTypes } from 'react';
import styles from './TextComponent.css';

export const TextComponent = (props) => {
  const { textContent } = props;
  return (
    <div className={styles.textContainer} >
      <p
        className={styles.text}
        style={{
          fontSize: 16,
          color: '#989898',
          lineHeight: '22px',
        }}
      >
        {textContent}
      </p>
    </div>
  );
};

TextComponent.propTypes = {
  textContent: PropTypes.string.isRequired,
};
export default TextComponent;