import React, { PropTypes } from 'react';
import styles from './JumbotronComponent.css';
const JumbotronComponent = props => {
  const { title, content } = props;

  return (
    <div className="jumbotron" >
      <h1 className={styles.title} >{title}</h1>
      <p className={styles.content} >{content}</p>
    </div>
  );
};

JumbotronComponent.propTypes = {};
export default JumbotronComponent;
