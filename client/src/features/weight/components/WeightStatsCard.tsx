import { Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import type { Weight } from "../types/weight.types";
import { formatShortDate } from "@/utils/date";

interface WeightStatsCardProps {
  todayEntry: Weight | null;
  previousEntry: Weight | null;
  goalWeightLb: number | null;
}

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #c58bf2 0%, #eea4ce 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const WeightStatsCard = ({ todayEntry, previousEntry, goalWeightLb }: WeightStatsCardProps) => {
  const mostRecentWeight = todayEntry?.weightLb ?? previousEntry?.weightLb ?? null;
  const goalDistance =
    goalWeightLb != null && mostRecentWeight != null
      ? +(mostRecentWeight - goalWeightLb).toFixed(1)
      : null;

  const delta =
    todayEntry && previousEntry
      ? +(todayEntry.weightLb - previousEntry.weightLb).toFixed(1)
      : null;

  return (
    <Card size="flex">
      <Stack direction="row" spaceBetween centerY>
        {todayEntry && (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Today
            </span>
            <span className="text-2xl font-bold" style={gradientStyle}>
              {todayEntry.weightLb}
              <span className="text-sm font-medium ml-1">lb</span>
            </span>
            {delta !== null && (
              <span
                className="text-xs font-semibold"
                style={{ color: delta < 0 ? "#92a3fd" : delta > 0 ? "#eea4ce" : "#ada4a5" }}
              >
                {delta === 0 ? "—" : `${delta > 0 ? "+" : ""}${delta} lb from last`}
              </span>
            )}
          </div>
        )}

        {previousEntry && (
          <div className={`flex flex-col gap-0.5 ${todayEntry ? "items-end" : ""}`}>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Last logged
            </span>
            <span className="text-2xl font-bold" style={todayEntry ? {} : gradientStyle}>
              {previousEntry.weightLb}
              <span className="text-sm font-medium ml-1 text-gray-400">lb</span>
            </span>
            <span className="text-xs text-gray-400">
              {formatShortDate(previousEntry.date)}
              {goalDistance !== null && (
                <span className="ml-2 font-semibold" style={{ color: "#ada4a5" }}>
                  {goalDistance === 0 ? "At goal!" : `${Math.abs(goalDistance)} lb to goal`}
                </span>
              )}
            </span>
          </div>
        )}

        {todayEntry && !previousEntry && goalDistance !== null && (
          <span className="text-xs font-semibold" style={{ color: "#ada4a5" }}>
            {goalDistance === 0 ? "At goal!" : `${Math.abs(goalDistance)} lb to goal`}
          </span>
        )}
      </Stack>
    </Card>
  );
};

export default WeightStatsCard;
