export const localDateString = (date = new Date()): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const formatShortDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};
