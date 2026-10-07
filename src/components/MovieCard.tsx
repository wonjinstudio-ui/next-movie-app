"use client";

import Link from "next/link";
import type { Movie } from "@/types/movie";
import { useFavoritesStore } from "@/stores/favoritesStore";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  function handleFavorite() {
    if (isFavorite) {
      setFavorites((prev) => prev.filter((favorite) => favorite.id !== movie.id));
    } else {
      setFavorites((prev) => [...prev, movie]);
    }
  }

  return (
    <article className={styles.card}>
      <h2>{movie.title}</h2>
      <p>평점: {movie.vote_average}</p>

      <p>
        {movie.poster_path !== null
          ? movie.poster_path
          : "포스터 없음"}
      </p>

      <button
        type="button"
        onClick={handleFavorite}
        aria-pressed={isFavorite}
        className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ""}`}
      >
        <span className={styles.favoriteIcon} aria-hidden="true">
          {isFavorite ? "♥" : "♡"}
        </span>
        {isFavorite ? "찜 해제" : "찜하기"}
      </button>

      <Link href={`/movies/${movie.id}`}>
        상세 보기
      </Link>
    </article>
  );
}
