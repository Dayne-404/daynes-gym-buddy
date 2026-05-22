import { useState } from "react";

type FormErrors<T> = { [K in keyof T]: string };

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>(
    () =>
      Object.fromEntries(
        Object.keys(initialValues).map((k) => [k, ""]),
      ) as FormErrors<T>,
  );
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validates all fields, updates errors, and returns whether the form is valid.
  // Only clears a field's current error if the user has edited it — preserving
  // server-side errors on untouched fields across re-submits.
  const submit = (): boolean => {
    const newErrors = validate(values);
    setErrors((prev) => {
      const next = { ...prev };
      for (const key in newErrors) {
        if (newErrors[key] || touched.has(key)) {
          next[key] = newErrors[key];
        }
      }
      return next;
    });
    setTouched(new Set());
    return !Object.values(newErrors).some(Boolean);
  };

  const setFieldError = (field: keyof T & string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  return { values, errors, handleChange, submit, setFieldError };
}
