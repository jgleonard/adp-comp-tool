interface FooterProps {
  lastUpdated: string;
}

export default function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row text-xs text-slate-light">
          <span>Updated {lastUpdated}</span>
          <div className="flex items-center gap-1.5">
            <a href="https://sleeper.app" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">Sleeper</a>
            <span className="text-gray-300">·</span>
            <a href="https://www.mfl.com" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">MFL</a>
            <span className="text-gray-300">·</span>
            <a href="https://www.espn.com/fantasy/football" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">ESPN</a>
            <span className="text-gray-300">·</span>
            <a href="https://www.fantasypros.com" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">FantasyPros</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
