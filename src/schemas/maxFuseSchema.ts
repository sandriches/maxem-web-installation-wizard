import * as Yup from "yup";

const maxFuseValidationSchema = Yup.object().shape({
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

export default maxFuseValidationSchema