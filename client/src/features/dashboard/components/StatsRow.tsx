import { Stack } from "@/app/layout";
import DashboardCard from "./DashboardCard";
import CalorieRing from "./CalorieRing";
import WeightTrend from "./WeightTrend";

interface StatsRowProps {
  caloriesConsumed: number;
  calorieGoal: number;
  currentWeight: number | null;
  previousWeight: number | null;
}

const StatsRow = ({ caloriesConsumed, calorieGoal, currentWeight, previousWeight }: StatsRowProps) => {
  return (
    <Stack direction="row" gap={4} className="px-2">
      <DashboardCard title="Calories" to="/calories" center>
        <CalorieRing current={caloriesConsumed} goal={calorieGoal} />
      </DashboardCard>
      <DashboardCard title="Weight" to="/weights">
        {currentWeight === null ? (
          <p className="text-xs text-gray-400 text-center py-2">
            No weight entries yet.{"\n"}Add one to start tracking.
          </p>
        ) : (
          <WeightTrend current={currentWeight} previous={previousWeight ?? undefined} />
        )}
      </DashboardCard>
    </Stack>
  );
};

export default StatsRow;
