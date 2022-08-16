export const registrationValidations = {
  firstName: {
    required: {
      value: true,
      message: "First Name is required",
    },
  },
  lastName: {
    required: {
      value: true,
      message: "Last Name is required",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
  },
  password: {
    required: {
      value: true,
      message: "password can't be empty",
    },
    custom: {
      validate: (value) => value.length >= 8,
      message: "The password needs to be atleast 8 Chars",
    },
  },
  confirmPassword: {
    required: {
      value: true,
      message: "confirm password can't be empty",
    },
    custom: {
      validate: (value) => value.length >= 8,
      message: "The password needs to be atleast 8 chars",
    },
  },
};
