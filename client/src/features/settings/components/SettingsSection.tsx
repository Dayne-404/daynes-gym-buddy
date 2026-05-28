import { Card, Stack } from "@/app/layout";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import type { IconProps } from "react-iconly";
import { ChevronRight } from "react-iconly";

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

interface SettingsSectionProps {
  title: string;
  booleanSettings?: BooleanSetting[];
  fullPageSettings?: FullPageSetting[];
}

const SettingsSection = ({
  title,
  booleanSettings,
  fullPageSettings,
}: SettingsSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card size="flex">
      <h3 className="text-medium font-semibold">{title}</h3>
      <Stack gap={3} className="p-2 pt-4">
        {booleanSettings?.map((setting) => {
          const Icon = setting.icon;
          return (
            <Stack key={setting.title} direction="row" spaceBetween centerY>
              <Stack key={setting.title + "1"} direction="row" centerY gap={2}>
                <span className="text-primary">
                  <Icon size={20} />
                </span>
                <p className="text-xs text-gray-100">{setting.title}</p>
              </Stack>
              <input
                type="checkbox"
                checked={setting.value}
                onChange={(e) => setting.onChange(e.target.checked)}
              />
            </Stack>
          );
        })}
        {fullPageSettings?.map((setting) => {
          const Icon = setting.icon;
          return (
            <button
              key={setting.title}
              onClick={() => navigate(setting.to)}
              className="w-full"
            >
              <Stack key={setting.title} direction="row" spaceBetween centerY>
                <Stack
                  key={setting.title + "1"}
                  direction="row"
                  centerY
                  gap={2}
                >
                  <span className="text-primary">
                    <Icon size={20} />
                  </span>
                  <p className="text-xs text-gray-100">{setting.title}</p>
                </Stack>
                <span className="text-gray-100">
                  <ChevronRight set="light" size={20} />
                </span>
              </Stack>
            </button>
          );
        })}
      </Stack>
    </Card>
  );
};

export default SettingsSection;
