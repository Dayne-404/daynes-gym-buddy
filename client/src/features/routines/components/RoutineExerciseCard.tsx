import { Stack } from "@/app/layout";
import { ChevronRightCircle } from "react-iconly";
import type { ReactNode } from "react";
import { NavWrapper } from "@/components";

interface RoutineExerciseCardProps {
  exerciseId: number;
  name: string;
  Icon?: ReactNode;
  sets?: number;
  reps?: number;
  weight?: number | null;
}

const RoutineExerciseCard = ({
  exerciseId,
  name,
  Icon,
  sets,
  reps,
  weight,
}: RoutineExerciseCardProps) => {
  return (
    <NavWrapper to={`/exercises/${exerciseId}`}>
      <Stack direction="row" spaceBetween centerY>
        <Stack direction="row" gap={4} centerY>
          {Icon}
          <div>
            <h4>{name}</h4>
            <p>
              {sets !== undefined && `${sets} sets`}
              {reps !== undefined && ` | ${reps} reps`}
              {weight !== undefined && weight !== null
                ? ` | ${weight} lbs`
                : null}
            </p>
          </div>
        </Stack>
        <span className="text-gray-500">
          <ChevronRightCircle set="light" />
        </span>
      </Stack>
    </NavWrapper>
  );
};

export default RoutineExerciseCard;
