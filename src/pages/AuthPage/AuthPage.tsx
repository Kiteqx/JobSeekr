import React, { ReactElement, useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const initialLoginInputValues = {
  name: 'string',
  email: '',
  password: '',
};

const initialRegisterInputValues = { ...initialLoginInputValues };

const AuthPage = (): ReactElement => {
  const [loginInputValues, setLoginInputValues] = useState(initialLoginInputValues);
  const [registerInputValues, setRegisterInputValues] = useState(initialRegisterInputValues);
  const [isMember, setIsMember] = useState(false);

  return (
    <main className={styles.main}>
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
