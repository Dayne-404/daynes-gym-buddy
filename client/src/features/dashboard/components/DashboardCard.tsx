import Card from "@/app/layout/Card";
import type { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  innerText?: string;
  center?: boolean;
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({ title, innerText, center, className, children }: DashboardCardProps) => {
  return (
    <Card size="flex" className={className}>
      <p className="text-sm font-semibold">{title}</p>
      {innerText && <p className="text-md text-primary font-semibold mb-1">{innerText}</p>}
      <div className={center ? "flex justify-center" : ""}>{children}</div>
    </Card>
  );
};

export default DashboardCard;
