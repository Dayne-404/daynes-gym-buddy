import { useState } from "react";
import { Card, Stack } from "@/app/layout";
import { IconButton, Input } from "@/components";
import { CloseSquare, Delete, Edit, TickSquare } from "react-iconly";
import exerciseIcon from "@/assets/exercise.svg";
import type { RoutineExerciseFormValues } from "../types/routineForm.types";

interface Props {
  exercise: RoutineExerciseFormValues;
  onEdit: (updated: RoutineExerciseFormValues) => void;
  onRemove: () => void;
  onDragHandlePointerDown?: (e: React.PointerEvent) => void;
}

const GripHandle = ({ onPointerDown }: { onPointerDown: (e: React.PointerEvent) => void }) => (
  <span
    onPointerDown={onPointerDown}
    className="touch-none cursor-grab active:cursor-grabbing text-gray-500 pr-1 shrink-0"
  >
    <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor">
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="9" cy="3" r="1.5" />
      <circle cx="3" cy="9" r="1.5" />
      <circle cx="9" cy="9" r="1.5" />
      <circle cx="3" cy="15" r="1.5" />
      <circle cx="9" cy="15" r="1.5" />
    </svg>
  </span>
);

const ExerciseEntryCard = ({ exercise, onEdit, onRemove, onDragHandlePointerDown }: Props) => {
  const [editing, setEditing] = useState(false);
  const [sets, setSets] = useState(String(exercise.targetSets));
  const [reps, setReps] = useState(String(exercise.targetReps));
  const [weight, setWeight] = useState(
    exercise.targetWeightLb !== null ? String(exercise.targetWeightLb) : "",
  );

  const save = () => {
    const parsedSets = parseInt(sets, 10);
    const parsedReps = parseInt(reps, 10);
    if (!parsedSets || !parsedReps) return;
    onEdit({ ...exercise, targetSets: parsedSets, targetReps: parsedReps, targetWeightLb: weight ? parseFloat(weight) : null });
    setEditing(false);
  };

  const cancel = () => {
    setSets(String(exercise.targetSets));
    setReps(String(exercise.targetReps));
    setWeight(exercise.targetWeightLb !== null ? String(exercise.targetWeightLb) : "");
    setEditing(false);
  };

  return (
    <Card size="flex">
      <Stack gap={2}>
        <Stack direction="row" spaceBetween centerY>
          <Stack direction="row" gap={2} centerY>
            {onDragHandlePointerDown && <GripHandle onPointerDown={onDragHandlePointerDown} />}
            <img src={exerciseIcon} alt="exercise" />
            <div>
              <h4 className="font-bold text-sm">{exercise.exercise.name}</h4>
              <p className="text-sm text-gray-400">{exercise.exercise.muscleGroup}</p>
              {!editing && (
                <p className="text-xs text-gray-500">
                  {exercise.targetSets} sets | {exercise.targetReps} reps
                  {exercise.targetWeightLb !== null ? ` | ${exercise.targetWeightLb} lbs` : ""}
                </p>
              )}
            </div>
          </Stack>
          <Stack direction="row" gap={1} centerY>
            {editing ? (
              <>
                <IconButton icon={<TickSquare set="light" primaryColor="currentColor" size={18} />} onClick={save} variant="ghost" size="sm" />
                <IconButton icon={<CloseSquare set="light" primaryColor="currentColor" size={18} />} onClick={cancel} variant="ghost" size="sm" />
              </>
            ) : (
              <>
                <IconButton icon={<Edit set="light" primaryColor="currentColor" size={18} />} onClick={() => setEditing(true)} variant="ghost" size="sm" />
                <IconButton icon={<Delete set="light" primaryColor="currentColor" size={18} />} onClick={onRemove} variant="ghost" size="sm" />
              </>
            )}
          </Stack>
        </Stack>
        {editing && (
          <Stack gap={1}>
            <Input label="Sets *" name="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            <Input label="Reps *" name="reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <Input label="Weight (lbs)" name="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default ExerciseEntryCard;
