import { Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import { NavWrapper } from "@/components";
import type { ReactNode } from "react";
import { ArrowRight } from "react-iconly";

interface DashboardCardProps {
  title?: string;
  innerText?: string;
  center?: boolean;
  className?: string;
  children?: ReactNode;
  to?: string;
}

const DashboardCard = ({ title, innerText, center, className, children, to }: DashboardCardProps) => {
  const card = (
    <Card size="flex" className={className}>
      <Stack direction="row" spaceBetween>
        <p className="text-sm font-semibold">{title}</p>
        {to && <ArrowRight size="small" />}
      </Stack>
      {innerText && <p className="text-md text-primary font-semibold mb-1">{innerText}</p>}
      <div className={center ? "flex justify-center" : ""}>{children}</div>
    </Card>
  );

  return to ? <NavWrapper to={to} className="flex-1 flex flex-col">{card}</NavWrapper> : card;
};

export default DashboardCard;
