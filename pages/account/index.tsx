import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import Ticket from "../../components/ticket/Ticket";
import { QrCodeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getDatabase, ref, onValue } from "firebase/database";

type Props = {
  displayName?: any;
  email?: any;
};

function Index() {
  const [activeUser, setActiveUser] = useState<Props>({
    displayName: "",
    email: "",
  });
  const [tickets, setTickets] = useState<any>([""]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketName, setTicketName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setActiveUser({
          displayName: user.displayName,
          email: user.email,
        });
        const db = getDatabase();
        const starCountRef = ref(db, "users/" + user.uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setTickets(Object.values(data));
        });
      }
    });
  }, []);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  console.log(tickets);

  return (
    <section className="grid sm:grid-cols-2  h-screen items-center text-center">
      {isModalOpen ? (
        <div className="absolute shadow-xl w-2/3 translate-x-1/4 rounded-xl bg-white p-4 border-2 lg:w-1/4 lg:left-1/2 lg:-translate-x-1/2">
          <XMarkIcon
            className="absolute top-0 right-0 w-6 h-6 m-2 md:w-10 md:h-10"
            onClick={closeModalHandler}
          />
          <h1 className="text-2xl">{ticketName}</h1>
          <QrCodeIcon className="w-50 h-50" />
        </div>
      ) : (
        ""
      )}
      <div>
        <h1 className="text-lg font-bold">Tickets:</h1>
        <div className="">
          <ul className="w-full mt-2 flex flex-col gap-4">
            {tickets.map((ticket: any, key: number) => {
              return (
                <Ticket
                  key={key}
                  title={ticket.title}
                  setIsModalOpen={setIsModalOpen}
                  setTicketName={setTicketName}
                />
              );
            })}
          </ul>
        </div>
      </div>

      <div className="order-1 sm:order-2">
        <h1 className="text-lg font-bold lg:text-xl">User details:</h1>
        <p className="lg:text-lg">Username: {activeUser.displayName}</p>
        <p className="lg:text-lg">Email: {activeUser.email}</p>
      </div>
    </section>
  );
}

export default Index;
