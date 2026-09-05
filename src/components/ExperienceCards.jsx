import { FiBriefcase } from "react-icons/fi";
import DiaTextReveal from "../views/DiaTextReveal";
import GradientBorder from "@/views/Gradient-border";

export default function ExperienceSection() {
    const experiences = [
      {
        title: "Software Engineer II",
        company: "HCLTech (HCLSoftware)",
        period: "May 2021 - Present",
        description:
          "Spearheaded 15+ UI refactoring initiatives across the Volt Iris platform, modernizing workspace layout structures, dynamic dropdown components, and interactive modal dialogs[cite: 1, 3]. Optimized desktop packaging, resolved client-side DOM performance lags, and stabilized 2,500+ E2E automated test cases across CI/CD release pipelines[cite: 1, 3].",
      },
      {
        title: "Software Engineer — Data Integration",
        company: "HCLTech",
        period: "May 2020 - May 2021",
        description:
          "Managed and optimized continuous data synchronization pipelines connecting semi-structured HCL Domino environments with relational SQL databases[cite: 1, 2, 3]. Configured SAP Remote Function Calls (RFC) and background LotusScript agents to ensure data integrity and operational stability[cite: 1, 2].",
      },
      {
        title: "Web Development Intern",
        company: "Ficuslot Innovation Pvt. Ltd.",
        period: "June 2019 - Oct 2019",
        description:
          "Designed and implemented responsive, single-page UI layouts, interactive search components, and client-facing web forms using HTML5, CSS3, JavaScript, and Bootstrap[cite: 1, 2, 3]. Resolved cross-browser visual defects using developer tools[cite: 1, 2, 3].",
      },
    ];
      
    return (
        <section id="experience" className="w-full min-w-0">
            {/* Heading */}
            <div className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <FiBriefcase
                size={20}
                className="shrink-0 text-zinc-400"
                />

                <h3>Experience</h3>
            </div>

            {/* Experience cards */}
            <div className="flex w-full min-w-0 flex-col gap-4">
                {experiences.map((experience) => (                
                    <GradientBorder
                        key={`${experience.company}-${experience.period}`}
                        >
                        <article
                            className="w-full min-w-0 rounded-2xl border border-zinc-800/80 bg-[#111111] p-5 transition-all sm:p-6"
                        >
                            {/* Card header */}
                            <div className="mb-3 flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            {/* Job title + company */}
                            <div className="min-w-0 flex-1">
                                <h4 className="text-base font-semibold leading-snug text-white">
                                {experience.title}
                                </h4>

                                <DiaTextReveal
                                className="mt-1 text-xs text-zinc-500"
                                text={experience.company}
                                />
                            </div>

                            {/* Date */}
                            <span className="w-fit shrink-0 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                                {experience.period}
                            </span>
                            </div>

                            {/* Description */}
                            <DiaTextReveal
                            className="block w-full text-sm leading-6 text-zinc-400"
                            text={experience.description}
                            />
                        </article>
                    </GradientBorder>
                ))}
            </div>
        </section>
    );
}