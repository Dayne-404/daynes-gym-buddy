import { useParams } from "react-router-dom";
import { Stack } from "@/app/layout";
import { useRoutine } from "../hooks/useRoutine";
import RoutineHero from "../components/RoutineHero";
import RoutineInfo from "../components/RoutineInfo";
import RoutineExercisesList from "../components/RoutineExercisesList";

const RoutinePage = () => {
  const { id } = useParams<{ id: string }>();
  const { routine, loading } = useRoutine(Number(id));

  if (loading || !routine) return null;

  return (
    <div className="min-h-screen bg-gradient-brand flex flex-col">
      <RoutineHero />
      <div className="bg-primary-foreground rounded-t-4xl flex-1 pt-10 px-8">
        <Stack gap={4}>
          <RoutineInfo routine={routine} />
          {routine.description && (
            <div>
              <h3 className="font-bold">Description</h3>
              <p>{routine.description}</p>
            </div>
          )}
          <RoutineExercisesList exercises={routine.routineExercises} />
        </Stack>
      </div>
    </div>
  );
};

export default RoutinePage;
