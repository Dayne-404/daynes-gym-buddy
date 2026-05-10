import { Stack } from "@/app/layout";
import { IconButton } from "@/components";
import { Notification, Setting } from "react-iconly";

interface DashboardHeaderProps {
  userFirstName?: string;
  userLastName?: string;
}

const DashboardHeader = ({
  userFirstName,
  userLastName,
}: DashboardHeaderProps) => {
  return (
    <Stack direction="row" centerY spaceBetween>
      <Stack gap={2}>
        <p className="text-gray-500 text-xs">Welcome Back</p>
        <h4 className="font-bold">
          {userFirstName} {userLastName}
        </h4>
      </Stack>
      <Stack direction="row" gap={2}>
        <IconButton icon={<Setting size="small" />} />
        <IconButton icon={<Notification size="small" />} />
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
