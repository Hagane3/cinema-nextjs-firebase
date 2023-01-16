import React from "react";
import Movie from "../../components/movie/Movie";

type Props = {
  id: number;
  title: string;
  poster_path: string;
};

function index({ data }: any) {
  const movies = data.results;
  return (
    <div className="grid grid-cols-2 gap-4 px-4 pt-20 mb-8 md:gap-12 md:px-12 md:my-12 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie: Props) => {
        return (
          <Movie
            key={movie.id}
            title={movie.title}
            posterUrl={movie.poster_path}
            id={movie.id}
          />
        );
      })}
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=54fbefb39b3c6f8813fbef283702f5fc`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
};

export default index;
