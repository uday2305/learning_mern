import React from "react";
import { useForm } from "../hooks/useForm";
const CheckOutForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      props.handleSubmit(values);
    }
  };
  const { values, errors, bindField, isValid } = useForm({
    validations: {
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
      streetAddress: {
        required: {
          value: true,
          message: "streetAddress is required",
        },
      },
      city: {
        required: {
          value: true,
          message: "city is required",
        },
      },
      state: {
        required: {
          value: true,
          message: "state is required",
        },
      },
      zipcode: {
        required: {
          value: true,
          message: "zipcode is required",
        },
        custom: {
          validate: (value) => value.length === 5,
          message: "zipcode needs to be 5 Chars",
        },
      },
    },
    initialValues: {
      firstName: props.userProfile?.profile?.firstName,
      lastName: props.userProfile?.profile?.lastName,
      email: props.userProfile?.profile?.email,
      streetAddress: props.userProfile?.profile?.address.streetAddress || "",
      city: props.userProfile?.profile?.address.city || "",
      state: props.userProfile?.profile?.address.state || "",
      zipcode: props.userProfile?.profile?.address.zipcode || "",
    },
  });

  return (
    <form className="m-3" onSubmit={handleSubmit}>
      <h2 className="mb-3">User Info</h2>

      <div className="mb-3">
        <label htmlFor="register-first-name" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          {...bindField("firstName")}
          name="firstName"
          id="firstName"
          aria-describedby="firstName"
        />
        {errors.firstName && (
          <div className="invalid-feedback">{errors.firstName}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          {...bindField("lastName")}
          name="lastName"
          id="lastName"
          aria-describedby="lastName"
        />
        {errors.lastName && (
          <div className="invalid-feedback">{errors.lastName}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...bindField("email")}
          name="email"
          id="email"
          aria-describedby="emailHelp"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <h2 className="mb-3">Shipping Address</h2>
      <div className="mb-3">
        <label htmlFor="streetAddress" className="form-label">
          Street Address
        </label>
        <input
          type="text"
          className={`form-control ${errors.streetAddress ? "is-invalid" : ""}`}
          {...bindField("streetAddress")}
          name="streetAddress"
          id="streetAddress"
          aria-describedby="streetAddress"
        />
        {errors.streetAddress && (
          <div className="invalid-feedback">{errors.streetAddress}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className={`form-control ${errors.city ? "is-invalid" : ""}`}
          {...bindField("city")}
          name="city"
          id="city"
          aria-describedby="city"
        />
        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <input
          type="text"
          className={`form-control ${errors.state ? "is-invalid" : ""}`}
          {...bindField("state")}
          name="state"
          id="state"
          aria-describedby="state"
        />
        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="zipcode" className="form-label">
          Zip Code
        </label>
        <input
          type="text"
          className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
          {...bindField("zipcode")}
          name="zipcode"
          id="zipcode"
          aria-describedby="zipcode"
        />
        {errors.zipcode && (
          <div className="invalid-feedback">{errors.zipcode}</div>
        )}
      </div>

      <button
        type="submit"
        id="register-submit"
        className="btn btn-primary float-end"
      >
        Place Order
      </button>
    </form>
  );
};
export default CheckOutForm;
