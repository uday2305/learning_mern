import React from "react";
import { useForm } from "../../hooks/useForm";
const CheckOutForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      let payload = { shippingAddress: {} };
      payload.shippingAddress = { ...values };
      props.handleSubmit(payload);
    }
  };
  const { values, errors, bindField, isValid } = useForm({
    validations: {
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
      streetAddress: props.userProfile?.profile?.address.streetAddress || "",
      city: props.userProfile?.profile?.address.city || "",
      state: props.userProfile?.profile?.address.state || "",
      zipcode: props.userProfile?.profile?.address.zipcode || "",
    },
  });

  return (
    <form className="m-3" onSubmit={handleSubmit}>
      <h2 className="mb-3">Confirm Shipping Address</h2>
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
