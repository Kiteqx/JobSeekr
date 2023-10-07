import React, { ChangeEvent, Dispatch, FormEvent, ReactElement, SetStateAction, useState } from 'react';
import styles from './ProfilePage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { showNotification } from '@/utils/helpers/antd/antdConfig';
import NotificationMessages from '@/enums/notificationMessage';
import { updateUser } from '@/store/actions/userActions';
import { checkIsAllInputValid, checkIsInputValid } from '@/utils/helpers/validationSchemes/authSchema';

const ProfilePage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isLoading, user: prevUserData } = useAppSelector((state) => state.user) as {
    isLoading: boolean;
    user: Record<string, string>;
  };

  const [inputsValues, setInputsValues] = useState<Record<string, string>>({
    name: prevUserData?.name || '',
    email: prevUserData?.email || '',
    lastName: prevUserData?.lastName || '',
    location: prevUserData?.location || '',
  });

  const [validateMessages, setValidateMessages]: [
    Record<string, string>,
    Dispatch<SetStateAction<Record<string, string>>>,
  ] = useState({});

  const handleInputChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const { name: changedField } = target;

    checkIsInputValid(changedField, newValue, setValidateMessages);
    setInputsValues((prevState) => ({ ...prevState, [changedField]: target.value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (Object.values(inputsValues).some((value) => !value)) {
      showNotification(NotificationMessages.EMPTY_FIELDS);
    } else if (!checkIsAllInputValid(inputsValues, setValidateMessages)) {
      showNotification(NotificationMessages.CHECK_FIELDS_VALUE);
    } else {
      dispatch(updateUser(inputsValues));
    }
  };

  return (
    <section className={styles.section}>
      <form className={`form ${styles.form}`} onSubmit={(event: FormEvent): void => handleSubmit(event)}>
        <h3>Profile</h3>

        <div className={styles.formCenter}>
          <FormRow
            type="text"
            name="name"
            value={inputsValues.name}
            placeholder="Enter new name*"
            validateMessage={validateMessages.name}
            onInputChange={handleInputChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={inputsValues.lastName}
            placeholder="Enter new last name*"
            validateMessage={validateMessages.lastName}
            onInputChange={handleInputChange}
          />
          <FormRow
            type="email"
            name="email"
            value={inputsValues.email}
            placeholder="Enter new email*"
            validateMessage={validateMessages.email}
            onInputChange={handleInputChange}
          />
          <FormRow
            type="text"
            name="location"
            value={inputsValues.location}
            placeholder="Enter new location*"
            validateMessage={validateMessages.location}
            onInputChange={handleInputChange}
          />
          <button
            className="btn btn-block"
            type="submit"
            disabled={
              isLoading ||
              !Object.keys(inputsValues).some((field) => inputsValues[field] !== prevUserData[field]) ||
              Object.values(inputsValues).some(([inputValue]) => !inputValue) ||
              Object.values(validateMessages).some(([errorMessage]) => !!errorMessage)
            }
          >
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
