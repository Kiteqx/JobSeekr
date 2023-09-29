import React, { ReactElement, ChangeEvent, FormEvent } from 'react';
import Logo from '@/components/Logo/Logo';
import styles from '../AuthPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import { IAuthFormProps } from '@/interfaces/componentIterfaces';

const RegisterForm = ({ inputValues, setInputValues, setIsMember }: IAuthFormProps): ReactElement => {
  const handleInputChange = (event: ChangeEvent): void => {
    const input = event.target as HTMLInputElement;
    const changedField = input.name;
    setInputValues({ ...inputValues, [changedField]: input.value });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={(event): void => handleSubmit(event)}>
      <Logo className={styles.formLogo} />
      <h3 className={styles.formHeading}>Register</h3>
      <FormRow type="text" name="name" value={inputValues.name} handleInputChange={handleInputChange} />
      <FormRow type="email" name="email" value={inputValues.email} handleInputChange={handleInputChange} />
      <FormRow type="password" name="password" value={inputValues.password} handleInputChange={handleInputChange} />
      <button type="submit" className={`btn btn-block ${styles.btn}`}>
        submit
      </button>
      <div className={styles.redirectBtnContainer}>
        {'Already a member?'}{' '}
        <button className={styles.memberBtn} type="button" onClick={(): void => setIsMember(true)}>
          Login
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
