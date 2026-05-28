import { PageContainer, Stack } from "@/app/layout";
import ProfileHeader from "../components/ProfileHeader";
import PageHeader from "@/components/PageHeader";
import SettingsCard from "../components/SettingsCard";
import SettingsSection from "../components/SettingsSection";
import { useUser } from "@/features/user";
import { useAuth } from "@/features/auth";
import { Button } from "@/components";
import { buildSettingsSections } from "../config/settingsSections";

const SettingsPage = () => {
  const { user } = useUser();
  const { logout, loading } = useAuth();

  if (!user) return null;

  const sections = buildSettingsSections();

  return (
    <PageContainer>
      <PageHeader text="Settings" />
      <Stack>
        <ProfileHeader user={user} />
        <Stack direction="row">
          <SettingsCard
            Body={user.goalWeightLb?.toString() + " lb" || "N/A"}
            Footer="Goal Weight"
          />
          <SettingsCard
            Body={user.dailyCalorieGoal?.toString() + " kcal" || "N/A"}
            Footer="Daily Calories"
          />
          <SettingsCard Body="Coming Soon" Footer="Height" />
        </Stack>
        {sections.map((section) => (
          <SettingsSection key={section.title} {...section} />
        ))}
        <Button text="Logout" onClick={logout} disabled={loading} />
      </Stack>
    </PageContainer>
  );
};

export default SettingsPage;
