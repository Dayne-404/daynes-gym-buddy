import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/app/layout";
import { Button } from "@/components";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer variant="centered">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <div>
          <h2 className="text-h4 font-bold">Page Not Found</h2>
          <p className="text-gray-400 mt-1">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Button text="Go Home" size="md" onClick={() => navigate("/")} />
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;
