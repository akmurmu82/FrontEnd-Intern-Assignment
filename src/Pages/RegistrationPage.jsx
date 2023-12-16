import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

function RegistrationPage() {
  const [participantsArr, setParticipantsArr] = useState([]);

  return (
    <Flex
      m={{ base: "30px", sm: "50px" }}
      bg="#dddfe2"
      p="40px"
      gap="20px"
      display="flex"
      direction={{ base: "column", sm: "row" }}
    >
      <RunnerDatail
        participantsArr={participantsArr}
        setParticipantsArr={setParticipantsArr}
      />

      <ListOfParticipants participantsArr={participantsArr} />
    </Flex>
  );
}

function RunnerDatail({ participantsArr, setParticipantsArr }) {
  const [inputName, setInputName] = useState("");
  const [inputSpeed, setInputSpeed] = useState("");
  const [inputTime, setInputTime] = useState("");

  const handleNameChange = (e) => setInputName(e.target.value);
  const handleSpeedChange = (e) => setInputSpeed(e.target.value);
  const handleTimeChange = (e) => setInputTime(e.target.value);

  function handleSubmit() {
    const newParticipant = {
      name: inputName,
      speed: inputSpeed,
      time: inputTime,
    };

    setParticipantsArr([...participantsArr, newParticipant]);
    console.log(participantsArr);

    // Clear input fields after submission
    setInputName("");
    setInputSpeed("");
    setInputTime("");
  }

  return (
    <FormControl
      borderRadius="3px"
      p={{ base: "10px", sm: "20px" }}
      bg="#b7cbd4"
      w="30%"
    >
      <FormLabel fontSize={{ base: "18px", sm: "30px" }}>
        RUNNER DETAILS
        <Text fontSize="14px">*You can add maximum 10 participants</Text>
      </FormLabel>

      <label>Name</label>
      <Input
        bg="#fff"
        type="text"
        name="name"
        color="#000"
        value={inputName}
        onChange={handleNameChange}
        mb="20px"
        borderRadius="2px"
        p="25px"
      />

      <label>Speed</label>
      <Input
        type="text"
        bg="#fff"
        name="speed"
        color="#000"
        value={inputSpeed}
        onChange={handleSpeedChange}
        mb="20px"
        borderRadius="2px"
        p="25px"
      />

      <label>Start time</label>
      <Input
        type="text"
        bg="#fff"
        name="time"
        color="#000"
        value={inputTime}
        onChange={handleTimeChange}
        mb="20px"
        borderRadius="2px"
        p="25px"
      />
      <Button mt={4} onClick={handleSubmit} borderRadius="2px" bg="#000">
        + ADD RUNNER
      </Button>
    </FormControl>
  );
}

function ListOfParticipants({ participantsArr }) {
  return (
    <Box border="1px solid" w="70%" p={{ base: "10px", sm: "20px" }}>
      <TableContainer>
        <Table variant="striped">
          <TableCaption
            m="0"
            placement="top"
            fontSize={{ base: "18px", sm: "30px" }}
          >
            LIST OF PARTICIPANTS
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Speed</Th>
              <Th isNumeric>Start Time</Th>
              <Th isNumeric>End Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participantsArr.map((participant) => {
              return (
                <Tr>
                  <Td>{participant.name}</Td>
                  <Td>{participant.speed}</Td>
                  <Td>{participant.time}</Td>
                  <Td>-</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="flex-end">
        <Button bg='#000' m='10px'>Start</Button>
      </Flex>
    </Box>
  );
}

export default RegistrationPage;
