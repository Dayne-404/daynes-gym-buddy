import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { Weight } from "../types/weight.types";

interface WeightGraphProps {
  entries: Weight[];
  goalWeightLb: number | null;
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString([], {
    month: "numeric",
    day: "numeric",
  });
};

const WeightGraph = ({ entries, goalWeightLb }: WeightGraphProps) => {
  const data = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((e) => ({ date: formatDate(e.date), weight: e.weightLb }));

  if (data.length < 2) return null;

  const weights = data.map((d) => d.weight);
  const startWeight = data[0].weight;
  const actualMin = Math.min(...weights);

  const max = startWeight;
  const min = goalWeightLb != null
    ? Math.min(goalWeightLb, actualMin)
    : Math.floor(actualMin) - 2;

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ada4a5" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#ada4a5" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          angle={-35}
          textAnchor="end"
          dy={4}
        />
        <YAxis
          domain={[min, max]}
          tick={{ fontSize: 10, fill: "#ada4a5" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1d1d1d",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "#ada4a5" }}
          itemStyle={{ color: "#c58bf2" }}
          formatter={(value) => [`${value} lb`, "Weight"]}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="url(#weightGradient)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#c58bf2" }}
        />
        <defs>
          <linearGradient id="weightGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c58bf2" />
            <stop offset="100%" stopColor="#eea4ce" />
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightGraph;
