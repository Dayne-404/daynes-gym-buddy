import { useParams } from "react-router-dom";
import { Stack } from "@/app/layout";
import JumpRope from "@/assets/jump-rope.svg";
import { PageHeader } from "@/components";
import { useRoutine } from "../hooks/useRoutine";
import RoutineExerciseCard from "../components/RoutineExerciseCard";

const RoutinePage = () => {
  const { id } = useParams<{ id: string }>();
  const { routine, loading } = useRoutine(Number(id));

  if (loading || !routine) return null;

  return (
    <div className="min-h-screen bg-gradient-brand flex flex-col">
      <div className="pt-10 px-8">
        <PageHeader noPadding />
        <img src={JumpRope} alt="Jump Rope" className="w-full h-auto -mb-40" />
      </div>
      <div className="bg-primary-foreground rounded-t-4xl flex-1 pt-10 px-8">
        <Stack gap={4}>
          <div>
            <h3 className="font-bold">{routine.name}</h3>
            <p className="text-gray-100 pb-2">
              {routine.routineExercises.length} Exercises |{" "}
              {routine.routineExercises.length * 8}mins
            </p>
          </div>
          {routine.description && (
            <div>
              <h3 className="font-bold">Description</h3>
              <p>{routine.description}</p>
            </div>
          )}
          <div>
            <h3 className="font-bold pb-5">Exercises</h3>
            <Stack gap={2}>
              {routine.routineExercises.map((re) => (
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
        </Stack>
      </div>
    </div>
  );
};

export default RoutinePage;
