import Link from "next/link";

const GENRE_DATA = {
  28: {
    icon: "💥",
    color: "from-orange-600/40 to-red-900/20",
    border: "border-orange-500/20",
  },
  12: {
    icon: "🧭",
    color: "from-emerald-600/40 to-emerald-900/20",
    border: "border-emerald-500/20",
  },
  16: {
    icon: "🎨",
    color: "from-pink-600/40 to-pink-900/20",
    border: "border-pink-500/20",
  },
  35: {
    icon: "😂",
    color: "from-yellow-500/40 to-yellow-900/20",
    border: "border-yellow-500/20",
  },
  80: {
    icon: "🔫",
    color: "from-gray-600/40 to-gray-900/20",
    border: "border-gray-500/20",
  },
  99: {
    icon: "🎥",
    color: "from-blue-600/40 to-blue-900/20",
    border: "border-blue-500/20",
  },
  18: {
    icon: "🎭",
    color: "from-purple-600/40 to-purple-900/20",
    border: "border-purple-500/20",
  },
  10751: {
    icon: "👨‍👩‍👧",
    color: "from-green-600/40 to-green-900/20",
    border: "border-green-500/20",
  },
  14: {
    icon: "🧙",
    color: "from-violet-600/40 to-violet-900/20",
    border: "border-violet-500/20",
  },
  36: {
    icon: "📜",
    color: "from-amber-600/40 to-amber-900/20",
    border: "border-amber-500/20",
  },
  27: {
    icon: "👻",
    color: "from-red-700/40 to-red-950/20",
    border: "border-red-600/20",
  },
  10402: {
    icon: "🎵",
    color: "from-fuchsia-600/40 to-fuchsia-900/20",
    border: "border-fuchsia-500/20",
  },
  9648: {
    icon: "🕵️",
    color: "from-slate-600/40 to-slate-900/20",
    border: "border-slate-500/20",
  },
  10749: {
    icon: "❤️",
    color: "from-rose-600/40 to-rose-900/20",
    border: "border-rose-500/20",
  },
  878: {
    icon: "🚀",
    color: "from-cyan-600/40 to-cyan-900/20",
    border: "border-cyan-500/20",
  },
  10770: {
    icon: "📺",
    color: "from-indigo-600/40 to-indigo-900/20",
    border: "border-indigo-500/20",
  },
  53: {
    icon: "😰",
    color: "from-zinc-600/40 to-zinc-900/20",
    border: "border-zinc-500/20",
  },
  10752: {
    icon: "⚔️",
    color: "from-stone-600/40 to-stone-900/20",
    border: "border-stone-500/20",
  },
  37: {
    icon: "🤠",
    color: "from-orange-800/40 to-orange-950/20",
    border: "border-orange-700/20",
  },
};

export default function Genres({ genres }) {
  return (
    <section className="px-4 md:px-10 py-8">
      <h2 className="text-white text-lg font-semibold mb-4">Browse by Genre</h2>
      <div className="flex gap-3 overflow-x-auto p-2 scrollbar-hide">
        {genres.map((genre) => {
          const data = GENRE_DATA[genre.id] ?? {
            icon: "🎬",
            color: "from-blue-600/40 to-blue-900/20",
            border: "border-blue-500/20",
          };

          return (
            <Link
              key={genre.id}
              href={`/home/genre/${genre.id}`}
              className={`
                group shrink-0 flex flex-col items-center justify-center gap-2
                w-24 h-24 rounded-2xl border
                bg-gradient-to-br ${data.color} ${data.border}
                hover:scale-105 hover:brightness-125
                transition-all duration-200 cursor-pointer
              `}
            >
              <span className="text-3xl">{data.icon}</span>
              <span className="text-white text-[11px] font-medium text-center leading-tight px-1">
                {genre.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
