import { Card } from "@/app/layout";

interface SettingsCardProps {
  Body: string;
  Footer: string;
}

const SettingsCard = ({ Body, Footer }: SettingsCardProps) => {
  return (
    <Card size="flex">
      <p className="text-center font-medium text-sm text-primary">{Body}</p>
      <p className="text-center text-xs text-gray-500">{Footer}</p>
    </Card>
  );
};

export default SettingsCard;
