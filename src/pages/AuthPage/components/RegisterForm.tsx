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

    if (Object.values(inputValues).some((value) => !value)) {
      showNotification(NotificationMessages.EMPTY_FIELDS);
    } else if (!checkIsAllInputValid(inputValues, setValidateMessages)) {
      showNotification(NotificationMessages.CHECK_FIELDS_VALUE);
    } else {
      dispatch(registerUser(inputValues));
    }
  };

  return (
    <form className={`form ${styles.form}`} onSubmit={(event): void => handleSubmit(event)}>
      <Logo className={styles.formLogo} />
      <h4 className={styles.formHeading}>Register</h4>
      <FormRow
        type="text"
        name="name"
        value={name || ''}
        placeholder="Enter your name*"
        autoFocus={true}
        validateMessage={validateMessages.name}
        onInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <FormRow
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email*"
        validateMessage={validateMessages.email}
        onInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <FormRow
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password*"
        validateMessage={validateMessages.password}
        onInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputValues, setInputValues, setValidateMessages)
        }
      />
      <button
        className={`btn btn-block ${styles.btn}`}
        type="submit"
        disabled={
          isLoading ||
          Object.values(inputValues).some(([, inputValue]) => !inputValue) ||
          Object.values(validateMessages).some(([, errorMessage]) => !!errorMessage)
        }
      >
        {isLoading ? 'Please wait...' : 'submit'}
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
