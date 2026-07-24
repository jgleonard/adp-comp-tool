interface FooterProps {
  lastUpdated: string;
}

export default function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="bg-navy text-slate-light text-center py-4 px-4 text-sm">
      <div className="max-w-7xl mx-auto">
        <p className="mb-1">Data updated: {lastUpdated}</p>
        <p className="text-xs text-slate-light">
          Sources:{' '}
          <a
            href="https://sleeper.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline transition-smooth"
          >
            Sleeper
          </a>
          {' / '}
          <a
            href="https://www.mfl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline transition-smooth"
          >
            MFL
          </a>
          {' / '}
          <a
            href="https://www.espn.com/fantasy/football"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline transition-smooth"
          >
            ESPN
          </a>
          {' / '}
          <a
            href="https://www.fantasypros.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline transition-smooth"
          >
            FantasyPros
          </a>
        </p>
      </div>
    </footer>
  );
}
