import { Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import CalendarIcon from "@/assets/calendar.svg";

const ProgressPhoto = () => {
  return (
    <Card variant="gradient-brand" size="flex">
      <Stack direction="row">
        <p className="text-medium">
          Track your progress each month with a{" "}
          <span className="font-semibold text">Photo</span>
        </p>
        <img src={CalendarIcon} alt="calendar" />
      </Stack>
    </Card>
  );
};

export default ProgressPhoto;
