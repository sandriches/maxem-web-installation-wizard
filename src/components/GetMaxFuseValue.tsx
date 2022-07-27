import * as React from "react";
import maxFuseValidationSchema from "../schemas/maxFuseSchema";
import { Formik, FormikValues } from 'formik';
import { mockedSaveFuseValue } from "../services/mockedSaveFuseValue";
import FuseInput from "./FuseInput";
import { genericDeviceType } from "../types/IDevice";

// Implemented as class as on doc specs
// Gets fuse value from form input, sends to mock backend
// @parentCallback - callback which will save values on state in parent (app.tsx)
class GetMaxFuseValue extends React.Component<{navigate: Function, parentCallback: Function, deviceName: string}, {message: string, successful: boolean}> {

  constructor(state: any) {
    super(state);
    this.state = {message: "", successful: false};
  }
  
    render() {
        const initialValues: any = {
          maxfuse: ""
        };
      
        const handleSubmit = (values: FormikValues) => {
            let { maxfuse } = values;
            mockedSaveFuseValue.save(maxfuse, this.props.deviceName, (error: Error) => {
                if (error) {
                    const resMessage = error.message || error.toString();
                        this.setState({message: resMessage});
                        this.setState({successful: false});
                    } else {
                      const rtnObj: genericDeviceType = {
                        name: this.props.deviceName,
                        maxFuse: parseFloat(maxfuse)
                      }
                        this.props.parentCallback(rtnObj);
                        this.setState({successful: true});
                    }
                }
            )
            this.props.navigate("/");
        }

        return(
            <>
            <div>
            <Formik
              initialValues={initialValues}
              validationSchema={maxFuseValidationSchema}
              onSubmit={handleSubmit}
            >
              <FuseInput successful={this.state.successful} message={this.state.message} fieldName="maxfuse" deviceName={this.props.deviceName} />
            </Formik>
          </div></>
          );
        }
}

export default GetMaxFuseValue