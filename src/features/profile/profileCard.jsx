import { FiDownload, FiSend } from "react-icons/fi";
import personImage from "../../assets/images/person.png";

export default function ProfileCard({ personDetails, stats, experiences, socialLinks }) {
    
    
    return (
        <aside className="flex h-fit flex-col items-center rounded-3xl border border-zinc-800 bg-[#111111] p-6 text-center lg:col-span-4">
            {/* Profile Image */}
            <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl">
                <img src={personImage} alt={personDetails.name} className="h-full w-full object-cover"/>
            </div>

            {/* Availability */}
            <div id="availabilityStatus" className="mb-4 inline-flex items-center gap-2 rounded-full border hover:border-be-emerald-600 border-zinc-800 bg-zinc-900 px-3 py-1.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-zinc-300">Open to work</span>
            </div>
            <h2 className="mb-4 text-3xl font-semibold font-mono">{personDetails.name}</h2>

            {/* Social Links */}
            <div id="social-links" className="mb-6 flex gap-3">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                    <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:border-be-emerald-500 hover:text-emerald-500">
                        <Icon size={18} />
                    </a>
                ))}
            </div>

            {/* CTA Buttons */}
            <div className="grid w-full grid-cols-2 gap-3">
                <a href="/" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-zinc-800">
                    <FiDownload size={14} />Download CV
                </a>
                <a href="#contact" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-semibold text-black transition-colors hover:bg-emerald-400">
                    <FiSend size={14} />Contact Me
                </a>
            </div>
        </aside>
    );
}