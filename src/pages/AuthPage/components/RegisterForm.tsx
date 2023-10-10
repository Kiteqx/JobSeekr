import React, { ReactElement, ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import Logo from '@/components/Logo/Logo';
import styles from '../AuthPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import validateSchema from '@/utils/helpers/form/authSchema';

import { IAuthFormProps } from '@/interfaces/IComponents';
import { registerUser } from '@/store/actions/userActions';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { handleInputChange, handleSubmit } from '@/utils/helpers/form/formHelpers';

const RegisterForm = ({ inputsValues, setInputsValues, setIsMember }: IAuthFormProps): ReactElement => {
  const { name, email, password } = inputsValues;
  const [validateMessages, setValidateMessages]: [
    Record<string, string>,
    Dispatch<SetStateAction<Record<string, string>>>,
  ] = useState({});

  const isLoading = useAppSelector((store) => store.user.isLoading);
  const dispatch = useAppDispatch();

  return (
    <form
      className={`form ${styles.form}`}
      onSubmit={(event): void =>
        handleSubmit(event, inputsValues, validateSchema, registerUser, dispatch, setValidateMessages)
      }
    >
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
          handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
        }
      />
      <FormRow
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email*"
        validateMessage={validateMessages.email}
        onInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
        }
      />
      <FormRow
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password*"
        validateMessage={validateMessages.password}
        onInputChange={(event: ChangeEvent): void =>
          handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
        }
      />
      <button
        className={`btn btn-block ${styles.btn}`}
        type="submit"
        disabled={
          isLoading ||
          Object.values(inputsValues).some(([, inputValue]) => !inputValue) ||
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
