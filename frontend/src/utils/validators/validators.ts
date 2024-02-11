import { ErrorsType } from "../types";

export const emailValidation = (value: string, errors: ErrorsType): ErrorsType => {
  if (!value)
    return { ...errors, email: "email is required" };
  if (!value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/))
    return {
      ...errors,
      email: "The email must be valid",
    };

  return { ...errors, email: "" };
};

export const passwordValidation = (value: string, errors: ErrorsType): ErrorsType => {
  if (!value) {
    return { ...errors, password: "Password is requrired" };
  }
  return { ...errors, password: "" };
};
