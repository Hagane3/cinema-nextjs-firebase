import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, "Password is too Short!")
    .max(50, "Password is too Long!")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default signInSchema;
