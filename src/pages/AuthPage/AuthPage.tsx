import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DataFetchingPreloader from '@/components/DataFetchingPreloader/DataFetchingPreloader';
import { useAppSelector } from '@/utils/hooks/redux';
import { checkIsInputValid } from '@/utils/helpers/validationSchemes/authSchema';

const initialLoginInputValues: Record<string, string> = {
  email: '',
  password: '',
};

const initialRegisterInputValues: Record<string, string> = { ...initialLoginInputValues, name: '' };

export const handleInputChange = (
  event: ChangeEvent,
  inputValues: Record<string, string>,
  setInputValues: Dispatch<SetStateAction<Record<string, string>>>,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): void => {
  const input = event.target as HTMLInputElement;
  const { value } = input;
  const changedField = input.name;
  checkIsInputValid(changedField, value, setValidateMessages);
  setInputValues({ ...inputValues, [changedField]: value });
};

const AuthPage = (): ReactElement => {
  const [loginInputValues, setLoginInputValues] = useState(initialLoginInputValues);
  const [registerInputValues, setRegisterInputValues] = useState(initialRegisterInputValues);
  const [isMember, setIsMember] = useState(false);
  const { user, isLoading } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <main className={styles.main}>
      {isLoading && <DataFetchingPreloader />}
      {isMember ? (
        <LoginForm inputValues={loginInputValues} setInputValues={setLoginInputValues} setIsMember={setIsMember} />
      ) : (
        <RegisterForm
          inputValues={registerInputValues}
          setInputValues={setRegisterInputValues}
          setIsMember={setIsMember}
        />
      )}
    </main>
  );
};

export default AuthPage;
