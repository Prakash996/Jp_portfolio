import "./css/MainBody.css";
import ProfileCard from "../features/profile/profileCard";
import {FiBriefcase} from "react-icons/fi";
import DiaTextReveal from "../features/components/DiaTextReveal";

export default function MainBody() {

  const personDetails = {
    name: "JP Prakash",
    title: "Frontend Developer",
    location: "Based in Vijayawada, AP, India.",
    description:"I am a Software Engineer focused on building responsive, highly available frontend architectures and desktop application platforms. Over the past 5+ years at HCLTech, I have driven 15+ major UI refactoring initiatives, optimized layout engines for complex IDE canvases, and tuned cross-platform desktop build runtimes. I specialize in resolving client-side DOM bottlenecks, streamlining cross-browser layout consistency, and automating CI/CD workflows to deliver stable, high-performance web applications."
  }

  const stats = [
    { label: "Years of Experience", value: "6+" },
    { label: "Frontend UI Refactors", value: "15+" },
  ];

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
    <section id="home" className="portfolio-shell min-h-screen rounded-[2rem] p-5 font-sans text-white sm:p-8 md:p-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Profile Card */}
        <ProfileCard
          personDetails={personDetails}
          stats={stats}
          experiences={experiences}
        />
        {/* Main Content */}
        <section className="flex flex-col space-y-10 lg:col-span-8">

          <div className="">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
              <span className="h-px w-8 bg-emerald-400/70" aria-hidden="true" />
              <span>OPEN TO SENIOR FRONTEND & SOFTWARE ENGINEER ROLES</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              I’m{" "}<span className="text-current">{personDetails.name}</span>,
              <br />
              <span className="text-emerald-400">{personDetails.title}</span>
              <br />
              <span className="text-4xl font-bold leading-tight md:text-6xl">{personDetails.location}</span>
            </h1>

            {/* <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {personDetails.description}
            </p> */}
            <DiaTextReveal text={personDetails.description}/>
          </div>

          {/* Stats */}
          <div id="skills" className="stats-grid grid grid-cols-2 gap-6 border-y border-emerald-300/80 py-5 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="space-y-1"
              >
                <div className="text-3xl font-extrabold text-white">
                  {stat.value}
                </div>

                <div className="text-xs text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div id="projects">
            <div className="mb-4 flex items-center gap-2 text-xl font-bold">
              <FiBriefcase size={20} className="text-zinc-400"/>
              <h3>Experience</h3>
            </div>

            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.period}`}
                    className="experience-card rounded-2xl border border-zinc-800/80 bg-[#111111] p-6 transition-all hover:border-zinc-700"
                >
                  <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">

                    <div>
                      <h4 className="text-base font-semibold text-white">{experience.title}</h4>
                      <DiaTextReveal className="text-xs text-zinc-500" text={experience.company}/>
                    </div>

                    <span className="w-fit rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                      {experience.period}
                    </span>

                  </div>

                  <DiaTextReveal className="mt-3 text-xs leading-relaxed text-zinc-400" text={experience.description}/>
                </article>
              ))}
            </div>
          </div>

        </section>
      </div>
    </section>
  );
}