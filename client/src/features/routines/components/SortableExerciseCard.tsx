import { Reorder, useDragControls } from "framer-motion";
import type { ExerciseEntry, RoutineExerciseFormValues } from "../types/routineForm.types";
import ExerciseEntryCard from "./ExerciseEntryCard";

interface Props {
  entry: ExerciseEntry;
  onEdit: (updated: RoutineExerciseFormValues) => void;
  onRemove: () => void;
}

const SortableExerciseCard = ({ entry, onEdit, onRemove }: Props) => {
  const controls = useDragControls();
  return (
    <Reorder.Item as="div" value={entry} dragControls={controls} dragListener={false}>
      <ExerciseEntryCard
        exercise={entry.values}
        onEdit={onEdit}
        onRemove={onRemove}
        onDragHandlePointerDown={(e) => controls.start(e)}
      />
    </Reorder.Item>
  );
};

export default SortableExerciseCard;
