export default function Header() {
  return (
    <header className="bg-gradient-to-r from-navy via-navy-light to-blue text-white py-5 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal via-accent to-teal bg-clip-text text-transparent">
          ADP Comparison Tool
        </h1>
        <p className="text-slate-light text-xs sm:text-sm mt-1 tracking-wide">
          Sleeper &bull; MFL &bull; ESPN &bull; FantasyPros
        </p>
      </div>
    </header>
  );
}
