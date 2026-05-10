import { useState } from "react";
import { Body, PageContainer } from "@/app/layout";
import { Line } from "@/components";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/features/user";
import {
  CalendarStrip,
  CalorieLogInput,
  CalorieLogList,
  CalorieProgressBar,
} from "../components";
import { useCalories } from "../hooks";

const today = new Date().toISOString().split("T")[0];

const formatTime = (isoString: string) =>
  new Date(isoString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

const CaloriesPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(today);
  const { entries, totalCalories, logCalorie, deleteCalorie } = useCalories(selectedDate);
  const [value, setValue] = useState("");

  const handleLog = async () => {
    const calories = parseInt(value, 10);
    if (!calories || calories <= 0) return;
    await logCalorie(calories);
    setValue("");
  };

  if (!user) return null;

  return (
    <PageContainer>
      <PageHeader text="Calories" />
      <CalendarStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
      <Body>
        <CalorieProgressBar
          current={totalCalories}
          goal={user.dailyCalorieGoal ?? 2000}
        />
        <Line />
        <CalorieLogInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onLog={handleLog}
        />
        <CalorieLogList
          entries={entries.map((e) => ({
            id: e.id,
            calories: e.calories,
            time: formatTime(e.createdAt),
          }))}
          onDelete={deleteCalorie}
        />
      </Body>
    </PageContainer>
  );
};

export default CaloriesPage;
