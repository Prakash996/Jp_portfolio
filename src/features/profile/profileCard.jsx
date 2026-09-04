import { useState, useEffect } from "react";
import { FiDownload, FiSend } from "react-icons/fi";
import personImage from "../../assets/images/person.png";
import Loading from "../../utils/Loading";
import "./ProfileCard.css";

export default function ProfileCard({ personDetails, socialLinks }) {
    const [isLoading, setIsLoading] = useState(true);

    // Simulated fetch delay (Remove or tie to your layout load as needed)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <aside className={`relative overflow-hidden flex h-fit flex-col items-center rounded-3xl border border-zinc-800 bg-[#111111] p-6 text-center lg:col-span-4 ${isLoading ? 'pointer-events-none' : ''}`}>
            <Loading isLoading={isLoading} className="shimmer-effect">
                <div className="flex w-full flex-col items-center">
                    <div className="mb-6 aspect-square w-full rounded-2xl bg-zinc-800 pulse-animation" />
                    <div className="mb-6 h-7 w-28 rounded-full bg-zinc-800 pulse-animation" />
                    <div className="mb-6 h-9 w-3/4 rounded bg-zinc-800 pulse-animation" />
                    <div className="mb-8 flex gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-9 w-9 rounded-lg bg-zinc-800 pulse-animation" />
                        ))}
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="h-10 rounded-xl bg-zinc-800 pulse-animation" />
                        <div className="h-10 rounded-xl bg-zinc-800 pulse-animation" />
                    </div>
                </div>
            </Loading>
            {!isLoading && (
                /* === ACTUAL PROFILE CARD CONTENT === */
                <>
                    {/* Profile Image */}
                    <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl">
                        <img src={personImage} alt={personDetails.name} className="h-full w-full object-cover"/>
                    </div>

                    {/* Availability */}
                    <div id="availabilityStatus" className="mb-4 inline-flex items-center gap-2 rounded-full border hover:border-be-emerald-600 border-zinc-800 bg-zinc-900 px-3 py-1.5">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-zinc-300">Open to work</span>
                    </div>

                    {/* Animated Signature Name */}
                    <h2 className="mb-4 text-3xl font-semibold font-mono signature-write">
                        {personDetails.name}
                    </h2>

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
                        <a href="/" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-semibold text-black transition-colors hover:bg-emerald-400">
                            <FiSend size={14} />Contact Me
                        </a>
                    </div>
                </>
            )}
        </aside>
    );
}