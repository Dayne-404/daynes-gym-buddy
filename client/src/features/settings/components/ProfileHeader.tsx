import { Stack } from "@/app/layout";
import { Button } from "@/components";
import { Avatar, type User } from "@/features/user";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <Stack direction="row" className="w-full" centerY spaceBetween gap={7}>
      <Stack direction="row" gap={2} center>
        <Avatar size={45} user={user} />
        <div>
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-700">
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </Stack>
      <Button size="xsm" text="Edit" />
    </Stack>
  );
};

export default ProfileHeader;
