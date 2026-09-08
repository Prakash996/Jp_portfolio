import { Download } from 'lucide-react';
import resumePdf from '@/data/Resume_Jakkula_Paavana_Prakash.pdf';

const Resume = () => {
  return (
    <section id="resume" className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Description */}
      <div className="mb-3">
        <p className="text-sm text-zinc-400">
          View or download my resume
        </p>
      </div>

      {/* Resume Viewer */}
      <div
        className="
          w-full
          h-100 sm:h-118.75 lg:h-137.5
          overflow-auto
          rounded-xl
          border border-emerald-500/20
          bg-zinc-950
          shadow-lg shadow-emerald-500/5

          scrollbar-thin
          scrollbar-track-zinc-900
          scrollbar-thumb-emerald-500/60
          hover:scrollbar-thumb-emerald-500
        "
      >
        <iframe
          src={resumePdf}
          title="My Resume"
          className="w-full h-full min-h-100 border-0 bg-zinc-950"
        />
      </div>

      {/* Download Button */}
      <div className="mt-3">
        <a
          href={resumePdf}
          download="Resume_Jakkula_Paavana_Prakash.pdf"
          className="
            inline-flex items-center gap-2
            px-4 py-2 mt-3
            rounded-lg
            bg-zinc-900
            border border-emerald-500/30
            text-emerald-400
            text-sm font-medium
            hover:bg-emerald-500
            hover:text-white
            hover:border-emerald-500
            transition-all duration-200
          "
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Resume;
