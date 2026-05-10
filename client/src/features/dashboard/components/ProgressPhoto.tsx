import { Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import CalendarIcon from "@/assets/calendar.svg";
import { Button } from "@/components";

const ProgressPhoto = () => {
  return (
    <Card variant="gradient-brand-opaque" size="flex">
      <Stack direction="row">
        <Stack direction="col" gap={2}>
          <p className="text-medium">
            Track your progress each month with a{" "}
            <span className="font-semibold text-primary">Photo</span>
          </p>
          <Button text="Learn More" size="sm" />
        </Stack>
        <img src={CalendarIcon} alt="calendar" />
      </Stack>
    </Card>
  );
};

export default ProgressPhoto;
