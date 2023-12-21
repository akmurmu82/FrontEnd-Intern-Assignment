import { createContext, useRef, useState } from "react";

export const ParticipantsContext = createContext();

function ParticipantsContextProvider({ children }) {
  const [participantsArr, setParticipantsArr] = useState([]);
  const startBtn = useRef();
 
  return (
    <ParticipantsContext.Provider
      value={{
        participantsArr,
        startBtn,
        setParticipantsArr,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}

export default ParticipantsContextProvider;
