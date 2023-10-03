/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, waitFor } from '@testing-library/react';

const fillInFormInputs = async (inputsArray: HTMLInputElement[], values: Record<string, string>): Promise<void> => {
  const promises = inputsArray.map((input) => {
    return waitFor(() => fireEvent.change(input, { target: { value: values[input.name] } }));
  });

  await Promise.all(promises);
};

export default fillInFormInputs;
