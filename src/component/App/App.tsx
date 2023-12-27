import React, { useEffect, useState } from "react";
import "./App.css";
import Stepper from "../CheckoutStages/CheckoutProcess";
import ServiceSelection from "../Pages/ServiceSelection";
import ExportSelection from "../Pages/ExportOpt";
import ContactDetails from "../Pages/ContactDetails";
import Button from "../button.tsx/Button";
import { Formik, useFormik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

function App() {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  interface FormValues {
    vorname: string;
    familienname: string;
    email: string;
    telefonnummer: string;
    company: string;
    aptNr: string;
    state: string;
    postcode: string;
    country: string;
  }
  const initialValues: FormValues = {
    vorname: "",
    familienname: "",
    email: "",
    telefonnummer: "",
    company: "",
    aptNr: "",
    state: "",
    postcode: "",
    country: "",
  };

  // Load form values from localStorage or use initial values
  const loadFormValuesFromStorage = (): FormValues => {
    const storedValues = localStorage.getItem("formValues");
    return storedValues ? JSON.parse(storedValues) : initialValues;
  };

  const [formValues, setFormValues] = useState<FormValues>(
    loadFormValuesFromStorage
  );

  useEffect(() => {
    // Store form values in localStorage whenever formValues change
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

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

  const validationSchema = Yup.object({
    vorname: Yup.string().required("Your first name is required"),
    familienname: Yup.string().required("Your Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    telefonnummer: Yup.string().required("Phone Number is required"),
    company: Yup.string().required("Please Provide your company Name")
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setFormValues(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Enable reinitialization when initialValues change
    validateOnMount: true, // Perform initial validation on mount
  });

  const handleNextStage = () => {
    setCurrentStage((prevStage) => Math.min(prevStage + 1, 5));
    console.log("i was  clicked"); // Assuming there are five stages (0-indexed)
  };
  const handleReverseStage = () => {
    setCurrentStage((prevStage) => Math.min(prevStage - 1, 5)); // Assuming there are five stages (0-indexed)
  };

  const handleOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  const handleButtonClick = () => {
    console.log("Selected Options:", selectedOptions);
    console.log(formik);
    if (currentStage === 4) {
      // Trigger form submission
      formik.handleSubmit();
      console.log("These are formik values", formik.values);

      // Check if the form is valid before proceeding
      if (!formik.isValid) {
        console.log("Form validation failed stage");
      }
    } else {
      // For other stages, simply move to the next stage
      handleNextStage();
      console.log("Button clicked stage for normal Next");
    }
  };

  const renderStageComponent = () => {
    switch (currentStage) {
      case 2:
        return <ServiceSelection onOptionsChange={handleOptionsChange} />;
      case 3:
        return <ExportSelection />;
      case 4:
        return <ContactDetails />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setSubmitting(false);
        setFormValues(values);
        console.log("values are", values);
        console.log(formik);
        handleNextStage();
      }}
      // onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="App">
            <Stepper currentStage={currentStage} />

            {renderStageComponent()}
          </div>

          <div className="Buttons">
            <Button
              text={currentStage === 5 ? "Finish" : "Next"}
              onClick={handleButtonClick}
              type={currentStage === 4 ? "submit" : "button"} // Set type to 'submit' only in stage four
            />
            <Button
              text="Back"
              onClick={handleReverseStage}
              disabled={currentStage === 1}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
