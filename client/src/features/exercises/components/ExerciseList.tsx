import { Card, Stack } from "@/app/layout";
import { Pagination } from "@/components";
import { useNavigate } from "react-router-dom";
import type { Exercise } from "../types/exercise.types";
import ExerciseCard from "./ExerciseCard";

interface ExerciseListProps {
  exercises: Exercise[];
  loading: boolean;
  search: string;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const ExerciseList = ({ exercises, loading, search, page, totalPages, onPrev, onNext }: ExerciseListProps) => {
  const navigate = useNavigate();

  return (
  <Card size="flex" className="flex flex-col overflow-hidden">
    <div className="flex-1 overflow-y-auto">
      <Stack gap={2}>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              muscleGroup={exercise.muscleGroup}
              createdBy={exercise.user ? `${exercise.user.firstName} ${exercise.user.lastName}` : undefined}
              onClick={() => navigate(`/exercises/${exercise.id}`)}
            />
          ))
        ) : !loading ? (
          <p className="text-xs text-gray-400 text-center py-2">
            {search ? "No exercises match your search." : "No exercises yet."}
          </p>
        ) : null}
      </Stack>
    </div>
      <Pagination page={page} totalPages={totalPages} onPrev={onPrev} onNext={onNext} />
  </Card>
  );
};

export default ExerciseList;
