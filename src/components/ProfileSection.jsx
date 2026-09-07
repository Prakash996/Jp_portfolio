import ProfileCard from "@/components/ui/profileCard";

export default function ProfileSection({
  personDetails,
  stats,
}) {
  return (
    <div className="flex h-full flex-col lg:col-span-4">
      <ProfileCard
        personDetails={personDetails}
        stats={stats}
      />
    </div>
  );
}
