import Link from "next/link";

export default function tagLine() {
  return (
    <section className="px-4 md:px-10 py-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950/60 via-[#0f0f0f] to-[#0f0f0f] border border-white/10 px-8 md:px-14 py-12">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-xl">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Why iramovie
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
            Your cinema,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              curated.
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            From blockbusters to hidden gems — discover films that matter,
            organized by mood, genre, and what's trending right now. One place
            for everything cinema.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/home/popular"
              className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all duration-150"
            >
              Start Exploring
            </Link>
            <Link
              href="/home/top-rated"
              className="bg-white/10 border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/15 active:scale-95 transition-all duration-150"
            >
              Top Rated
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
