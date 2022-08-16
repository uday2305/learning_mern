export const profileAddressValidations = {
    streetAddress: {
      required: {
        value: true,
        message: 'streetAddress is required',
      },
    },
    city: {
      required: {
        value: true,
        message: 'city is required',
      },
    },
    state: {
      required: {
        value: true,
        message: 'state is required',
      }
    },
    zipcode: {
      required: {
        value: true,
        message: 'zipcode is required',
      },
      custom: {
        validate: (value) => value.length === 5,
        message: 'zipcode needs to be 5 Chars',
      },
    },
  };