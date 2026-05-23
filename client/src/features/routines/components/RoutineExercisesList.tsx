import JumpRope from "@/assets/jump-rope.svg";
import { Stack } from "@/app/layout";
import type { RoutineExercise } from "../types/routine.types";
import RoutineExerciseCard from "./RoutineExerciseCard";

type Props = {
  exercises: RoutineExercise[];
};

const RoutineExercisesList = ({ exercises }: Props) => (
  <div>
    <h3 className="font-bold pb-5">Exercises</h3>
    <Stack gap={2}>
      {exercises.map((re) => (
        <RoutineExerciseCard
          key={re.id}
          exerciseId={re.exerciseId}
          name={re.exercise.name}
          Icon={
            <img
              className="w-16 h-16 bg-primary object-contain overflow-hidden rounded-lg"
              src={JumpRope}
              alt={re.exercise.name}
            />
          }
          sets={re.targetSets}
          reps={re.targetReps}
          weight={re.targetWeightLb}
        />
      ))}
    </Stack>
  </div>
);

export default RoutineExercisesList;
