import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const data = await getPopularMovies();

  return (
    <main>
      <h1>인기 영화</h1>

      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
