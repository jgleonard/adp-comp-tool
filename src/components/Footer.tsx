interface FooterProps {
  lastUpdated: string;
}

export default function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row text-xs text-slate-light dark:text-slate-400">
          <span>Updated {lastUpdated}</span>
          <div className="flex items-center gap-1.5">
            <a href="https://sleeper.app" target="_blank" rel="noopener noreferrer" className="hover:text-navy dark:hover:text-gray-200 transition-colors">Sleeper</a>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <a href="https://www.mfl.com" target="_blank" rel="noopener noreferrer" className="hover:text-navy dark:hover:text-gray-200 transition-colors">MFL</a>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <a href="https://www.espn.com/fantasy/football" target="_blank" rel="noopener noreferrer" className="hover:text-navy dark:hover:text-gray-200 transition-colors">ESPN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
