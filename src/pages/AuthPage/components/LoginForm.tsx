import React, { ReactElement, ChangeEvent, FormEvent } from 'react';
import Logo from '@/components/Logo/Logo';
import styles from '../AuthPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import { IAuthFormProps } from '@/interfaces/componentIterfaces';

const LoginForm = ({ inputValues, setInputValues, setIsMember }: IAuthFormProps): ReactElement => {
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
      <h3 className={styles.formHeading}>Login</h3>
      <FormRow type="text" name="email" value={inputValues.email} handleInputChange={handleInputChange} />
      <FormRow type="password" name="password" value={inputValues.password} handleInputChange={handleInputChange} />
      <button type="submit" className={`btn btn-block ${styles.btn}`}>
        submit
      </button>
      <div className={styles.redirectBtnContainer}>
        {'Not a member yet?'}{' '}
        <button className={styles.memberBtn} type="button" onClick={(): void => setIsMember(false)}>
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
