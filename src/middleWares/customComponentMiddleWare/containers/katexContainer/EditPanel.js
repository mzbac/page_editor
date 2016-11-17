import React, { PropTypes } from 'react';

import styles from './EditPanel.css';

export const EditPanel = (props) => {
  const {
    invalidTeX,
    onChange,
    onSave,
    onCancel,
    texValue,
    errorMsg,
  } = props;
  let saveBtn = styles.saveButton;
  if (invalidTeX) {
    saveBtn += ` .${styles.invalidButton}`;
  }

  return (
    <div className={styles.editpanel} >
      <textarea
        className={styles.editpanelTextValie}
        onChange={onChange}
        value={texValue}
      />
      {invalidTeX ? <div><span style={{ color: 'red' }} >{errorMsg}</span></div> : null}
      <div className={styles.btns} >
        <button
          disabled={invalidTeX}
          onClick={onSave}
          className={saveBtn}
        >
          {invalidTeX ? 'Invalid TeX' : 'Done'}
        </button>
        <button className={styles.cancelButton} onClick={onCancel} >
          Cancel
        </button>
      </div>
    </div>
  );
};

EditPanel.propTypes = {
  invalidTeX: PropTypes.bool,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  texValue: PropTypes.string,
  errorMsg: PropTypes.string,
};
export default EditPanel;