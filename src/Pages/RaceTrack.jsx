import { Box, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ParticipantsContext } from "../Context/Context";
import Result from "./Result";

function RacePage() {
  const { participantsArr, setParticipantsArr } =
    useContext(ParticipantsContext);
  const [stopTimer, setStopTimer] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);
    if (stopTimer) clearTimeout(timerId);
  }, [timer]);

  let openModal = useRef();
  let participantsArrLength = participantsArr.length;

  let winnerCount = 0;
  function updateWinnerCount() {
    // const endTime = new Date();
    console.log(winnerCount, participantsArrLength);
    if (
      participantsArrLength < 3 &&
      winnerCount === participantsArrLength - 1
    ) {
      openModal.current.click();
    } else if (winnerCount === 2) {
      // console.log("winnerCount", winnerCount);
      openModal.current.click();
      setStopTimer(true);
    } else {
      winnerCount++;
      setParticipantsArr(
        participantsArr.map((participant) => {
          return { ...participant, endTime: timer };
        })
      );
      // console.log(winnerCount, "winner added!");
    }
  }

  // Updating the winners
  useEffect(() => {
    let circles = document.querySelectorAll(".animateMotion");
    for (let item of circles) {
      item.addEventListener("endEvent", updateWinnerCount);
    }
  }, []);

  const pathArr = [
    {
      id: 1,
      path: "M127 120 180 120C200 120 200 155 180 155L120 155C100 155 100 120 120 120",
      color: "red",
      bg: "#008000",
    },
    {
      id: 2,
      path: "M134 110 190 110C221 110 221 165 190 165L110 165C81 165 80 110 120 110",
      color: "black",
    },
    {
      id: 3,
      path: "M141 100 200 100C241 100 241 175 200 175L100 175C61 175 60 98 120 100",
      color: "grey",
    },
    {
      id: 4,
      path: "M148 90 210 90C261 90 261 185 210 185L90 185C41 185 40 85 120 90",
      color: "blue",
    },
    {
      id: 5,
      path: "M155 80 220 80C281 80 281 195 220 195L80 195C21 195 20 73 120 80",
      color: "green",
    },
    {
      id: 6,
      path: "M162 70 230 70C301 70 301 205 230 205L70 205C1 185 0 70 120 70",
      color: "pink",
    },
    {
      id: 7,
      path: "M169 60 240 60C321 60 321 215 240 215L60 215C-19 200 -20 60 120 60",
      color: "brown",
    },
    {
      id: 8,
      path: "M176 50 250 50C341 50 341 225 250 225L50 225C-39 205 -40 50 120 50",
      color: "yellow",
    },
    {
      id: 9,
      path: "M183 40 260 40C361 40 361 235 260 235L40 235C-59 225 -70 35 120 40",
      color: "purple",
    },
    {
      id: 10,
      path: "M190 30 270 30C381 30 381 245 270 245L30 245C-89 225 -90 20 120 30",
      color: "teal",
    },
  ];

  let partcipantTrack = participantsArr.slice(0, 10).map((item, ind) => {
    return {
      ...item,
      id: ind + 1,
      path: pathArr[ind].path,
      color: pathArr[ind].color,
      bg: pathArr[ind].bg,
    };
  });

  return (
    <Box border="1px solid red" bg="#b7cbd4">
      <svg
        style={{ border: "1px solid green" }}
        width="100%"
        height="100vh"
        viewBox="0 0 300 300"
      >
        <rect width="100%" height="100%" fill="transparent" />

        {/* Race track path */}
        {partcipantTrack.map((participant) => {
          return (
            <path
              key={participant.id}
              id={`path${participant.id}`}
              d={participant.path}
              // fill="transparent"
              fill={participant.bg ? participant.bg : "transparent"}
              stroke="#000"
            />
          );
        })}
        {/* Participant */}
        {partcipantTrack.map((participant) => {
          return (
            <circle key={participant.id} r="4" fill={participant.color}>
              <animateMotion
                className="animateMotion"
                dur={`${
                  participant.length * (3600 / (participant.speed * 1000))
                }s`}
                startOffset="50%"
                repeatCount="1"
                fill="freeze"
                keyPoints="0;1"
                keyTimes="0;1"
              >
                <mpath href={`#path${participant.id}`} />
              </animateMotion>
            </circle>
          );
        })}
      </svg>
      <Result openModal={openModal} />
      <Stopwatch timer={timer} />
    </Box>
  );
}

function Stopwatch({ timer }) {
  return (
    <VStack
      color="#51dc85"
      p={{ base: "5px 10px", sm: "5px 10px", md: "10px 20px" }}
      fontSize={{ base: "18px", md: "20px" }}
      lineHeight=".6"
      style={{
        position: "absolute",
        top: "46%",
        left: "50%",
        borderRadius: "50px",
        zIndex: "9",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Text>Elapsed time</Text>
      <Text as="b" fontSize="30px">{`${timer}s`}</Text>
    </VStack>
  );
}

export default RacePage;
