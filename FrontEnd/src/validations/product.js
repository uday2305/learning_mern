export const productValidations = {
  name: {
    required: {
      value: true,
      message: "product name is required",
    },
  },
  category: {
    required: {
      value: true,
      message: "department category is required",
    },
  },
  price: {
    required: {
      value: true,
      message: "price is required",
    },
  },
  discountPrice: {
    required: {
      value: true,
      message: "discountPrice is required",
    },
  },
  description: {
    required: {
      value: true,
      message: "description is required",
    },
  },
  image: {
    required: {
      value: true,
      message: "image path is required",
    },
  },
};
