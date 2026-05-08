interface CalorieRingProps {
  current: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
}

const CalorieRing = ({
  current,
  goal,
  size = 80,
  strokeWidth = 8,
}: CalorieRingProps) => {
  const cx = size / 2;
  const outerR = cx - strokeWidth / 2;
  const circumference = 2 * Math.PI * outerR;
  const progress = Math.min(current / goal, 1);
  const offset = circumference * (1 - progress);

  const gap = 0;
  const separatorSW = 2;
  const separatorR = outerR - strokeWidth / 2 - gap;
  const innerR = separatorR - separatorSW / 2 - 1;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient
            id="ring-outer-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#C58BF2" />
            <stop offset="100%" stopColor="#B4C0FE" />
          </linearGradient>
          <linearGradient
            id="ring-inner-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#92a3fd" />
            <stop offset="100%" stopColor="#9dceff" />
          </linearGradient>
        </defs>

        {/* Outer track */}
        <circle
          cx={cx}
          cy={cx}
          r={outerR}
          fill="none"
          stroke="#F7F8F8"
          strokeWidth={strokeWidth}
        />

        {/* Outer progress arc */}
        <circle
          cx={cx}
          cy={cx}
          r={outerR}
          fill="none"
          stroke="url(#ring-outer-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />

        {/* Transparent separator ring */}
        <circle
          cx={cx}
          cy={cx}
          r={separatorR}
          fill="none"
          stroke="white"
          strokeWidth={separatorSW}
        />

        {/* Inner filled circle */}
        <circle cx={cx} cy={cx} r={innerR} fill="url(#ring-inner-gradient)" />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-white">{current}</span>
        <span className="text-caption text-white/70">/ {goal}</span>
      </div>
    </div>
  );
};

export default CalorieRing;
