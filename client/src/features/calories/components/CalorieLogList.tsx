import React from "react";
import { Box, Stack } from "@/app/layout";
import Card from "@/app/layout/Card";
import { Line } from "@/components";
import { Delete } from "react-iconly";

export interface CalorieEntry {
  id: number;
  calories: number;
  time: string;
}

interface CalorieLogListProps {
  entries: CalorieEntry[];
  onDelete: (id: number) => void;
}

const CalorieLogList = ({ entries, onDelete }: CalorieLogListProps) => {
  return (
    <Box>
      <h4 className="font-semibold text-center pb-2">Today's Entries</h4>
      <Card size="flex">
        {entries.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-2">
            Add your first entry for today
          </p>
        ) : (
          <Stack gap={0}>
            {entries.map((entry, i) => (
              <React.Fragment key={entry.id}>
                <Stack direction="row" className="w-full p-2" spaceBetween>
                  <p className="text-lg font-semibold">{entry.calories} kcal</p>
                  <Stack direction="row" gap={3} center>
                    <p className="text-lg text-gray-500 font-light">{entry.time}</p>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Delete set="light" size={18} />
                    </button>
                  </Stack>
                </Stack>
                {i < entries.length - 1 && <Line />}
              </React.Fragment>
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default CalorieLogList;
