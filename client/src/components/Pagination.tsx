import { Stack } from "@/app/layout";
import Button from "./Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Stack direction="row" spaceBetween className="mt-auto pt-2">
      <Button
        text="Previous"
        variant="foreground-gradient"
        size="sm"
        onClick={onPrev}
        disabled={page <= 1}
      />
      <p className="text-xs text-gray-400 self-center">{page} / {totalPages}</p>
      <Button
        text="Next"
        variant="foreground-gradient"
        size="sm"
        onClick={onNext}
        disabled={page >= totalPages}
      />
    </Stack>
  );
};

export default Pagination;
