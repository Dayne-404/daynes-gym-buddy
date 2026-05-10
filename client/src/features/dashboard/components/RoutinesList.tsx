import { Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import weightLiftingIcon from "@/assets/weight_lifting.svg";
import abWorkoutIcon from "@/assets/ab_workout.svg";
import jumpRopeIcon from "@/assets/jump_rope.svg";
import type { Routine } from "../types/dashboard.types";
import RoutineCard from "./RoutineCard";

const iconMap: Record<string, string> = {
  weight_lifting: weightLiftingIcon,
  ab_workout: abWorkoutIcon,
  jump_rope: jumpRopeIcon,
};

interface RoutinesListProps {
  routines: Routine[];
}

const RoutinesList = ({ routines }: RoutinesListProps) => {
  return (
    <Card size="flex">
      <Stack gap={2}>
        <p className="text-sm font-semibold">Routines</p>
        {routines.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">
            No routines yet. Create one to get started.
          </p>
        ) : (
          routines.map((routine) => {
            const iconSrc = (routine.icon && iconMap[routine.icon]) ?? weightLiftingIcon;
            return (
              <RoutineCard
                key={routine.id}
                name={routine.name}
                exerciseAmount={routine._count.routineExercises}
                icon={<img src={iconSrc} alt={routine.icon ?? "weight_lifting"} />}
              />
            );
          })
        )}
      </Stack>
    </Card>
  );
};

export default RoutinesList;
