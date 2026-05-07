import type { ReactNode } from "react";

type PageVariant = "default" | "centered";

interface PageContainerProps {
  children: ReactNode;
  variant?: PageVariant;
}

const variantStyles: Record<PageVariant, string> = {
  default: "pt-10 px-8 min-h-screen",
  centered: "px-8 min-h-screen flex items-center justify-center w-full",
};

const PageContainer = ({
  children,
  variant = "default",
}: PageContainerProps) => {
  return <div className={variantStyles[variant]}>{children}</div>;
};

export default PageContainer;
