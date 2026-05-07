import { type ProfileForm, type RegisterForm } from "../types/form.types";
import {
  MAX_INPUT_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "./config";

type ValidationErrors = {
  [K in keyof RegisterForm]: string;
};

type ProfileErrors = {
  [K in keyof ProfileForm]: string;
};

export const validateRegister = (form: RegisterForm): ValidationErrors => {
  const errors: ValidationErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // Validate first name
  if (!form.firstName) {
    errors.firstName = "First name is required";
  } else if (form.firstName.length > MAX_INPUT_LENGTH) {
    errors.firstName = "First name cannot be bigger than 20 characters";
  }

  // Validate last name
  if (!form.lastName) {
    errors.lastName = "Last name is required";
  } else if (form.lastName.length > MAX_INPUT_LENGTH) {
    errors.lastName = "Last name cannot be bigger than 50 characters";
  }

  // Validate email format
  errors.email = validateEmail(form.email);

  // Validate password
  errors.password = validatePassword(form.password);

  return errors;
};

export const validateLogin = (
  email: string,
  password: string,
): { email: string; password: string } => {
  const errors: { email: string; password: string } = {
    email: "",
    password: "",
  };

  errors.email = validateEmail(email);
  errors.password = validatePassword(password);

  return errors;
};

export const validateEmail = (email: string): string => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email";
  } else if (email.length > MAX_INPUT_LENGTH) {
    return "Email cannot be bigger than 50 characters";
  }

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    return "Password must be at least 6 characters long";
  } else if (password.length > MAX_PASSWORD_LENGTH) {
    return "Password cannot be bigger than 20 characters";
  }

  return "";
};

export const validateProfile = (profile: ProfileForm): ProfileErrors => {
  const errors: ProfileErrors = {
    gender: "",
    dob: "",
    weight: "",
    dailyCalories: "",
  };

  errors.weight = validateNumber(profile.weight);
  errors.dailyCalories = validateNumber(profile.dailyCalories);

  return errors;
};

export const validateNumber = (field: string): string => {
  if (!field || !Number(field)) {
    return "Please enter a valid number";
  } else if (field.length > 5) {
    return "Enter a max 4 digit number (0000)";
  }

  return "";
};
