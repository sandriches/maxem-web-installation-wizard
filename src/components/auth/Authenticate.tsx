import React, { useState } from 'react';
import { IAuthController } from '../../types/IAuthController';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Authenticate() {

  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [serial, setSerial] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const initialValues: IAuthController = {
    serial: "",
    password: "",
  };
  const serial_regex = /[a-zA-Z][a-zA-Z]\d-\d-[a-zA-Z]-\d\d\d\d\d\d/;

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

  const handleAuthenticate = (formValue: IAuthController) => {
    const { serial, password } = formValue;
    // mockedAuthProvider.auth();
  };

  return(
    <><div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAuthenticate}
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
