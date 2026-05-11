import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface CalendarStripProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

interface DayButtonProps {
  date: string;
  isSelected: boolean;
  isToday: boolean;
  isFuture: boolean;
  selectedRef: React.RefObject<HTMLButtonElement | null>;
  onSelect: (date: string) => void;
}

const toDateString = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const now = new Date();
const today = toDateString(now);
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const generateDaysForMonth = (year: number, month: number): string[] => {
  const days: string[] = [];
  const isCurrentMonth = year === currentYear && month === currentMonth;

  const cursor = new Date(year, month, 1);
  const end = isCurrentMonth
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)
    : new Date(year, month + 1, 0);

  while (cursor <= end) {
    days.push(toDateString(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
};

const DayButton = memo(
  ({
    date,
    isSelected,
    isToday,
    isFuture,
    selectedRef,
    onSelect,
  }: DayButtonProps) => {
    const d = new Date(date + "T00:00:00");
    const handleClick = useCallback(() => onSelect(date), [date, onSelect]);

    return (
      <button
        ref={isSelected ? selectedRef : null}
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all duration-200 shrink-0"
        style={
          isSelected
            ? { background: "linear-gradient(180deg, #C58BF2, #B4C0FE)" }
            : undefined
        }
      >
        <span
          className={`text-xs ${isSelected ? "text-white/80" : isFuture ? "text-gray-300" : "text-gray-400"}`}
        >
          {isToday ? "Today" : d.toLocaleDateString([], { weekday: "short" })}
        </span>
        <span
          className={`text-sm font-bold mt-0.5 ${isSelected ? "text-white" : isFuture ? "text-gray-300" : ""}`}
        >
          {d.getDate()}
        </span>
      </button>
    );
  },
);

const CalendarStrip = ({ selectedDate, onSelect }: CalendarStripProps) => {
  const [view, setView] = useState({ year: currentYear, month: currentMonth });

  const selectedRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isCurrentMonth =
    view.year === currentYear && view.month === currentMonth;

  const days = useMemo(
    () => generateDaysForMonth(view.year, view.month),
    [view.year, view.month],
  );

  const monthLabel = useMemo(
    () =>
      new Date(view.year, view.month).toLocaleDateString([], {
        month: "long",
        year: "numeric",
      }),
    [view.year, view.month],
  );

  const prevMonth = useCallback(() => {
    setView(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );
  }, []);

  const nextMonth = useCallback(() => {
    setView(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      } else {
        scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      }
    });
  }, [selectedDate, view]);

  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between mb-2 px-1">
        <button
          onClick={prevMonth}
          className="p-1 text-gray-400 hover:text-foreground transition-colors"
        >
          ‹
        </button>
        <span className="text-sm font-semibold">{monthLabel}</span>
        <button
          onClick={nextMonth}
          disabled={isCurrentMonth}
          className="p-1 text-gray-400 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ›
        </button>
      </div>

      <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {days.map((date) => (
            <DayButton
              key={date}
              date={date}
              isSelected={date === selectedDate}
              isToday={date === today}
              isFuture={date > today}
              selectedRef={selectedRef}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarStrip;
