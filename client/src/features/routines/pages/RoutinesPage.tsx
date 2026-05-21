import { PageContainer, Stack } from "@/app/layout";
import { Button, Line, PageHeader } from "@/components";
import { useRoutines } from "../hooks/useRoutines";
import RoutinesListItems from "../components/RoutinesListItems";

const RoutinesPage = () => {
  const { routines } = useRoutines();

  return (
    <PageContainer>
      <PageHeader text="Routines" />
      <Stack gap={2}>
        {routines.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">
            No routines yet. Create one to get started.
          </p>
        ) : (
          <RoutinesListItems routines={routines} />
        )}
        <Line />
        <Button text="Create Routine" onClick={() => {}} />
      </Stack>
    </PageContainer>
  );
};

export default RoutinesPage;
