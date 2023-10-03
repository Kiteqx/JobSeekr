import React, { ReactElement, ChangeEvent, FormEvent, useState, Dispatch, SetStateAction } from 'react';
import Logo from '@/components/Logo/Logo';
import styles from '../AuthPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import NotificationMessages from '@/enums/notificationMessage';
import { showNotification } from '@/utils/helpers/antd/antdConfig';
import { registerUser } from '@/store/actions/userActions';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { handleInputChange } from '../AuthPage';
import { checkIsAllInputValid } from '@/utils/helpers/validationSchemes/authSchema';
import { IAuthFormProps } from '@/interfaces/IComponents';

const RegisterForm = ({ inputValues, setInputValues, setIsMember }: IAuthFormProps): ReactElement => {
  const { name, email, password } = inputValues;
  const [validateMessages, setValidateMessages]: [
    Record<string, string>,
    Dispatch<SetStateAction<Record<string, string>>>,
  ] = useState({});

  const isLoading = useAppSelector((store) => store.user.isLoading);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const isAllInputValid = checkIsAllInputValid(inputValues, setValidateMessages);
    if (!name || !email || !password) {
      showNotification(NotificationMessages.EMPTY_AUTH_FIELDS);
    } else if (!isAllInputValid) {
      showNotification(NotificationMessages.CHECK_AUTH_FIELDS_VALUE);
    } else {
      dispatch(registerUser(inputValues));
    }
  };

  return (
    <form className={styles.form} onSubmit={(event): void => handleSubmit(event)}>
      <Logo className={styles.formLogo} />
      <h3 className={styles.formHeading}>Register</h3>
      <FormRow
        type="text"
        name="name"
        value={name || ''}
        placeholder="Enter your name*"
        autoFocus={true}
        validateMessage={validateMessages.name}
        handleInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <FormRow
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email*"
        validateMessage={validateMessages.email}
        handleInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <FormRow
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password*"
        validateMessage={validateMessages.password}
        handleInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <button
        className={`btn btn-block ${styles.btn}`}
        type="submit"
        disabled={
          isLoading ||
          Object.entries(inputValues).some(([, inputValue]) => !inputValue) ||
          Object.entries(validateMessages).some(([, errorMessage]) => !!errorMessage)
        }
      >
        submit
      </button>
      <div className={styles.redirectBtnContainer}>
        {'Already a member?'}
        <button className={styles.memberBtn} type="button" onClick={(): void => setIsMember(true)}>
          Login
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
