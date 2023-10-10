import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import styles from './ProfilePage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import { handleInputChange, handleSubmit } from '@/utils/helpers/form/formHelpers';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { updateUser } from '@/store/actions/userActions';
import validateSchema from '@/utils/helpers/form/authSchema';

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

  return (
    <section className={styles.section}>
      <form
        className={`form ${styles.form}`}
        onSubmit={(event): void =>
          handleSubmit(event, inputsValues, validateSchema, updateUser, dispatch, setValidateMessages)
        }
      >
        <h3>Profile</h3>
        <div className={styles.formCenter}>
          <FormRow
            type="text"
            name="name"
            value={inputsValues.name}
            placeholder="Enter new name*"
            validateMessage={validateMessages.name}
            onInputChange={(event: ChangeEvent): void =>
              handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
            }
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={inputsValues.lastName}
            placeholder="Enter new last name*"
            validateMessage={validateMessages.lastName}
            onInputChange={(event: ChangeEvent): void =>
              handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
            }
          />
          <FormRow
            type="email"
            name="email"
            value={inputsValues.email}
            placeholder="Enter new email*"
            validateMessage={validateMessages.email}
            onInputChange={(event: ChangeEvent): void =>
              handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
            }
          />
          <FormRow
            type="text"
            name="location"
            value={inputsValues.location}
            placeholder="Enter new location*"
            validateMessage={validateMessages.location}
            onInputChange={(event: ChangeEvent): void =>
              handleInputChange(event, inputsValues, validateSchema, setInputsValues, setValidateMessages)
            }
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
