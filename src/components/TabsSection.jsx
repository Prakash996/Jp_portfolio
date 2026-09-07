import { useState } from "react";
import { Icon, addCollection } from "@iconify/react";

import simpleIcons from "@iconify-json/simple-icons/icons.json";
import mdiIcons from "@iconify-json/mdi/icons.json";

import { FaVial } from "react-icons/fa";

import "@/css/TabsSection.css";

/* =========================================================
   LOCAL ICON COLLECTIONS
========================================================= */

addCollection(simpleIcons);
addCollection(mdiIcons);

/* =========================================================
   SKILLS DATA
========================================================= */

const SKILLS = [
  /* =======================================================
     CORE
  ======================================================= */

  {
    name: "JavaScript",
    category: "core",
    icon: "simple-icons:javascript",
    color: "#F7DF1E",
  },
  {
    name: "React.js",
    category: "core",
    icon: "simple-icons:react",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    category: "core",
    icon: "simple-icons:nextdotjs",
    color: "#FFFFFF",
  },
  {
    name: "Node.js",
    category: "core",
    icon: "simple-icons:nodedotjs",
    color: "#339933",
  },

  /* =======================================================
     FRONTEND
  ======================================================= */

  {
    name: "HTML5",
    category: "frontend",
    icon: "simple-icons:html5",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    category: "frontend",
    icon: "simple-icons:css3",
    color: "#1572B6",
  },
  {
    name: "Bootstrap",
    category: "frontend",
    icon: "simple-icons:bootstrap",
    color: "#7952B3",
  },
  {
    name: "jQuery",
    category: "frontend",
    icon: "simple-icons:jquery",
    color: "#0769AD",
  },
  {
    name: "Responsive Design",
    category: "frontend",
    icon: "simple-icons:css3",
    color: "#10B981",
  },

  /* =======================================================
     FRAMEWORKS & RUNTIMES
  ======================================================= */

  {
    name: "Angular",
    category: "frameworks",
    icon: "simple-icons:angular",
    color: "#DD0031",
  },
  {
    name: "Redux",
    category: "frameworks",
    icon: "simple-icons:redux",
    color: "#764ABC",
  },
  {
    name: "Express.js",
    category: "frameworks",
    icon: "simple-icons:express",
    color: "#FFFFFF",
  },
  {
    name: "Electron.js",
    category: "frameworks",
    icon: "simple-icons:electron",
    color: "#47848F",
  },
  {
    name: "NW.js",
    category: "frameworks",
    icon: "mdi:compass-outline",
    color: "#34D399",
  },
  {
    name: "HCL Volt Iris",
    category: "frameworks",
    icon: "simple-icons:hcl",
    color: "#1261FE",
  },

  /* =======================================================
     TESTING & AUTOMATION
  ======================================================= */

  {
    name: "TestNG",
    category: "testing",
    icon: null,
    color: "#FF6F00",
  },
  {
    name: "Sikuli",
    category: "testing",
    icon: "simple-icons:python",
    color: "#3776AB",
  },
  {
    name: "Selenium",
    category: "testing",
    icon: "simple-icons:selenium",
    color: "#43B02A",
  },
  {
    name: "Mocha",
    category: "testing",
    icon: "simple-icons:mocha",
    color: "#8D6748",
  },

  /* =======================================================
     DEVELOPER TOOLS
  ======================================================= */

  {
    name: "Git",
    category: "tools",
    icon: "simple-icons:git",
    color: "#F05032",
  },
  {
    name: "GitHub",
    category: "tools",
    icon: "simple-icons:github",
    color: "#FFFFFF",
  },
  {
    name: "Jenkins",
    category: "tools",
    icon: "simple-icons:jenkins",
    color: "#D24939",
  },
  {
    name: "Jira",
    category: "tools",
    icon: "simple-icons:jira",
    color: "#0052CC",
  },
  {
    name: "Eclipse",
    category: "tools",
    icon: "simple-icons:eclipseide",
    color: "#A88BFF",
  },
  {
    name: "Eclipse Theia",
    category: "tools",
    icon: "mdi:code-braces",
    color: "#24BFA5",
  },

  /* =======================================================
     DATABASES & SYSTEMS
  ======================================================= */

  {
    name: "MySQL",
    category: "database",
    icon: "simple-icons:mysql",
    color: "#4479A1",
  },
  {
    name: "SQLite",
    category: "database",
    icon: "simple-icons:sqlite",
    color: "#003B57",
  },
  {
    name: "HCL Domino",
    category: "database",
    icon: "simple-icons:hcl",
    color: "#1261FE",
  },
  {
    name: "HCL HEI",
    category: "database",
    icon: "simple-icons:hcl",
    color: "#1261FE",
  },
];

/* =========================================================
   SKILL TABS
========================================================= */

const TABS = [
  {
    id: "all",
    label: "All",
    icon: "mdi:view-grid-outline",
  },
  {
    id: "core",
    label: "Core",
    icon: "mdi:code-tags",
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "mdi:web",
  },
  {
    id: "frameworks",
    label: "Frameworks",
    icon: "mdi:layers-outline",
  },
  {
    id: "testing",
    label: "Testing",
    icon: "mdi:test-tube",
  },
  {
    id: "tools",
    label: "Tools",
    icon: "mdi:tools",
  },
  {
    id: "database",
    label: "Database",
    icon: "mdi:database-outline",
  },
];

/* =========================================================
   FALLBACK ICON
========================================================= */

function FallbackIcon({ color = "#34D399" }) {
  return (
    <div
      id="skill-fallback-icon"
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        border
      "
      style={{
        color,
        borderColor: `${color}66`,
        backgroundColor: `${color}0D`,
      }}
    >
      <Icon
        id="skill-fallback-icon-symbol"
        icon="mdi:help-circle-outline"
        width={30}
        height={30}
        aria-label="Unknown skill icon"
        role="img"
      />
    </div>
  );
}

/* =========================================================
   SKILL ICON
========================================================= */

function SkillIcon({ skill }) {
  /*
   * TestNG uses react-icons instead of Iconify.
   * This guarantees that the icon renders independently
   * of the installed Iconify collection.
   */

  if (skill?.name === "TestNG") {
    return (
      <FaVial
        id="skill-icon-testng"
        size={48}
        color={skill.color}
        aria-label="TestNG logo"
        role="img"
        className="tabs-section__skill-icon"
      />
    );
  }

  if (!skill?.icon) {
    return <FallbackIcon color={skill?.color} />;
  }

  return (
    <Icon
      id={`skill-icon-${skill.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`}
      icon={skill.icon}
      width={48}
      height={48}
      aria-label={`${skill.name} logo`}
      role="img"
      className="tabs-section__skill-icon"
      style={{
        color: skill.color,
        width: "48px",
        height: "48px",
      }}
    />
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({ skill, index }) {
  const duration = `${2.8 + ((index * 0.73) % 2.4)}s`;
  const delay = `${(index * 0.43) % 2.5}s`;

  const skillId = skill.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      id={`skill-card-${skillId}`}
      className="
        tabs-section__skill-item
        group
        relative
        flex
        min-h-36.25
        cursor-pointer
        flex-col
        items-center
        justify-center
        border
        border-transparent
        px-2
        py-4
        rounded-4xl
        transition-all
        duration-300
      "
      style={{
        "--brand-color": skill.color,
        "--duration": duration,
        "--delay": delay,
      }}
    >
      {/* ===================================================
          ICON CIRCLE
      =================================================== */}

      <div
        id={`skill-icon-circle-${skillId}`}
        className="
          relative
          z-10
          flex
          h-20
          w-20
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-emerald-400/50
          bg-emerald-400/4.5
          transition-all
          duration-300
          ease-out
          group-hover:scale-105
          group-hover:border-(--brand-color)
          group-hover:bg-emerald-400/8
          group-hover:shadow-[0_0_30px_rgba(52,211,153,0.08)]
        "
      >
        {/* Brand glow */}

        <div
          id={`skill-glow-${skillId}`}
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
          style={{
            background: `radial-gradient(
              circle,
              ${skill.color}18 0%,
              transparent 70%
            )`,
          }}
        />

        {/* Skill icon */}

        <div
          id={`skill-icon-wrapper-${skillId}`}
          className="
            relative
            z-10
            flex
            items-center
            justify-center
          "
        >
          <SkillIcon skill={skill} />
        </div>
      </div>

      {/* ===================================================
          LABEL
      =================================================== */}

      <div
        id={`skill-label-${skillId}`}
        className="mt-3 w-full px-1 text-center"
      >
        <span
          id={`skill-name-${skillId}`}
          className="
            block
            truncate
            text-[10px]
            font-semibold
            text-slate-500
            transition-colors
            duration-300
            group-hover:text-emerald-300
          "
          title={skill.name}
        >
          {skill.name}
        </span>
      </div>

      {/* ===================================================
          BOTTOM INDICATOR
      =================================================== */}

      <span
        id={`skill-indicator-${skillId}`}
        className="
          absolute
          bottom-2
          h-px
          w-0
          bg-[var(--brand-color)]
          opacity-0
          transition-all
          duration-300
          group-hover:w-8
          group-hover:opacity-60
        "
      />
    </article>
  );
}

/* =========================================================
   SKILL TAB
========================================================= */

function SkillTab({
  tab,
  active,
  count,
  onClick,
}) {
  return (
    <button
      id={`skill-tab-${tab.id}`}
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        group
        relative
        flex
        shrink-0
        items-center
        gap-1.5
        rounded-lg
        border
        px-3
        py-2
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.1em]
        transition-all
        duration-300

        ${
          active
            ? `
              border-emerald-400/20
              bg-emerald-400/[0.07]
              text-emerald-300
            `
            : `
              border-transparent
              bg-transparent
              text-slate-600
              hover:border-white/[0.04]
              hover:bg-white/[0.02]
              hover:text-slate-400
            `
        }
      `}
    >
      <Icon
        id={`skill-tab-icon-${tab.id}`}
        icon={tab.icon}
        width={14}
        height={14}
        className="shrink-0"
      />

      <span id={`skill-tab-label-${tab.id}`} className="pt-0.5">
        {tab.label}
      </span>

      <span
        id={`skill-tab-count-${tab.id}`}
        className={`
          rounded-full
          px-1.5
          py-1.3
          text-[8px]
          ${
            active ? "bg-emerald-600/30 text-emerald-300" : "bg-white/3 text-slate-700"
          }
        `}
      >
        {count}
      </span>

      {/* Active underline */}

      <span
        id={`skill-tab-underline-${tab.id}`}
        className={`
          absolute
          -bottom-px
          left-1/2
          h-px
          -translate-x-1/2
          bg-emerald-400
          transition-all
          duration-300
          ${
            active
              ? "w-8 opacity-80"
              : "w-0 opacity-0"
          }
        `}
      />
    </button>
  );
}

/* =========================================================
   MAIN SKILL GRID
========================================================= */

export default function SkillGrid({
  data = SKILLS,
}) {
  const [activeTab, setActiveTab] = useState("all");

  /* =======================================================
     FILTER SKILLS
  ======================================================= */

  const filteredSkills =
    activeTab === "all"
      ? data
      : data.filter(
          (skill) =>
            skill.category === activeTab
        );

  /* =======================================================
     GET TAB COUNT
  ======================================================= */

  const getTabCount = (tabId) => {
    if (tabId === "all") {
      return data.length;
    }

    return data.filter(
      (skill) =>
        skill.category === tabId
    ).length;
  };

  return (
    <section
      id="skills"
      className="
        tabs-section
        relative
        w-full
        mb-23
      "
    >
      <div
        id="skills-wrapper"
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            MAIN GLASS CONTAINER
        ================================================= */}

        <div
          id="skills-container"
          className="
            tabs-section__container
            w-full
            max-w-full
            rounded-2xl
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <header
            id="skills-header"
            className="
              flex
              w-full
              flex-col
              gap-3
              border-b
              border-white/[0.035]
              px-4
              py-3
              sm:flex-row
              sm:items-center
              sm:px-5
            "
          >
            {/* =================================================
                TITLE
            ================================================= */}

            <div
              id="skills-title-wrapper"
              className="
                shrink-0
                sm:w-[105px]
              "
            >
              <h2
                id="skills-title"
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-300
                "
              >
                Skills
              </h2>

              <p
                id="skills-subtitle"
                className="
                  mt-1
                  text-[9px]
                  text-slate-400
                "
              >
                Technologies & tools
              </p>
            </div>

            {/* =================================================
                CATEGORY TABS
            ================================================= */}

            <nav
              id="skills-tabs-navigation"
              className="
                min-w-0
                flex-1
              "
              role="tablist"
              aria-label="Skill categories"
            >
              <div
                id="skills-tabs"
                className="
                  flex
                  w-full
                  flex-wrap
                  items-center
                  justify-center
                  gap-1
                "
              >
                {TABS.map((tab) => (
                  <SkillTab
                    key={tab.id}
                    tab={tab}
                    active={
                      activeTab === tab.id
                    }
                    count={getTabCount(
                      tab.id
                    )}
                    onClick={() =>
                      setActiveTab(tab.id)
                    }
                  />
                ))}
              </div>
            </nav>

            {/* =================================================
                DESKTOP COUNT
            ================================================= */}

            <div
              id="skills-desktop-count-wrapper"
              className="
                hidden
                shrink-0
                sm:block
                sm:w-[75px]
                sm:text-right
              "
            >
              <span
                id="skills-desktop-count"
                className="
                  rounded-full
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.04]
                  px-2.5
                  py-1
                  text-[9px]
                  font-medium
                  text-slate-500
                "
              >
                {filteredSkills.length} skills
              </span>
            </div>
          </header>

          {/* =================================================
              MOBILE COUNT
          ================================================= */}

          <div
            id="skills-mobile-count-wrapper"
            className="
              flex
              justify-end
              px-4
              pt-2
              sm:hidden
            "
          >
            <span
              id="skills-mobile-count"
              className="
                rounded-full
                border
                border-emerald-400/10
                bg-emerald-400/4
                px-2.5
                py-1
                text-[8px]
                font-medium
                text-slate-400
              "
            >
              {filteredSkills.length} skills
            </span>
          </div>

          {/* =================================================
              SKILLS CONTENT
          ================================================= */}

          <div
            id="skills-content"
            className="
              w-full
              min-w-0
              p-4
              sm:p-5
            "
            role="tabpanel"
          >
            {filteredSkills.length > 0 ? (
              <div
                id="skills-grid"
                className="
                  grid
                  w-full
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-5
                  xl:grid-cols-6
                "
              >
                {filteredSkills.map(
                  (skill, index) => (
                    <SkillCard
                      key={`${skill.name}-${index}`}
                      skill={skill}
                      index={index}
                    />
                  )
                )}
              </div>
            ) : (
              <div
                id="skills-empty-state"
                className="
                  flex
                  min-h-45
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-white/4
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-slate-700
                "
              >
                No skills in this category
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer
          id="skills-footer"
          className="
            mt-3
            flex
            items-center
            justify-between
            px-1
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-slate-700
          "
        >
          <span id="skills-footer-label">
            Technology Stack
          </span>

          <span id="skills-footer-count">
            {filteredSkills.length}{" "}
            {filteredSkills.length === 1
              ? "skill"
              : "skills"}
          </span>
        </footer>
      </div>
    </section>
  );
}
