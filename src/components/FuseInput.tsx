import { ErrorMessage, Field, Form } from "formik";
import React from "react";

function FuseInput({successful, message, fieldName, deviceName}: {successful: boolean, message: string, fieldName: string, 
deviceName: string}) {
    return (
        <Form>
        {!successful && (
        <div>
            <div className="form-group">
            <label htmlFor={fieldName}> Please enter {deviceName} max fuse value </label>
            <Field name={fieldName} type="text" className="form-control" />
            <ErrorMessage
                name={fieldName}
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
    )
}

export default FuseInput