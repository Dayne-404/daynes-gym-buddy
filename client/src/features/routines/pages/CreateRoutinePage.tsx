import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Stack } from "@/app/layout";
import { Button, Input, PageHeader, Textarea } from "@/components";
import { Document, Edit } from "react-iconly";
import { useForm } from "@/hooks/useForm";
import { validateRoutineForm } from "../services/validateRoutineForm";
import { createRoutine } from "../services/createRoutine";
import ExercisePicker from "../components/ExercisePicker";
import RoutineExerciseList from "../components/RoutineExerciseList";
import type { ExerciseEntry, RoutineExerciseFormValues } from "../types/routineForm.types";

const INITIAL_VALUES = { name: "", description: "" };

const CreateRoutinePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const { values, errors, handleChange, submit, setFieldError } =
    useForm(INITIAL_VALUES, validateRoutineForm);

  const addExercise = (exercise: RoutineExerciseFormValues) => {
    setExercises((prev) => [...prev, { uid: crypto.randomUUID(), values: exercise }]);
    setPickerOpen(false);
  };

  const editExercise = (uid: string, updated: RoutineExerciseFormValues) => {
    setExercises((prev) => prev.map((e) => (e.uid === uid ? { ...e, values: updated } : e)));
  };

  const removeExercise = (uid: string) => {
    setExercises((prev) => prev.filter((e) => e.uid !== uid));
  };

  const handleSubmit = async () => {
    if (!submit()) return;
    setLoading(true);
    try {
      const routine = await createRoutine(values, exercises.map((e) => e.values));
      navigate(`/routines/${routine.id}`, { replace: true });
    } catch (err) {
      setFieldError("name", (err as Error).message);
      setLoading(false);
    }
  };

  return (
    <>
      <PageContainer>
        <PageHeader text="New Routine" simple />
        <Stack gap={4}>
          <Stack gap={1}>
            <Input
              name="name"
              placeholder="Routine name"
              value={values.name}
              icon={Edit}
              errorText={errors.name}
              onChange={handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
              disabled={loading}
            />
            <Textarea
              name="description"
              placeholder="Description (optional)"
              value={values.description}
              icon={Document}
              errorText={errors.description}
              onChange={handleChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
              disabled={loading}
            />
          </Stack>
          <RoutineExerciseList
            exercises={exercises}
            onReorder={setExercises}
            onAdd={() => setPickerOpen(true)}
            onEdit={editExercise}
            onRemove={removeExercise}
            disabled={loading}
          />
          <Button text="Create Routine" onClick={handleSubmit} disabled={loading} />
        </Stack>
      </PageContainer>
      {pickerOpen && (
        <ExercisePicker onAdd={addExercise} onClose={() => setPickerOpen(false)} />
      )}
    </>
  );
};

export default CreateRoutinePage;
