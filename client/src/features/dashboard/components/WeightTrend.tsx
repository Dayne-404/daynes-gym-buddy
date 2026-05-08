interface WeightTrendProps {
  current: number;
  previous?: number;
  unit?: string;
}

const WeightTrend = ({ current, previous, unit = "lb" }: WeightTrendProps) => {
  const delta = previous !== undefined ? +(current - previous).toFixed(1) : null;
  const isDown = delta !== null && delta < 0;
  const isUp = delta !== null && delta > 0;

  return (
    <div className="flex flex-col items-center justify-center gap-1 py-1">
      <span
        className="text-h3 font-bold"
        style={{
          background: "linear-gradient(135deg, #c58bf2 0%, #eea4ce 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {current}
        <span className="text-small font-medium ml-1">{unit}</span>
      </span>

      {delta !== null && (
        <div
          className="flex items-center gap-0.5 text-xs font-semibold"
          style={{ color: isDown ? "#92a3fd" : isUp ? "#eea4ce" : "#ada4a5" }}
        >
          {isDown && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L1.5 3h9L6 9z" />
            </svg>
          )}
          {isUp && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 3l4.5 6h-9L6 3z" />
            </svg>
          )}
          {delta === 0 ? "—" : `${isUp ? "+" : ""}${delta} ${unit}`}
          <span className="text-gray-500 font-normal ml-0.5">today</span>
        </div>
      )}
    </div>
  );
};

export default WeightTrend;
