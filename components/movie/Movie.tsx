import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  posterUrl: string;
  id: number;
};

function Movie({ title, posterUrl, id }: Props) {
  return (
    <Link href={`/movies/${id}`}>
      <div className="text-center p-4 shadow-2xl rounded-2xl">
        <img
          className="rounded-md"
          src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
          alt="poster"
        />
        <h1 className="text-sm font-bold mt-2 sm:text-md">{title}</h1>
      </div>
    </Link>
  );
}

export default Movie;
