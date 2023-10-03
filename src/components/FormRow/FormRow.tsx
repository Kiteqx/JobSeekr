import React, { ReactElement } from 'react';
import { IFormRowProps } from '@/interfaces/IComponents';
import styles from './FormRow.module.scss';

const FormRow = ({
  type,
  name,
  value,
  labelText,
  placeholder,
  validateMessage,
  autoFocus,
  handleInputChange,
}: IFormRowProps): ReactElement => {
  return (
    <div className={styles.FormRow}>
      <label htmlFor={name} className={styles.formLabel}>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.formInput}
        autoFocus={autoFocus || false}
        onChange={(event): void => handleInputChange(event)}
      />
      <p className={styles.formValidateMessage}>{validateMessage}</p>
    </div>
  );
};

export default FormRow;
