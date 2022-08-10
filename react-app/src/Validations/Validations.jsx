import * as yup from "yup";
import { isEmail } from "validator";

export const loginSchema = yup.object().shape({
  //
  email: yup
    .string()
    .required("Email is required")
    .test("is-email", "Email is not valid", (value) => isEmail(value)),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
    .max(50, "Password must be less than 50 characters"),
});

export const signupSchema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  })
  .concat(loginSchema);

export const validateUser = (user, schema) => schema.isValid(user);
