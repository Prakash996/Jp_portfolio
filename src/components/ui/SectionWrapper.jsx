import clsx from "clsx";

export default function SectionWrapper({
  children,
  className,
  ...props
}) {
  return (
    <section
      className={clsx(
        "surface-panel relative isolate min-h-0 overflow-hidden rounded-4xl p-5 font-sans text-white sm:p-8",
        className
      )}
      {...props}
    >
      {/* Aurora */}
      <div
        aria-hidden="true"
        className="portfolio-aurora pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="portfolio-aurora__orb portfolio-aurora__orb--green" />
        <div className="portfolio-aurora__orb portfolio-aurora__orb--purple" />
        <div className="portfolio-aurora__orb portfolio-aurora__orb--blue" />
        <div className="portfolio-aurora__orb portfolio-aurora__orb--orange" />

        <div className="portfolio-aurora__wash" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
