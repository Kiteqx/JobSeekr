import React, { ReactElement, ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import Logo from '@/components/Logo/Logo';
import styles from '../AuthPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import { handleInputChange, handleSubmit } from '@/utils/helpers/form/formHelpers';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import validateSchema from '@/utils/helpers/form/authSchema';
import { IAuthFormProps } from '@/interfaces/IComponents';
import { loginUser } from '@/store/actions/userActions';

const LoginForm = ({ inputsValues, setInputsValues, setIsMember }: IAuthFormProps): ReactElement => {
  const { email, password } = inputsValues;
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
        handleSubmit(event, inputsValues, validateSchema, loginUser, dispatch, setValidateMessages)
      }
    >
      <Logo className={styles.formLogo} />
      <h4 className={styles.formHeading}>Login</h4>
      <FormRow
        type="text"
        name="email"
        value={email}
        placeholder="Enter your email*"
        autoFocus={true}
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
          Object.values(inputsValues).some(([inputValue]) => !inputValue) ||
          Object.values(validateMessages).some(([errorMessage]) => !!errorMessage)
        }
      >
        {isLoading ? 'Please wait...' : 'submit'}
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
