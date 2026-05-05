import type { ReactNode } from "react";

const PageContainer = ({children}: {children: ReactNode}) => {
  return (
    <div className="page min-h-screen">
      {children}
    </div>
  );
};

export default PageContainer;