import { PageContainer, Stack } from "@/app/layout";
import { Input, Line, PageHeader } from "@/components";
import { Plus, Search } from "react-iconly";
import { useExercises } from "../hooks/useExercises";
import ExerciseList from "../components/ExerciseList";

const ExercisesPage = () => {
  const {
    exercises,
    overallTotal,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    loading,
  } = useExercises(20);

  return (
    <PageContainer>
      <PageHeader text="Exercises" icon={<Plus set="light" />} />
      <Stack gap={2} className="flex-1 pb-10">
        <p className="text-xs text-gray-400 text-center">
          {overallTotal} {overallTotal === 1 ? "Exercise" : "Exercises"}
        </p>
        <Input
          name="search"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
        <Line />
        <ExerciseList
          exercises={exercises}
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

export default ExercisesPage;
