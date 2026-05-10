import { Body, PageContainer, Stack } from "@/app/layout";
import { Line } from "@/components";
import { useUser } from "@/features/user";
import { DashboardHeader, ProgressPhoto, RoutinesList, StatsRow } from "../components";
import { useDashboardData } from "../hooks";

const DashboardPage = () => {
  const { user } = useUser();
  const { caloriesConsumed, currentWeight, previousWeight, routines, loading } =
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
          <RoutinesList routines={routines} />
        </Stack>
      </Body>
    </PageContainer>
  );
};

export default DashboardPage;
