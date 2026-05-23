import { Reorder } from "framer-motion";
import { Plus } from "react-iconly";
import { Stack } from "@/app/layout";
import type { ExerciseEntry, RoutineExerciseFormValues } from "../types/routineForm.types";
import SortableExerciseCard from "./SortableExerciseCard";

interface Props {
  exercises: ExerciseEntry[];
  onReorder: (exercises: ExerciseEntry[]) => void;
  onAdd: () => void;
  onEdit: (uid: string, updated: RoutineExerciseFormValues) => void;
  onRemove: (uid: string) => void;
  disabled?: boolean;
}

const RoutineExerciseList = ({ exercises, onReorder, onAdd, onEdit, onRemove, disabled = false }: Props) => (
  <Stack gap={2}>
    <Stack direction="row" spaceBetween centerY>
      <p className="text-sm font-semibold">Exercises</p>
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        className="flex items-center gap-1 text-sm text-primary disabled:opacity-50"
      >
        <Plus set="light" primaryColor="currentColor" size={16} />
        Add
      </button>
    </Stack>
    {exercises.length === 0 ? (
      <p className="text-xs text-gray-400 text-center py-2">No exercises added yet.</p>
    ) : (
      <Reorder.Group as="div" axis="y" values={exercises} onReorder={onReorder} className="flex flex-col gap-2">
        {exercises.map((entry) => (
          <SortableExerciseCard
            key={entry.uid}
            entry={entry}
            onEdit={(updated) => onEdit(entry.uid, updated)}
            onRemove={() => onRemove(entry.uid)}
          />
        ))}
      </Reorder.Group>
    )}
  </Stack>
);

export default RoutineExerciseList;
