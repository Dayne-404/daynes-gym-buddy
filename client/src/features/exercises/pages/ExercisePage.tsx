import { useParams } from "react-router-dom";
import { PageContainer, Stack } from "@/app/layout";
import { PageHeader } from "@/components";
import { useExercise } from "../hooks/useExercise";
import ContentContainer from "../components/ContentContainer";

const ExercisePage = () => {
  const { id } = useParams<{ id: string }>();
  const { exercise, loading } = useExercise(Number(id));

  if (loading || !exercise) return null;

  return (
    <PageContainer>
      <PageHeader simple />
      <Stack gap={7}>
        <ContentContainer />
        <div>
          <h3 className="font-semibold">{exercise.name}</h3>
          <p className="text-gray-500">
            Created By: {exercise.user?.firstName} {exercise.user?.lastName}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{exercise.description || "No description provided."}</p>
        </div>
      </Stack>
    </PageContainer>
  );
};

export default ExercisePage;
