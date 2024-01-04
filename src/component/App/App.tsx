import { useEffect, useState, useRef } from "react";
import "./App.css";
import Stepper from "../CheckoutStages/CheckoutProcess";
import ServiceSelection from "../Pages/ServiceSelection";
import ExportSelection from "../Pages/ExportOpt";
import ContactDetails from "../Pages/ContactDetails";
import Button from "../button.tsx/Button";
import { Formik, useFormik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com"; // Import emailjs library
import SuccessPage from "../Pages/SucessPage";
import ReCAPTCHA from "react-google-recaptcha";



// Constants for different stages of the form
const stages = {
  SERVICE_SELECTION: 2,
  EXPORT_SELECTION: 3,
  CONTACT_DETAILS: 4,
  SUCESS_PAGE: 5,
};
interface FormValues {
  vorname: string;
  familienname: string;
  email: string;
  telefonnummer: string;
  company: string;
  strassenAdresse: string;
  aptNr: string;
  state: string;
  postcode: string;
  country: string;
  exportOptions: [];
  cityModel: [];
  layers: [];
  baurecht: [];
}

// Initial form values
const initialValues: FormValues = {
  vorname: "",
  familienname: "",
  email: "",
  telefonnummer: "",
  company: "",
  strassenAdresse: "",
  aptNr: "",
  state: "",
  postcode: "",
  country: "",
  exportOptions: [],
  cityModel: [],
  layers: [],
  baurecht: [],
};

// Validation schema using Yup
const validationSchema = Yup.object({
  vorname: Yup.string().required("Ihr Vorname ist erforderlich"),
  familienname: Yup.string().required("Ihr Nachname ist erforderlich"),
  email: Yup.string()
    .required("E-Mail ist erforderlich")
    .email("Ungültige E-Mail-Adresse"),
  telefonnummer: Yup.string().required("Telefonnummer ist erforderlich"),
  company: Yup.string().required("Bitte geben Sie Ihren Firmennamen an"),
});

function App() {
  // State to track the current stage of the form
  const [currentStage, setCurrentStage] = useState(1);

  const [back, setBack] = useState(false);
  // State to hold form values
  // const [formValues, setFormValues] = useState(initialValues);

  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      // setFormValues(values);
    },
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });
  // Clear localStorage on page refresh
  useEffect(() => {
    const clearLocalStorageOnRefresh = (event: BeforeUnloadEvent) => {
      localStorage.clear();
      delete event.returnValue; // Standard for most browsers to prevent the prompt
    };

    window.addEventListener("beforeunload", clearLocalStorageOnRefresh);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnRefresh);
    };
  }, []);

  // Initialize the emailjs library
  useEffect(() => {
    emailjs.init("FMLLfD0WiaxfSUQVd");
  }, []);

  // Function to handle moving to the next stage of the form
  const handleNextStage = () => {
    setCurrentStage(Math.min(currentStage + 1, 5));
    console.log(currentStage);
  };

  // Function to handle moving to the previous stage of the form
  const handleReverseStage = () => {
    setCurrentStage(Math.max(currentStage - 1, 1));
    setBack(true);
    console.log(currentStage);
  };

  // Function to handle button click events
  const handleButtonClick = async () => {
    if (currentStage === stages.CONTACT_DETAILS) {
      // If in the contact details stage, submit the form
      if (!back) {

        console.log("back Button clicked", back);
      } else if (back) {
        setCurrentStage(4);
      }
      // handleReverseStage()
    } else if (currentStage === 5) {
      // Redirect to urbaniistic homepage
      window.location.href = "https://www.urbanistic.de";
    } else {
      // For other stages, simply move to the next stage
      handleNextStage();
    }
  };
    // Ref for reCAPTCHA component
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  // Function to render the appropriate stage component
  const renderStageComponent = () => {
    switch (currentStage) {
      case stages.SERVICE_SELECTION:
        return <ServiceSelection />;
      case stages.EXPORT_SELECTION:
        return <ExportSelection />;
      case stages.CONTACT_DETAILS:
        return <ContactDetails />;
      case stages.SUCESS_PAGE:
        return <SuccessPage />;
      default:
        return null;
    }
  };
  const sendEmail = async (values: FormValues) => {
    const templateParams = {
      to_name: `${values.vorname} ${values.familienname}`,
      from_name: "Urbanistic Team",
      to_email: values.email,
      city_model: values.cityModel.join(", "),
      layers: values.layers.join(", "),
      baurecht: values.baurecht.join(", "),
      export_options: values.exportOptions.join(", "),
    };

    try {
      const response = await emailjs.send(
        "service_w2ss8e7",
        "contct_form",
        templateParams
      );

      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Email failed to send:", error);
      // Set email response status to error
    }
    if (back === false) {
      handleNextStage();
    } else {
      setBack(false);
    }
  };

  // Render the main component
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setSubmitting(false);
        // setFormValues(values);
        console.log("values are", values);
        console.log(formik);
        // handle Google Recaptcha token request
        if (recaptchaRef.current) {
          const token = await recaptchaRef.current.executeAsync();
          console.log("reCAPTCHA Token:", token);
          sendEmail(values);
        } else {
          console.error("recaptchaRef.current is null");
          // Handle the case where recaptchaRef.current is null
        }
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form id="form-details">
          <div className="app-container">
            <div className="App">
              {/* Component for displaying the current stage */}
              <Stepper currentStage={currentStage} />
              {renderStageComponent()}
            </div>
            <footer>
              <div className="Buttons">
                {/* Button for moving to the next stage or submitting the form */}
                <Button
                  text={currentStage === 5 ? "Finish" : "Next"}
                  onClick={handleButtonClick}
                  type={
                    currentStage === stages.CONTACT_DETAILS
                      ? "submit"
                      : "button"
                  }
                />
                {/* Button for moving to the previous stage */}
                <Button
                  text="Back"
                  onClick={handleReverseStage}
                  disabled={currentStage === 1 || currentStage === 5}
                  hidden={currentStage === 1 || currentStage === 5}
                />
                <ReCAPTCHA
                  sitekey="6Ldh6UMpAAAAAN1niKW40jhp5m5FX7FkbMVf-3ak"
                  size="invisible"
                  ref={recaptchaRef}
                />

              </div>
            </footer>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
