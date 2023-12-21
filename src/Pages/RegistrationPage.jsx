import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ParticipantsContext } from "../Context/Context";

function RegistrationPage() {
  const { participantsArr, setParticipantsArr } =
    useContext(ParticipantsContext);

  return (
    <Flex
      m={{ base: "30px", sm: "50px" }}
      bg="#dddfe2"
      p={{ base: "10px", sm: "20px" }}
      gap="20px"
      display="flex"
      direction={{ base: "column", sm: "column", lg: "row" }}
    >
      <RunnerDatail
        participantsArr={participantsArr}
        setParticipantsArr={setParticipantsArr}
      />

      <ListOfParticipants participantsArr={participantsArr} />
    </Flex>
  );
}

function RunnerDatail({ participantsArr, setParticipantsArr, winnersArr }) {
  const [inputName, setInputName] = useState("");
  const [inputSpeed, setInputSpeed] = useState();
  const [inputTime, setInputTime] = useState();
  const [inputLength, setInputLength] = useState();
  const [isError, setIsError] = useState(false);
  const [lengthChanged, setLengthChanged] = useState(0);

  const handleNameChange = (e) => setInputName(e.target.value);
  const handleSpeedChange = (e) => setInputSpeed(e.target.value);
  const handleTimeChange = (e) => setInputTime(e.target.value);

  const handleLengthChange = (e) => {
    /* (===NEED TO REVISE===)
    // if the track length is not selected then the default will be 100m
    let selectedLength = e.target.value;
    let newLength;
    if (selectedLength === "") {
      newLength = 100;
      setLengthChanged(lengthChanged + 1);
    }
    */

    // checks if the track length is constant for every participants
    // I'm checking it with 0, just to counter the the async nature to setter function.
    if (lengthChanged === 0) {
      setLengthChanged(lengthChanged + 1);
      setInputLength(e.target.value);
    }
  };

  function handleSubmit() {
    // I'm checking it with 9, just to counter the the async nature to setter function.
    // console.log(lengthChanged, participantsArr);
    if (participantsArr.length > 9) {
      setIsError(true);
    }

    const newParticipant = {
      name: inputName,
      speed: inputSpeed,
      time: inputTime,
      length: inputLength,
    };

    setParticipantsArr([...participantsArr, newParticipant]);
    // Clear input fields after submission
    setInputName("");
    setInputSpeed("");
    setInputTime("");
  }

  return (
    <FormControl
      isInvalid={isError}
      borderRadius="3px"
      p={{ base: "10px", sm: "20px" }}
      bg="#b7cbd4"
      w={{ base: "100%", sm: "100%", lg: "30%" }}
    >
      <FormLabel fontSize={{ base: "18px", sm: "30px" }}>
        RUNNER DETAILS
        <Text fontSize="14px">You can add maximum 10 participants</Text>
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
        type="number"
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
        type="number"
        bg="#fff"
        name="time"
        color="#000"
        value={inputTime}
        onChange={handleTimeChange}
        mb="20px"
        borderRadius="2px"
        p="25px"
      />
      <label>Track Length</label>
      <Select
        value={inputLength}
        onChange={handleLengthChange}
        name="length"
        placeholder="Select Track Length"
      >
        <option value="100">100m</option>
        <option value="200">200m</option>
        <option value="400">400m</option>
      </Select>
      <FormErrorMessage fontSize="16px">
        You cannot add more than 10 participants. Please start the race.
      </FormErrorMessage>
      <Button mt={4} onClick={handleSubmit} borderRadius="2px" bg="#000">
        + ADD RUNNER
      </Button>
    </FormControl>
  );
}

function ListOfParticipants({ participantsArr }) {
  return (
    <Box
      border="1px solid"
      color="#000"
      bg="#fff"
      w={{ base: "100%", sm: "100%", lg: "70%" }}
      p={{ base: "10px", sm: "20px" }}
    >
      <TableContainer>
        <Table variant="simple">
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
                <Tr key={participant.id}>
                  <Td>{participant.name}</Td>
                  <Td>{participant.speed} KM/H</Td>
                  <Td>{participant.time}</Td>
                  <Td>-</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="flex-end">
        <Button borderRadius="1px" bg="#000" m="10px">
          <Link to="/racepage">Start</Link>
        </Button>
      </Flex>
    </Box>
  );
}

export default RegistrationPage;
