import React, { ReactElement, useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DataFetchingPreloader from '@/components/DataFetchingPreloader/DataFetchingPreloader';
import { useAppSelector } from '@/utils/hooks/redux';

const initialLoginInputValues: Record<string, string> = {
  email: '',
  password: '',
};

const initialRegisterInputValues: Record<string, string> = { ...initialLoginInputValues, name: '' };

const AuthPage = (): ReactElement => {
  const [loginInputValues, setLoginInputValues] = useState(initialLoginInputValues);
  const [registerInputValues, setRegisterInputValues] = useState(initialRegisterInputValues);
  const [isMember, setIsMember] = useState(false);
  const isLoading = useAppSelector((store) => store.user.isLoading);

  return (
    <main className={styles.main}>
      {isLoading && <DataFetchingPreloader />}
      {isMember ? (
        <LoginForm inputsValues={loginInputValues} setInputsValues={setLoginInputValues} setIsMember={setIsMember} />
      ) : (
        <RegisterForm
          inputsValues={registerInputValues}
          setInputsValues={setRegisterInputValues}
          setIsMember={setIsMember}
        />
      )}
    </main>
  );
};

export default AuthPage;
