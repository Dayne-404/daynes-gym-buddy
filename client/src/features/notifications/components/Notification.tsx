import { Stack } from "@/app/layout";
import type { User } from "@/features/user";
import { Avatar } from "@/features/user";

interface NotificationProps {
  user: User;
  title: string;
  time: string;
}

const Notification = ({ user, title, time }: NotificationProps) => {
  return (
    <Stack direction="row" gap={2} centerY>
      <Avatar size={45} user={user} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-100">{time}</p>
      </div>
    </Stack>
  );
};

export default Notification;
