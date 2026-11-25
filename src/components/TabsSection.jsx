import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  FolderKanban,
  GitBranch,
  Globe2,
  LayoutGrid,
  Play,
} from "lucide-react";

import "@/css/TabsSection.css";

/* =========================================
   CONFIG
========================================= */

const TABS = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "web", label: "Web", icon: Globe2 },
  { id: "github", label: "GitHub", icon: GitBranch },
  { id: "media", label: "Media", icon: Play },
];

const TYPE_ICONS = Object.fromEntries(TABS.map((t) => [t.id, t.icon]));

/* =========================================
   DUMMY DATA
   Pass `data={[]}` (or nothing valid) to see the empty state.
   `image` is optional and overrides the auto-generated preview.
========================================= */
const DUMMY_PROJECTS = []
/*
const DUMMY_PROJECTS = [
  {
    id: 1,
    title: "React Documentation",
    description: "Official React docs, a good reference for hooks and patterns.",
    url: "https://react.dev",
    tags: ["React", "Docs"],
  },
  {
    id: 2,
    title: "Tailwind CSS",
    description: "Utility-first CSS framework used across my UI work.",
    url: "https://tailwindcss.com",
    tags: ["CSS", "Tailwind"],
  },
  {
    id: 3,
    title: "Next.js Source",
    description: "Reading the Next.js repository to learn frontend architecture.",
    url: "https://github.com/vercel/next.js",
    tags: ["Next.js", "Open Source"],
  },
  {
    id: 4,
    title: "React Repository",
    description: "The core React library source code.",
    url: "https://github.com/facebook/react",
    tags: ["React", "JavaScript"],
  },
  {
    id: 5,
    title: "Introduction to React",
    description: "Video tutorial covering React fundamentals.",
    url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    tags: ["React", "Tutorial"],
  },
  {
    id: 6,
    title: "JavaScript Full Course",
    description: "A complete JavaScript learning video.",
    url: "https://youtu.be/PkZNo7MFNFg",
    tags: ["JavaScript"],
  },
  {
    // Edge case: no URL, no description, no tags
    id: 7,
    title: "Coming soon",
  },
];
*/
/* =========================================
   URL HELPERS
========================================= */

function parseUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch {
    return null;
  }
}

function getYouTubeId(url) {
  const host = url.hostname.replace(/^www\./, "");
  const parts = url.pathname.split("/").filter(Boolean);
  let id = null;

  if (host === "youtu.be") {
    id = parts[0];
  } else if (
    ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
  ) {
    if (parts[0] === "watch") id = url.searchParams.get("v");
    else if (["embed", "shorts", "live"].includes(parts[0])) id = parts[1];
  }

  return /^[\w-]{11}$/.test(id ?? "") ? id : null;
}

/** Works out the project type and an auto-generated preview image. */
function getLinkInfo(url) {
  if (!url) return { type: "web", thumbnail: null };

  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return {
      type: "media",
      thumbnail: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  if (url.hostname.replace(/^www\./, "") === "github.com") {
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    return {
      type: "github",
      thumbnail: owner
        ? `https://opengraph.githubassets.com/1/${owner}${repo ? `/${repo}` : ""}`
        : null,
    };
  }

  return {
    type: "web",
    thumbnail: `https://image.thum.io/get/width/800/crop/450/${url.href}`,
  };
}

/* =========================================
   DATA NORMALIZATION
========================================= */

function normalizeProject(raw, index) {
  if (!raw || typeof raw.title !== "string" || !raw.title.trim()) return null;

  const url = parseUrl(raw.url);
  const { type, thumbnail } = getLinkInfo(url);

  return {
    id: raw.id ?? `${index}-${raw.title}`,
    title: raw.title.trim(),
    description:
      typeof raw.description === "string" ? raw.description.trim() : "",
    url: url?.href ?? null,
    host: url ? url.hostname.replace(/^www\./, "") : null,
    type,
    thumbnail: parseUrl(raw.image)?.href ?? thumbnail,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((t) => typeof t === "string" && t.trim())
      : [],
  };
}

/* =========================================
   COMPONENTS
========================================= */

function EmptyState({ tab, noData }) {
  return (
    <div className="projects-empty">
      <div className="projects-empty__icon">
        <FolderKanban size={26} strokeWidth={1.8} />
      </div>
      <h3 className="projects-empty__title">
        {noData ? "No projects yet" : `No ${tab.label} projects`}
      </h3>
      <p className="projects-empty__text">
        {noData
          ? "Projects you add will show up here."
          : "Nothing in this category yet. Try another tab."}
      </p>
    </div>
  );
}

function Preview({ project }) {
  const [failed, setFailed] = useState(false);
  const Icon = TYPE_ICONS[project.type];
  const showImage = project.thumbnail && !failed;

  return (
    <div className="projects-card__preview">
      {showImage ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="projects-card__fallback">
          <Icon size={30} strokeWidth={1.6} />
          <span>{project.host ?? "No preview available"}</span>
        </div>
      )}

      <span className="projects-card__chip">
        <Icon size={12} strokeWidth={2} />
        {TABS.find((t) => t.id === project.type).label}
      </span>

      {showImage && project.type === "media" && (
        <span className="projects-card__play" aria-hidden="true">
          <Play size={20} fill="currentColor" />
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const body = (
    <>
      <Preview project={project} />

      <div className="projects-card__body">
        <div className="projects-card__head">
          <h3 className="projects-card__title">{project.title}</h3>
          {project.url && (
            <span className="projects-card__arrow" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          )}
        </div>

        <p className="projects-card__host">{project.host ?? "No link yet"}</p>

        {project.description && (
          <p className="projects-card__description">{project.description}</p>
        )}

        {project.tags.length > 0 && (
          <ul className="projects-card__tags">
            {project.tags.map((tag) => (
              <li key={tag} className="projects-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  return project.url ? (
    <a
      className="projects-card"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
    >
      {body}
    </a>
  ) : (
    <div className="projects-card">{body}</div>
  );
}

/* =========================================
   MAIN
========================================= */

export default function TabsSection({ data = DUMMY_PROJECTS }) {
  const [activeTab, setActiveTab] = useState("all");

  const projects = useMemo(
    () =>
      Array.isArray(data) ? data.map(normalizeProject).filter(Boolean) : [],
    [data]
  );

  const counts = useMemo(() => {
    const result = { all: projects.length, web: 0, github: 0, media: 0 };
    projects.forEach((p) => result[p.type]++);
    return result;
  }, [projects]);

  const visible =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.type === activeTab);

  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const currentTab = TABS[activeIndex];

  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;

    event.preventDefault();
    const next = TABS[(activeIndex + step + TABS.length) % TABS.length];
    setActiveTab(next.id);
    document.getElementById(`project-tab-${next.id}`)?.focus();
  };

  return (
    <section id="projects" className="projects-section mb-16 sm:mb-24">
      <div className="projects-container">
        <header className="projects-header">
          <div>
            <h2 className="projects-heading">Projects</h2>
            <p className="projects-subheading">Selected work and creations</p>
          </div>

          <div
            className="projects-tabs"
            role="tablist"
            aria-label="Project categories"
            onKeyDown={handleKeyDown}
            style={{ "--index": activeIndex }}
          >
            <span className="projects-tabs__indicator" aria-hidden="true" />
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`project-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls="projects-panel"
                tabIndex={activeTab === id ? 0 : -1}
                className={`projects-tab${activeTab === id ? " is-active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={14} strokeWidth={1.8} />
                <span>{label}</span>
                <span className="projects-tab__count">{counts[id]}</span>
              </button>
            ))}
          </div>
        </header>

        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${activeTab}`}
          className="projects-panel"
        >
          <div key={activeTab} className="projects-fade">
            {visible.length === 0 ? (
              <EmptyState tab={currentTab} noData={projects.length === 0} />
            ) : (
              <div className="projects-grid">
                {visible.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}