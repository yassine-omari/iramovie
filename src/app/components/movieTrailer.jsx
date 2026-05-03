export default function MovieTrailer({ trailerKey, title }) {
  return (
    <div className="rounded-2xl overflow-hidden aspect-video max-w-3xl bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title={`${title} Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
