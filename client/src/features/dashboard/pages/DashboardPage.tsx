import { Body, PageContainer, Stack } from "@/app/layout";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import CalorieRing from "../components/CalorieRing";
import WeightTrend from "../components/WeightTrend";
import ProgressPhoto from "../components/ProgressPhoto";

const DashboardPage = () => {
  return (
    <PageContainer>
      <Body>
        <DashboardHeader userFirstName="Dayne" />
        <Stack gap={4} className="px-2">
          <Stack direction="row" gap={4}>
            <DashboardCard title="Calories" center>
              <CalorieRing current={0} goal={2000} />
            </DashboardCard>
            <DashboardCard title="Weight">
              <WeightTrend current={125} previous={125.5} />
            </DashboardCard>
          </Stack>
          <ProgressPhoto />
        </Stack>
      </Body>
    </PageContainer>
  );
};

export default DashboardPage;
