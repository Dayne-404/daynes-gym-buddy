import {
  Notification,
  Setting,
  User as Profile,
  Lock,
  InfoCircle,
} from "react-iconly";
import type { FC } from "react";
import type { IconProps } from "react-iconly";

interface BooleanSetting {
  icon: FC<IconProps>;
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

interface FullPageSetting {
  icon: FC<IconProps>;
  title: string;
  to: string;
}

export interface SettingsSectionConfig {
  title: string;
  booleanSettings?: BooleanSetting[];
  fullPageSettings?: FullPageSetting[];
}

export const buildSettingsSections = (): SettingsSectionConfig[] => [
  {
    title: "Account",
    fullPageSettings: [
      { icon: Profile, title: "Edit Profile", to: "/settings/profile" },
      { icon: Lock, title: "Change Password", to: "/settings/password" },
    ],
  },
  {
    title: "Notifications",
    booleanSettings: [
      {
        icon: Notification,
        title: "Push Notifications",
        value: true,
        onChange: () => {},
      },
    ],
    fullPageSettings: [
      {
        icon: Setting,
        title: "Notification Preferences",
        to: "/settings/notifications",
      },
    ],
  },
  {
    title: "About",
    fullPageSettings: [
      { icon: InfoCircle, title: "About App", to: "/settings/about" },
    ],
  },
];
