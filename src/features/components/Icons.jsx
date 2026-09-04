
export default function Icons({ iconLinks = [] }) {
  const anchorClassNames = [
    "group",
    "rounded-lg",
    "border",
    "border-zinc-800",
    "bg-zinc-900",
    "p-2.5",
    "text-zinc-400",
    "transition-colors",
    "hover:border-zinc-700",
    "hover:border-emerald-500",
    "hover:border-be-emerald-500",
    "hover:border-e-emerald-500",
    "hover:text-emerald-200",
  ];

  const iconClassNames =[
    "transition-all", 
    "duration-300",
    "group-hover:scale-[1.33]"
  ];
  
  return (
    <div id="icon-links" className="mb-6 flex gap-3">
      {iconLinks.map(({ name, icon: Icon, href }) => (
        <a key={name} href={href} rel="noopener noreferrer" aria-label={name} className={anchorClassNames.join(" ")}>
          <Icon size={18} className={iconClassNames.join(" ")}/>
        </a>
      ))}
    </div>
  );
}