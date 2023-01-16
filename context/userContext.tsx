import { createContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

const UserContext = createContext<any>("");

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<any>(null);

  const setUserHandler = (user: any) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ setUserHandler, user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
