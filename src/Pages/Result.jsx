import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ParticipantsContext } from "../Context/Context";

function Result({ openModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { participantsArr } = useContext(ParticipantsContext);
  const navigate = useNavigate();
  return (
    <>
      <Button display="none" color="#fff" ref={openModal} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal size="2xl" border="1px solid" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backdropFilter: "blur(5px)" }} />
        <ModalContent>
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <TableCaption
                  m="0"
                  placement="top"
                  textAlign="left"
                  fontSize={{ base: "18px", sm: "20px" }}
                >
                  SCORE CARD
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Position</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Speed</Th>
                    <Th isNumeric>Start Time</Th>
                    <Th isNumeric>End Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {participantsArr
                    .sort((a, b) => b.speed - a.speed)
                    .slice(0, 3)
                    .map((participant, ind) => {
                      return (
                        <Tr>
                          <Td>{ind + 1}</Td>
                          <Td>{participant.name}</Td>
                          <Td>{participant.speed} KM/H</Td>
                          <Td>{participant.endTime}s</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button color="#fff" borderRadius="1px" bg="#000" m="10px" mr={3}>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button
              color="#fff"
              borderRadius="1px"
              bg="#000"
              m="10px"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Result;
