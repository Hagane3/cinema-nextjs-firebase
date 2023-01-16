import { Inter } from "@next/font/google";
import { useActiveUser } from "../hooks/useActiveUser";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useActiveUser();
  return (
    <section className="flex justify-center items-center h-screen">
      <h1 className="text-3xl md:text-5xl">Homepage</h1>
    </section>
  );
}
