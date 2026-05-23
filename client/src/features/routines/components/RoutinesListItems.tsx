import { Stack } from "@/app/layout";
import weightLiftingIcon from "@/assets/weight_lifting.svg";
import abWorkoutIcon from "@/assets/ab_workout.svg";
import jumpRopeIcon from "@/assets/jump_rope.svg";
import type { Routine } from "../types/routine.types";
import RoutineCard from "./RoutineCard";

const iconMap: Record<string, string> = {
  weight_lifting: weightLiftingIcon,
  ab_workout: abWorkoutIcon,
  jump_rope: jumpRopeIcon,
};

interface RoutinesListItemsProps {
  routines: Routine[];
}

const RoutinesListItems = ({ routines }: RoutinesListItemsProps) => {
  return (
    <Stack gap={2} className="pb-4">
      {routines.map((routine) => {
        const iconSrc =
          (routine.icon && iconMap[routine.icon]) ?? weightLiftingIcon;
        return (
          <RoutineCard
            key={routine.id}
            routineId={routine.id}
            navMode
            name={routine.name}
            exerciseAmount={routine._count.routineExercises}
            icon={<img src={iconSrc} alt={routine.icon ?? "weight_lifting"} />}
          />
        );
      })}
    </Stack>
  );
};

export default RoutinesListItems;
