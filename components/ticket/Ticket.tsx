import React from "react";
import { QrCodeIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  setTicketName: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Ticket({ title, setTicketName, setIsModalOpen }: Props) {
  const modalHandler = () => {
    setTicketName(title);
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div
      className="flex bg-white w-4/5 lg:w-3/4 2xl:w-1/2 p-4 rounded-lg justify-around items-center mx-auto shadow-xl border-2"
      onClick={modalHandler}
    >
      <QrCodeIcon className="h-12 w-12 lg:h-14 lg:w-14" />
      <div className="text-left">
        <p className="text-lg lg:text-xl">Movie: {title}</p>
        <p className="text-xs lg:text-lg">Show QR-code when requested</p>
      </div>
    </div>
  );
}

export default Ticket;
