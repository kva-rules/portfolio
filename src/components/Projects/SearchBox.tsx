import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
  query: string;
  onChange: (query: string) => void;
  onClear: () => void;
}

export function SearchBox({ query, onChange, onClear }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full sm:w-80 md:w-96">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4 text-cyan-400/80" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search keywords (Kafka, Claude, Redis, MCP)..."
        aria-label="Search projects by keyword, tech, or framework"
        className="w-full pl-10 pr-16 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all font-mono"
      />

      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
        {query ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search query"
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <span>⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  );
}
