import * as React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikBag, FormikValues } from 'formik';
import { mockedSaveFuseValue } from "../services/mockedSaveFuseValue";
import { useNavigate } from 'react-router-dom';

class GetMaxFuseValue extends React.Component<{navigate: any, parentCallback: any}, {message: string, successful: boolean, maxFuse: number}> {

  constructor(state: any) {
    super(state);
    this.state = {message: "", successful: false, maxFuse: 0};
  }
  
    render() {
        const initialValues: any = {
          maxfuse: ""
        };
      
        const validationSchema = Yup.object().shape({
            maxfuse: Yup.number()
            .test(
                'above 0',
                "The value must be above 0",
                (val: any) => 
                val &&
                parseFloat(val) > 0
            )
            .required("Required field"),
        })

        const handleSubmit =  (values: FormikValues) => {
            let { maxfuse } = values;
            mockedSaveFuseValue.save(maxfuse, (error: any) => {
                if (error) {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                        this.setState({message: resMessage});
                        this.setState({successful: false});
                    } else {
                        this.props.parentCallback(maxfuse);
                        this.setState({maxFuse: maxfuse});
                        this.setState({successful: true});
                    }
                }
            )
            this.props.navigate("/");
        }

        return(
            <>
            <h1>Dashboard</h1>
            <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="maxfuse"> Home Grid Max Fuse Value </label>
                      <Field name="maxfuse" type="text" className="form-control" />
                      <ErrorMessage
                        name="maxfuse"
                        component="div"
                        className="alert alert-danger" />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </div>
                  </div>
                )}
                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div></>
          );
        }
}

export default GetMaxFuseValue