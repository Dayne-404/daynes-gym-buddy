import Card from "@/app/layout/Card";
import { Pagination } from "@/components";
import type { Routine } from "../types/routine.types";
import RoutinesListItems from "./RoutinesListItems";

interface RoutinesListCardProps {
  routines: Routine[];
  loading: boolean;
  search: string;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const RoutinesListCard = ({
  routines,
  loading,
  search,
  page,
  totalPages,
  onPrev,
  onNext,
}: RoutinesListCardProps) => {
  return (
    <Card size="flex" className="flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {routines.length > 0 ? (
          <RoutinesListItems routines={routines} />
        ) : !loading ? (
          <p className="text-xs text-gray-400 text-center py-2">
            {search
              ? "No routines match your search."
              : "No routines yet. Create one to get started."}
          </p>
        ) : null}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
      />
    </Card>
  );
};

export default RoutinesListCard;
