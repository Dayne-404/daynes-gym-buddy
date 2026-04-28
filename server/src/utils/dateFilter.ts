/**
 * Builds a Prisma date range filter from query parameters.
 *
 * Example:
 *   /weights?from=2026-01-01&to=2026-01-31
 *
 * Returns:
 *   { gte: Date, lte: Date }
 */

const parseValidDate = (value: unknown): Date | undefined => {
  if (!value) return undefined;

  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export const buildDateFilter = (
  query: Record<string, unknown>,
  fromKey = "from",
  toKey = "to",
) => {
  const from = parseValidDate(query[fromKey]);
  const to = parseValidDate(query[toKey]);

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
