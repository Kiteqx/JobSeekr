export const invalidInputsValues = [
  {
    name: 'Joh',
    email: 'test@gmail.com',
    password: '12345678',
  },
  {
    name: 'John',
    email: 'invalidEmail',
    password: '12345678',
  },
  {
    name: 'John',
    email: 'test@gmail.com',
    password: 'password without uppers case letter',
  },
];

export const validInputsValues = [
  {
    name: 'John',
    email: 'test@gmail.com',
    password: '12345678Lu',
  },
  {
    name: 'joh',
    email: 'test12345678@gmail.com',
    password: 'passwordU',
  },
  {
    name: 'Johnyyyyyy',
    email: 't@gmail.com',
    password: 'PASSWORDdfdfd',
  },
];

export const emptyInputValues = {
  name: '',
  email: '',
  password: '',
};
