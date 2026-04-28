export const buildDateFilter = (
  query: any,
  fromKey = "from",
  toKey = "to"
) => {
  const from = query[fromKey];
  const to = query[toKey];

  if (!from && !to) return undefined;

  const filter: { gte?: Date; lte?: Date } = {};

  if (from) filter.gte = new Date(from);

  if (to) {
    const endOfDay = new Date(to);
    endOfDay.setHours(23, 59, 59, 999);
    filter.lte = endOfDay;
  }

  return filter;
};
