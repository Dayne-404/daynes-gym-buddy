import { PageContainer } from "../layout";

const AuthInitializingPage = () => {
  return (
    <PageContainer variant="centered">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-gray-500 text-medium">Loading...</p>
      </div>
    </PageContainer>
  );
};

export default AuthInitializingPage;
