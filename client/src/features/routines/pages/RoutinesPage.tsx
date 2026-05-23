import { PageContainer, Stack } from "@/app/layout";
import { Input, Line, PageHeader } from "@/components";
import { Plus, Search } from "react-iconly";
import { useRoutines } from "../hooks/useRoutines";
import RoutinesListCard from "../components/RoutinesListCard";

const RoutinesPage = () => {
  const {
    routines,
    overallTotal,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    loading,
  } = useRoutines();

  return (
    <PageContainer>
      <PageHeader text="Routines" icon={<Plus set="light" />} />
      <Stack gap={2} className="flex-1">
        <p className="text-xs text-gray-400 text-center">
          {overallTotal} {overallTotal === 1 ? "Routine" : "Routines"}
        </p>
        <Input
          name="search"
          placeholder="Search routines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
        <Line />
        <RoutinesListCard
          routines={routines}
          loading={loading}
          search={search}
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </Stack>
    </PageContainer>
  );
};

export default RoutinesPage;
