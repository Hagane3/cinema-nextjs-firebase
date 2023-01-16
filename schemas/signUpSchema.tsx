import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string().min(5, "Username is too short!"),
  password: Yup.string()
    .min(7, "Password is too Short!")
    .max(50, "Password is too Long!")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default signUpSchema;
