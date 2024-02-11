import { ErrorsType } from "./types";
import { emailValidation, passwordValidation } from "./validators/validators";

const validation = (
  name: string,
  value: string,
  errors: ErrorsType,
) => {
  switch (name) {
    case "email":
      return emailValidation(value, errors);

    case "password":
      return passwordValidation(value, errors);

    default:
      return errors;
  }
};

export default validation;
