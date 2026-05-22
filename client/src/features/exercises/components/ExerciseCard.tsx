import { Card, Stack } from "@/app/layout";
import type { ReactNode } from "react";
import exerciseIcon from "@/assets/exercise.svg";

interface ExerciseCardProps {
    name: string;
    muscleGroup: string;
    icon?: ReactNode;
    createdBy?: string;
    onClick?: () => void;
}

const ExerciseCard = ({ name, muscleGroup, icon, createdBy, onClick }: ExerciseCardProps) => {
  return (
    <Card className="h-full w-full" onClick={onClick}>
        <Stack gap={2} direction="row" centerY>
            {icon ?? <img src={exerciseIcon} alt="exercise" />}
            <Stack gap={0}>
                <h3 className="font-bold text-sm">{name}</h3>
                <p className="text-sm">{muscleGroup}</p>
                {createdBy && (
                    <p className="text-xs text-gray-500">Created by {createdBy}</p>
                )}
            </Stack>
        </Stack>
    </Card>
  );
};

export default ExerciseCard;