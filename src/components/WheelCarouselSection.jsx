"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import BorderBottomLine from "@/components/ui/BorderBottomLine";
import WheelCarousel from "@/components/ui/WheelCarousel";
import skills from "@/data/skills.json";

export default function WheelCarouselDemo() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <section id="wheel-carousel" className="h-auto w-full bg-transparent">
      <WheelCarousel onSelectionChange={setSelectedSkill} />
      <div
        aria-live="polite"
        className="relative z-20 mt-10 flex w-full items-center justify-center px-5 sm:mt-9"
      >
        <Badge
          text={
            selectedSkill?.note ||
            selectedSkill?.type ||
            selectedSkill?.category ||
            selectedSkill?.name
          }
          className="max-w-auto text-center text-amber-50! sm:text-[8px] md:text-[16px]"
        />
      </div>
      <BorderBottomLine className="mt-10 sm:mt-12">
        <span>SYS // TECHNOLOGY_STACK</span>
        <span className="text-emerald-400/40">36 SKILLS</span>
      </BorderBottomLine>
    </section>
  );
}
