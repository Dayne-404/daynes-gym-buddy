import type { RoutineDetail } from "../types/routine.types";

type Props = {
  routine: RoutineDetail;
};

const RoutineInfo = ({ routine }: Props) => (
  <div>
    <h3 className="font-bold">{routine.name}</h3>
    <p className="text-gray-100 pb-2">
      {routine.routineExercises.length} Exercises |{" "}
      {routine.routineExercises.length * 8}mins
    </p>
  </div>
);

export default RoutineInfo;
