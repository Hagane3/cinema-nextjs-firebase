import React from "react";
import { GetServerSideProps } from "next";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
  name: string;
  id: number;
};

function Slug({ data }: any) {
  const sendTicketHandler = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        set(ref(db, "users/" + user.uid + `/${data.id}`), {
          title: data.title,
        });
        return;
      }

      alert("You need to be logged in to book a ticket");
    });
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 lg:justify-center lg:items-center pt-24 pb-8 sm:pt-32 lg:h-screen lg:p-0">
      <img
        className="w-3/4 mx-auto sm:w-1/2 lg:drop-shadow-2xl"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      ></img>
      <div className="pt-6 mx-auto flex flex-col justify-center items-center gap-6">
        <ul className="flex flex-col gap-4 w-5/6 mx-auto sm:text-2xl lg:w-100">
          <li className="border-b-2 pb-2">
            <strong>Title:</strong> {data.title}
          </li>
          <li className="border-b-2 pb-2">
            <strong>Genre:</strong>
            {data.genres.map((item: Props) => {
              return <span key={item.id}>{` ${item.name} / `}</span>;
            })}
          </li>
          <li className="border-b-2 pb-2">
            <strong>Runtime:</strong> {`${(data.runtime / 60).toFixed(1)} h`}
          </li>
          <li className="border-b-2 pb-2">
            <strong>Release date:</strong> {data.release_date}
          </li>
        </ul>
        <button
          onClick={sendTicketHandler}
          className="bg-orange-200font-bold border-2 border-orange-400 text-orange-800 rounded-2xl px-4 py-3 lg:drop-shadow-xl lg:w-100 md:px-12 md:text-xl 2xl:text-2xl transition duration-700 ease-in-out hover:bg-orange-100"
        >
          BOOK NOW
        </button>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${slug}?api_key=54fbefb39b3c6f8813fbef283702f5fc`
  );
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};

export default Slug;
