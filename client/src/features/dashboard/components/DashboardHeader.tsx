import { Stack } from "@/app/layout";
import { IconButton } from "@/components";
import { Notification } from "react-iconly";

interface DashboardHeaderProps {
  userFirstName: string;
}

const DashboardHeader = ({ userFirstName }: DashboardHeaderProps) => {
  return (
    <Stack direction="row" centerY spaceBetween>
      <Stack gap={2}>
        <p className="text-gray-500 text-xs">Welcome Back</p>
        <h4 className="font-bold">{userFirstName}</h4>
      </Stack>
      <IconButton icon={<Notification size="small" />} />
    </Stack>
  );
};

export default DashboardHeader;
