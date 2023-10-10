import React, { ReactElement } from 'react';
import styles from './FormRowSelect.module.scss';
import { IFormSelectProps } from '@/interfaces/IComponents';

const FormRowSelect = ({ labelText, name, value, list, onChange }: IFormSelectProps): ReactElement => {
  return (
    <div className={`${styles.select} form-row`}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} value={value} id={name} onChange={onChange} className="form-select">
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
