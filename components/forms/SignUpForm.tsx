import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import signUpSchema from "../../schemas/signUpSchema";
import { useRouter } from "next/router";
import UserContext from "../../context/userContext";

const SignUpForm = () => {
  const router = useRouter();
  const { setUserHandler } = useContext(UserContext);
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, { resetForm }) => {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then(() => {
            const auth: any = getAuth();
            updateProfile(auth.currentUser, { displayName: values.username });
            setUserHandler(auth.currentUser);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            return;
          });

        router.push("/movies");

        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <section className="flex justify-center items-center h-screen w-full absolute top-0">
          <Form className="flex items-start justify-center flex-col w-2/3 sm:w-3/5 sm:text-2xl md:w-2/3 lg:w-1/3 2xl:text-2xl lg:gap-1+">
            <label htmlFor="username" className="mt-2">
              Username:
            </label>
            <Field
              id="username"
              name="username"
              className="border-2 rounded-md w-full text-xl mt-4 mb-1 sm:py-1"
            />
            {errors.username && touched.username ? (
              <p className="text-red-400 font-bold text-sm sm:text-lg">
                {errors.username}
              </p>
            ) : null}
            <label htmlFor="email" className="mt-2">
              E-mail:
            </label>
            <Field
              id="email"
              name="email"
              className="border-2 rounded-md w-full text-xl mt-4 mb-1 sm:py-1"
            />
            {errors.email && touched.email ? (
              <p className="text-red-400 font-bold text-sm sm:text-lg">
                {errors.email}
              </p>
            ) : null}
            <label htmlFor="password" className="mt-2">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="border-2 rounded-md w-full text-xl mt-4 mb-1 sm:py-1"
            />
            {errors.password && touched.password ? (
              <p className="text-red-400 font-bold text-sm sm:text-lg">
                {errors.password}
              </p>
            ) : null}
            <p className="text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </p>
            <button
              type="submit"
              className="border-2 mt-4 px-6 py-1 rounded-lg mx-auto sm:py-2 sm:px-8"
            >
              Sign up!
            </button>
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default SignUpForm;
