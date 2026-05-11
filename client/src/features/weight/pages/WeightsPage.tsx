import { useState } from "react";
import { Body, PageContainer } from "@/app/layout";
import { Line, LogInput, PageHeader } from "@/components";
import { useUser } from "@/features/user";
import { useWeights } from "../hooks/useWeights";
import WeightStatsCard from "../components/WeightStatsCard";
import WeightGraph from "../components/WeightGraph";
import { ProgressPhoto } from "@/features/dashboard";
import { localDateString } from "@/utils/date";

const today = localDateString();

const WeightsPage = () => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const { entries, todayEntry, previousEntry, logWeight } =
    useWeights();

  const handleLog = async () => {
    const weight = parseFloat(value);
    if (!weight || weight <= 0) return;
    await logWeight(weight, today);
    setValue("");
  };

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader text="Weights" />
      <Body>
        <WeightGraph
          entries={entries}
          goalWeightLb={user.goalWeightLb ?? null}
        />
        <ProgressPhoto />
        {(todayEntry || previousEntry) && (
          <WeightStatsCard
            todayEntry={todayEntry}
            previousEntry={previousEntry}
            goalWeightLb={user?.goalWeightLb ?? null}
          />
        )}
        <Line />
        <LogInput
          value={value}
          placeholder="Enter Weight (lb)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onLog={handleLog}
        />
      </Body>
    </PageContainer>
  );
};

export default WeightsPage;
