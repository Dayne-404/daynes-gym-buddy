import { type ReactNode } from "react";
import { Box, Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import { Button } from "@/components";

interface RoutineCardProps {
  name: string;
  exerciseAmount?: number;
  icon?: ReactNode;
}

const RoutineCard = ({ name, exerciseAmount, icon }: RoutineCardProps) => {
  return (
    <Card variant="gradient-brand-opaque" size="flex">
      <Stack direction="row" className="items-center justify-between h-full">
        <Stack gap={4}>
          <Box>
            <p className="text-medium font-semibold">{name}</p>
            {exerciseAmount !== undefined && (
              <p className="text-medium text-gray-500">{`${exerciseAmount} Exercises | ${exerciseAmount * 8}mins`}</p>
            )}
          </Box>
          <Button
            variant="foreground-gradient"
            shadow={false}
            text="View More"
            size="sm"
          />
        </Stack>
        <div className="relative flex items-center justify-center w-23 h-23 rounded-full bg-white shrink-0">
          {icon}
        </div>
      </Stack>
    </Card>
  );
};

export default RoutineCard;
