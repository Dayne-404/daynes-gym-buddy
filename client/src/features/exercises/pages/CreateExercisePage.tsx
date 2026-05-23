import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/app/layout";
import { PageHeader } from "@/components";
import { useForm } from "@/hooks/useForm";
import { createExercise } from "../services/createExercise";
import { validateExerciseForm } from "../services/validateExerciseForm";
import ExerciseForm from "../components/ExerciseForm";

const INITIAL_VALUES = {
  name: "",
  muscleGroup: "",
  description: "",
  mediaUrl: "",
};

const CreateExercisePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, submit, setFieldError } = useForm(
    INITIAL_VALUES,
    validateExerciseForm,
  );

  const handleSubmit = async () => {
    if (!submit()) return;
    setLoading(true);
    try {
      const exercise = await createExercise(values);
      navigate(`/exercises/${exercise.id}`, { replace: true });
    } catch (err) {
      setFieldError("name", (err as Error).message);
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader text="New Exercise" simple />
      <ExerciseForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create Exercise"
      />
    </PageContainer>
  );
};

export default CreateExercisePage;
