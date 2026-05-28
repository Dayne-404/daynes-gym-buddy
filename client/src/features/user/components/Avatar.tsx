import type { User } from "@/features/user/types/user.types";

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar = ({ user, size = 40 }: AvatarProps) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: user.avatarColor,
        fontSize: size * 0.4,
      }}
      className="rounded-full flex items-center justify-center font-semibold text-white select-none"
    >
      {initials}
    </div>
  );
};

export default Avatar;
