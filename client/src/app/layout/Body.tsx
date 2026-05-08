import type { ReactNode } from "react";
import Stack from "./Stack";

interface BodyProps {
  children?: ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return (
    <Stack centerX gap={8} className="w-full pt-4">
      {children}
    </Stack>
  );
};

export default Body;
