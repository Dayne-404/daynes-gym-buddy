import { PageContainer, Stack } from "@/app/layout";
import { PageHeader } from "@/components";
import { useUser } from "@/features/user";
import Notification from "../components/Notification";
import { Line } from "@/components";

const notifications: { title: string; time: string }[] = [
  { title: "You have a new message", time: "2 hours ago" },
  { title: "Your workout plan has been updated", time: "1 day ago" },
  { title: "New comment on your post", time: "3 days ago" },
];

const NotificationsPage = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader text="Notifications" />
      {notifications.length > 0 ? (
        <Stack gap={4}>
          {notifications.map((notification, index) => (
            <>
              <Notification
                key={index}
                user={user}
                title={notification.title}
                time={notification.time}
              />
              <Line />
            </>
          ))}
        </Stack>
      ) : (
        <p className="text-sm text-gray-100 text-center">
          You have no new notifications.
        </p>
      )}

      {/* Under construction message */}
      <p className="text-sm mt-5 text-gray-100 text-center">
        This page is under construction. More features will be added soon!
      </p>
    </PageContainer>
  );
};

export default NotificationsPage;
