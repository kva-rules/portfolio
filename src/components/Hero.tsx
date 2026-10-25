import { useState } from 'react';
import { ArrowRight, Download, FolderGit2, Github, Linkedin, Mail, Copy, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Hero() {
  const { personal, codeSnippet } = PROFILE_DATA;
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/40 border border-cyan-300/80 dark:border-cyan-400/30 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-medium tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>{personal.availability}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                {personal.name}
              </h1>
              <p className="text-base sm:text-lg font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 font-mono">
                {personal.role}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              &ldquo;{personal.tagline}&rdquo;
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(34,211,238,0.35)] hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] active:scale-95 cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href={personal.resumeUrl}
                download="Abhidhab_Mellwyn_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-[#131C38] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400/60 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-95 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors group cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-500 dark:text-cyan-400" />
              </a>
            </div>

            {/* Social Connect Links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mr-2">
                Connect:
              </span>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/60 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all shadow-xs"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/60 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/60 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Avatar Portrait & Code Snippet */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-6">
            
            {/* Circular Portrait Frame */}
            <div className="relative group">
              {/* Outer atmospheric aura */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500/40 via-blue-500/20 to-cyan-300/40 blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-b from-cyan-400/50 via-slate-200 to-cyan-500/30 dark:from-cyan-400/60 dark:via-slate-800 dark:to-cyan-500/20 shadow-2xl overflow-hidden flex items-center justify-center">
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  loading="eager"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Status Badge Pin */}
              <div
                className="absolute bottom-2 right-2 p-2 rounded-xl bg-white dark:bg-[#09122B] border border-cyan-400/50 text-cyan-600 dark:text-cyan-300 shadow-md"
                title="Active Architecture Terminal"
              >
                <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                  &gt;_
                </span>
              </div>
            </div>

            {/* Interactive Code Snippet Box */}
            <div className="w-full max-w-md rounded-2xl bg-[#0B1020] border border-slate-800/90 shadow-xl overflow-hidden font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#131C38]/80 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-semibold">
                    {codeSnippet.filename}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {codeSnippet.version}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    aria-label="Copy code snippet"
                    className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors focus:outline-none"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 text-slate-300 leading-relaxed overflow-x-auto">
                <pre className="text-xs">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-300">engineer</span> = &#123;
                  {'\n'}  <span className="text-slate-400">stack:</span> [
                  <span className="text-emerald-300">&quot;React&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;Java&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;Node.js&quot;</span>],
                  {'\n'}  <span className="text-slate-400">cloud:</span> [
                  <span className="text-emerald-300">&quot;AWS&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;Azure&quot;</span>],
                  {'\n'}  <span className="text-slate-400">ai:</span>    [
                  <span className="text-emerald-300">&quot;Claude&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;Gemini&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;ADK&quot;</span>]
                  {'\n'}&#125;;
                </pre>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
