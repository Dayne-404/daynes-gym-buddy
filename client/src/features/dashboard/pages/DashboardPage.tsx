import { Body, PageContainer, Stack } from "@/app/layout";
import { Line } from "@/components";
import { useUser } from "@/features/user";
import DashboardHeader from "../components/DashboardHeader";
import ExerciseLibraryCard from "../components/ExerciseLibraryCard";
import ProgressPhoto from "../components/ProgressPhoto";
import RoutinesList from "../components/RoutinesList";
import StatsRow from "../components/StatsRow";
import { useDashboardData } from "../hooks/useDashboardData";

const DashboardPage = () => {
  const { user } = useUser();
  const { caloriesConsumed, currentWeight, previousWeight, routines, totalExercises, loading } =
    useDashboardData();

  if (!user || loading) return null;

  return (
    <PageContainer>
      <Body>
        <DashboardHeader
          userFirstName={user.firstName}
          userLastName={user.lastName}
        />
        <Stack gap={4}>
          <StatsRow
            caloriesConsumed={caloriesConsumed}
            calorieGoal={user.dailyCalorieGoal ?? 2000}
            currentWeight={currentWeight}
            previousWeight={previousWeight}
          />
          <ProgressPhoto />
          <Line />
          <RoutinesList routines={routines} linkToPage />
          <Line />
          <ExerciseLibraryCard totalExercises={totalExercises} />
        </Stack>
      </Body>
    </PageContainer>
  );
};

export default DashboardPage;
