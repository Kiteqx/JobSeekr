import React, { ReactElement } from 'react';
import { IFormRowProps } from '@/interfaces/componentIterfaces';
import styles from './FormRow.module.scss';

const FormRow = ({ type, name, value, labelText, handleInputChange }: IFormRowProps): ReactElement => {
  return (
    <div className={styles.FormRow}>
      <label htmlFor={name} className={styles.formLabel}>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className={styles.formInput}
        onChange={(event): void => handleInputChange(event)}
      />
    </div>
  );
};

export default FormRow;
