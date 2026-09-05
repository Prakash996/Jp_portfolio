import "@/css/MainBody.css";
import ProfileCard from "@/views/profile/profileCard";
import DiaTextReveal from "@/views/DiaTextReveal";
import ExperienceSection from "./ExperienceCards";

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

  return (
    <section id="home" className="portfolio-shell min-h-screen rounded-[2rem] p-5 font-sans text-white sm:p-8 md:p-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Profile Card */}
        <ProfileCard personDetails={personDetails} stats={stats}/>

        {/* Main Content */}
        <section className="flex flex-col space-y-10 lg:col-span-8">

          <div className="mb-10">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
              <span className="h-px w-8 bg-emerald-400/70" aria-hidden="true" />
              <span>OPEN TO SENIOR FRONTEND & SOFTWARE ENGINEER ROLES</span>
            </div>

            <h1 className="mb-10 text-4xl font-bold leading-tight md:text-6xl">
              <p>I’m{" "}<span className="text-current">{personDetails.name}</span>,
              <br />
              <span className="text-emerald-400">{personDetails.title}</span>
              <br />
              <span className="text-4xl font-bold leading-tight md:text-6xl">{personDetails.location}</span></p>
            </h1>

            {/* <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {personDetails.description}
            </p> */}
            <DiaTextReveal text={personDetails.description}/>
          </div>
        </section>
        </div>

        {/* Stats */}
        <div id="skills" className="stats-grid mb-10 grid grid-cols-2 gap-6 border-y border-emerald-300/80 py-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
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
        <ExperienceSection/>
    </section>
  );
}