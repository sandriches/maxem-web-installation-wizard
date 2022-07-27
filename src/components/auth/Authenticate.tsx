import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { serial_regex } from '../../globals';

function Authenticate() {
  function useAuth() {
    return React.useContext(AuthContext);
  }
  
  const [message, setMessage] = React.useState<string>("");
  const [successful, setSuccessful] = React.useState<boolean>(false);

  let navigate = useNavigate();
  let location: any = useLocation();
  let auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  let from = location.state?.from?.pathname || "/";

  function handleSubmit(values: FormikValues): void {
    let {serial, password} = values;

    auth.signin(serial, password, (error: any) => {
      if (error) {
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      } else {
      setSuccessful(true);
      // If more routes/pages are added, this redirects user to page before login was reached.
      navigate(from, { replace: true })
      }
    });
  }

  const initialValues: any = {
    serial: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    serial: Yup.string()
      .test(
        "match",
        "The serial format must match the correct regex format.",
        (val: any) =>
          val &&
          val.toString().length == 14 &&
          serial_regex.test(val.toString())
      )
      .required("Required field"),
      password: Yup.string()
      .test(
        "len",
        "The password must be between 5 and 30 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 5 &&
          val.toString().length <= 30
      )
      .required("Required field"),
  });

  return(
    <><div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="serial"> Serial </label>
                <Field name="serial" type="text" className="form-control" />
                <ErrorMessage
                  name="serial"
                  component="div"
                  className="alert alert-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div></>
  )
}
export default Authenticate