import { useState } from "react";
import { Stack } from "@/app/layout";
import { Button, IconButton, Input, Pagination } from "@/components";
import { ChevronLeft, CloseSquare, Search } from "react-iconly";
import { useExercises } from "@/features/exercises";
import ExerciseCard from "@/features/exercises/components/ExerciseCard";
import type { Exercise } from "@/features/exercises";
import type { RoutineExerciseFormValues } from "../types/routineForm.types";

type Step = "pick" | "configure";

interface ExercisePickerProps {
  onAdd: (exercise: RoutineExerciseFormValues) => void;
  onClose: () => void;
}

const ExercisePicker = ({ onAdd, onClose }: ExercisePickerProps) => {
  const [step, setStep] = useState<Step>("pick");
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("");

  const { exercises, loading, search, setSearch, page, setPage, totalPages } =
    useExercises(6);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelected(exercise);
    setStep("configure");
  };

  const handleAdd = () => {
    if (!selected) return;
    const parsedSets = parseInt(sets, 10);
    const parsedReps = parseInt(reps, 10);
    if (!parsedSets || !parsedReps) return;
    onAdd({
      targetSets: parsedSets,
      targetReps: parsedReps,
      targetWeightLb: weight ? parseFloat(weight) : null,
      exercise: { id: selected.id, name: selected.name, muscleGroup: selected.muscleGroup },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-between px-4 pt-8 pb-4">
        {step === "configure" ? (
          <IconButton
            icon={<ChevronLeft set="light" primaryColor="currentColor" />}
            onClick={() => setStep("pick")}
            variant="ghost"
          />
        ) : (
          <div className="w-10" />
        )}
        <h2 className="font-bold text-base">
          {step === "pick" ? "Pick Exercise" : `Add ${selected?.name}`}
        </h2>
        <IconButton
          icon={<CloseSquare set="light" primaryColor="currentColor" />}
          onClick={onClose}
          variant="ghost"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {step === "pick" ? (
          <Stack gap={2}>
            <Input
              name="search"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
            <Stack gap={2}>
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  name={exercise.name}
                  muscleGroup={exercise.muscleGroup}
                  createdBy={
                    exercise.user
                      ? `${exercise.user.firstName} ${exercise.user.lastName}`
                      : undefined
                  }
                  onClick={() => handleSelectExercise(exercise)}
                />
              ))}
              {!loading && exercises.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  {search ? "No exercises match your search." : "No exercises yet."}
                </p>
              )}
            </Stack>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
            />
          </Stack>
        ) : (
          <Stack gap={2}>
            <Input
              name="sets"
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <Input
              name="reps"
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <Input
              name="weight"
              type="number"
              placeholder="Target weight lbs (optional)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button text="Add Exercise" onClick={handleAdd} />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default ExercisePicker;
