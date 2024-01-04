import { ErrorMessage, Field } from "formik";
import "./ContactDetails.css";

const ContactDetails: React.FC = () => {
  return (
    <div className="container">
      <div className="form-container">
        {/* <Form> */}
        <div className="field full-width">
          <Field name="vorname" placeholder="Vorname" />
          <div className="error">
            <ErrorMessage name="vorname" component="span" />
          </div>
        </div>
        <div className="field full-width">
          <Field name="familienname" placeholder="Familienname" />
          <div className="error">
            <ErrorMessage name="familienname" component="span" />
          </div>
        </div>
        <div className="field full-width">
          <Field name="email" placeholder="Email" type="email" />
          <div className="error">
            <ErrorMessage name="email" component="span" />
          </div>
        </div>
        <div className="field full-width">
          <Field name="telefonnummer" placeholder="Telefonnummer" />
          <div className="error">
            <ErrorMessage name="telefonnummer" component="span" />
          </div>
        </div>
        <div className="field full-width">
          <Field name="company" placeholder="Company Name" />
          <div className="error">
            <ErrorMessage name="company" component="span" />
          </div>
        </div>
        <div className="field">
          <Field name="strassenAdresse" placeholder="Strassen-Adresse" />
        </div>
        <div className="field">
          <Field name="aptNr" placeholder="Apt/Suite Nr" />
        </div>
        <div className="field">
          <Field name="state" placeholder="Staadt" />
        </div>
        <div className="field">
          <Field name="postcode" placeholder="Postcode" />
        </div>
        <div className="field full-width">
          <Field name="country" placeholder="Land" />
        </div>
        <div className="field full-width">
        <label>
            <Field type="checkbox" name="Declaration" value='declaration' />
            I hereby declare that
            all information given by me can be utilized.
          </label>
          

        </div>

      </div>
    </div>
  );
};

export default ContactDetails;
