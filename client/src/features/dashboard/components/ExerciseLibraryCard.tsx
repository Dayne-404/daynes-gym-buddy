import { Card, Stack } from "@/app/layout";
import { NavWrapper } from "@/components";
import { ArrowRight } from "react-iconly";

type ExerciseLibraryCardProps = {
  totalExercises: number;
};

const ExerciseLibraryCard = ({ totalExercises }: ExerciseLibraryCardProps) => (
  <NavWrapper to="/exercises">
    <Card size="flex">
      <Stack direction="row" spaceBetween>
        <p className="text-sm font-semibold pb-2">Exercise Library</p>
        <ArrowRight size="small" />
      </Stack>
      <p className="text-center">Explore our collection of exercises</p>
      <p className="text-center">
        Users have created <span className="font-bold">{totalExercises}</span> exercises
      </p>
    </Card>
  </NavWrapper>
);

export default ExerciseLibraryCard;
