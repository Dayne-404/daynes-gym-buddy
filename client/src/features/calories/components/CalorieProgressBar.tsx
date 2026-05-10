interface CalorieProgressBarProps {
  current: number;
  goal: number;
}

const CalorieProgressBar = ({ current, goal }: CalorieProgressBarProps) => {
  const isOver = current > goal;
  const percent = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className={`text-2xl font-bold ${isOver ? "text-red-500" : ""}`}>
            {current}
          </span>
          <span className="text-sm text-gray-400 ml-1">/ {goal} kcal</span>
        </div>
        <span className={`text-sm ${isOver ? "text-red-500" : "text-gray-400"}`}>
          {isOver ? `${current - goal} over` : `${remaining} remaining`}
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: isOver
              ? "linear-gradient(90deg, #ef4444, #f87171)"
              : "linear-gradient(90deg, #C58BF2, #B4C0FE)",
          }}
        />
      </div>
    </div>
  );
};

export default CalorieProgressBar;
