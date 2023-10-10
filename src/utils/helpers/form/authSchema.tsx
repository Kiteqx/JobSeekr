const validateSchema = {
  name: [
    {
      match: /.{3,}/,
      message: 'Name must contain at least three character',
    },
    {
      match: /^[^0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+$/,
      message: 'Name must not contain special characters or numbers',
    },
  ],
  lastName: [
    {
      match: /.{3,}/,
      message: 'Last name must contain at least three character',
    },
    {
      match: /^[^0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+$/,
      message: 'Last name must not contain special characters or numbers',
    },
  ],
  password: [
    {
      match: /.{8,}/,
      message: 'Password must contain minimum 8 characters',
    },
    {
      match: /[a-zа-яё]/,
      message: 'Password must contain at least 1 lowercase letter',
    },
    {
      match: /[A-ZА-ЯЁ]/,
      message: 'Password must contain at least 1 uppercase letter',
    },
  ],
  email: [
    {
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Email should have the format of example@email.com',
    },
  ],
  location: [
    {
      match: /.{3,}/,
      message: 'Location must contain at least three character',
    },
    {
      match: /^[^!@#$%^&*()_+{}[\]:;<>?~\\-]+$/,
      message: 'Location must not contain special characters',
    },
  ],
};

export default validateSchema;
