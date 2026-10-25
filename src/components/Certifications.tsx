import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Certifications() {
  const { certifications } = PROFILE_DATA;

  return (
    <section id="certifications" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-1">
              Accreditations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Industry Certifications
            </h2>
          </div>

          <span className="text-xs font-mono text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {certifications.length} Credentials
          </span>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md dark:shadow-none flex flex-col justify-between"
            >
              <div>
                {/* Issuer Badge & Verified Check */}
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#1A2447] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/60">
                    <Award className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer and Date */}
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{cert.issuer}</span>
                  <span className="mx-1.5">·</span>
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group cursor-pointer"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    Credential on file
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
