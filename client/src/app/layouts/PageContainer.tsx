import type { ReactNode } from "react";

type PageVarient = "default" | "centered";

interface PageContainerProps {
  children: ReactNode;
  variant?: PageVarient;
}

const varientStyles: Record<PageVarient, string> = {
  default: "pt-10 px-8 min-h-screen",
  centered: "px-8 min-h-screen flex items-center justify-center w-full",
};

const PageContainer = ({
  children,
  variant = "default",
}: PageContainerProps) => {
  return <div className={varientStyles[variant]}>{children}</div>;
};

export default PageContainer;
