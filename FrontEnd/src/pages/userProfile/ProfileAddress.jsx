import { useForm } from "../../hooks/useForm";
import { profileAddressValidations } from "../../validations";

const ProfileAddressForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      props.handleSubmit(values);
    }
  };
  const { values, errors, bindField, isValid } = useForm({
    validations: profileAddressValidations,
    initialValues: {
      streetAddress: props.userProfile?.profile?.address.streetAddress || "",
      city: props.userProfile?.profile?.address.city || "",
      state: props.userProfile?.profile?.address.state || "",
      zipcode: props.userProfile?.profile?.address.zipcode || "",
    },
  });

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="card-text mb-3">
        <span>Address</span>
      </div>
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
      <div className="float-end">
        <button
          type="submit"
          id="profile-update-submit"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileAddressForm;
