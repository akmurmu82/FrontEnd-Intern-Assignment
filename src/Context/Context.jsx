import { createContext, useState } from "react";

export const ParticipantsContext = createContext();

function ParticipantsContextProvider({ children }) {
  const [participantsArr, setParticipantsArr] = useState([]);
 
  return (
    <ParticipantsContext.Provider
      value={{
        participantsArr,
        setParticipantsArr,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}

export default ParticipantsContextProvider;
