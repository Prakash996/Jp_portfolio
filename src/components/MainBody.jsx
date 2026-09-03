import "./css/MainBody.css";
import ProfileCard from "../features/profile/profileCard";
import {FiBriefcase} from "react-icons/fi";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function MainBody() {

  const personDetails = {
    name: "JP Prakash",
    title: "Frontend Developer",
  }

  const stats = [
    { label: "Years of Experience", value: "6+" },
    { label: "Completed Projects", value: "2" },
  ];

  const experiences = [
    {
      title: "Framer & UI/UX Designer",
      company: "Circlum Tech",
      period: "2023 - Present",
      description:
        "Designing interactive prototypes with Framer, focusing on seamless user experiences and scalable solutions through user feedback and collaboration.",
    },
    {
      title: "UI/UX Designer",
      company: "Previous Co",
      period: "2021 - 2023",
      description:
        "Crafted visual identities, responsive website layouts, and intuitive application user flows for diverse client portfolios.",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com/",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "https://twitter.com/",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://youtube.com/",
    },
  ];

  return (
    <section className="min-h-screen bg-white/10 rounded-3xl p-6 font-sans text-white md:p-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Profile Card */}
        <ProfileCard
          personDetails={personDetails}
          stats={stats}
          experiences={experiences}
          socialLinks={socialLinks}
        />

        {/* Main Content */}
        <section className="flex flex-col space-y-10 lg:col-span-8">

          {/* Hero */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
              <span aria-hidden="true">👋</span>
              <span>Say Hello</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              I’m {personDetails.name},
              <br />

              <span className="text-emerald-400">
                {personDetails.title}
              </span>

              <br />

              Based in Los Angeles, CA.
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              I specialize in creating clean, user-friendly digital
              experiences by blending creativity with functionality.
              With a strong background in interactive design, I focus
              on crafting designs that not only look great but also
              provide smooth and engaging user interactions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 border-y border-zinc-900 py-4 md:grid-cols-4">
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
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold">
              <FiBriefcase
                size={20}
                className="text-zinc-400"
              />

              <h3>Experience</h3>
            </div>

            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.period}`}
                  className="rounded-2xl border border-zinc-800/80 bg-[#111111] p-6 transition-all hover:border-zinc-700"
                >
                  <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">

                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {experience.title}
                      </h4>

                      <p className="text-xs text-zinc-500">
                        {experience.company}
                      </p>
                    </div>

                    <span className="w-fit rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                      {experience.period}
                    </span>

                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                    {experience.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

        </section>
      </div>
    </section>
  );
}