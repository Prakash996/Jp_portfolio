import personDetails from "@/data/personDetails.json";
import ProfileSection from "@/components/ProfileSection";
import IntroSection from "@/components/IntroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "./SkillsSection";
import TabsSection from "@/components/TabsSection"

export default function MainBody() {
  return (
    <main>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start mt-6 mb-6">
          <ProfileSection personDetails={personDetails} stats={personDetails.stats}/>
          <IntroSection personDetails={personDetails} />
        </div>
        <SkillsSection/>
        <TabsSection/>
        <ExperienceSection />
    </main>
  );
}
