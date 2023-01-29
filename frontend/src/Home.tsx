import "./App.css";
import {
  Heading,
  Input,
  Button,
  Card,
  CardBody,
  Stack,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

// import socket from "./App";

const ROOM_CODE_LENGTH: number = 4;

const generateCode = () => {
  let result: string = "";
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength: number = characters.length;
  let counter: number = 0;
  while (counter < ROOM_CODE_LENGTH) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const createRoom = (room: string, joinRoom: () => void) => {
  const code: string = generateCode();
  room = code;
  // joinRoom();
  return code;
};

function OpenGameHostModal(room: string, joinRoom: () => void, name: string) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // socket.emit("newUser", { name, socketID: socket.id });

  const [players, setPlayers] = useState<string[]>([]);
  const newRoom = createRoom(room, joinRoom);

  // set the players list to a list of one name, the host's name
  useEffect(() => {
    setPlayers([name]);
  }, [isOpen]);
  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen}>
        Host Game
      </Button>

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Hosting a new Game</ModalHeader>
          <ModalBody>
            <Text mb={1}>
              Hi, <strong>{name}</strong>! To invite players to your game, share
              the following game code with them:
            </Text>
            <Heading as="h3" mb={10}>
              Game Code: {newRoom}
            </Heading>
            <Heading size="md" mb={2}>
              Players in Lobby:
            </Heading>
            <List spacing={3} mb={5}>
              {players.map((player) => (
                <ListItem key={player}>{player}</ListItem>
              ))}
            </List>
            <ButtonGroup spacing={4}>
              {players.length >= 4 ? (
                <Button colorScheme="green">
                  <a href="/game">Start Game</a>
                </Button>
              ) : (
                <div>
                  <Button colorScheme="green" isDisabled>
                    Start Game
                  </Button>
                  <Text>
                    A minimum of 4 players are required to start the game.
                  </Text>
                </div>
              )}
              <Button colorScheme="red" onClick={onClose}>
                Cancel Game
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function JoinModal(name: string) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [room, setRoom] = useState<string>("");
  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen}>
        Join Game
      </Button>

      <Modal isOpen={isOpen} size={"lg"} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Joining a Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={1}>
              Hi, <strong>{name}</strong>!
            </Text>
            <Text mb={3}>
              Ask the Host for the four-digit Game Code and enter it below:
            </Text>
            <Input
              placeholder="Game Code"
              mb={5}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button
              colorScheme="blackAlpha"
              mb={4}
              onClick={() => {
                alert("Sending request to join game...");
              }}
            >
              Join Game
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

interface HomeProps {
  // setRoom: (room: string) => void;
  room: string;
  joinRoom: () => void;
}

function Home({ room, joinRoom }: HomeProps) {
  const [name, setName] = useState<string>("");
  return (
    <div className="Home">
      <Heading as="h1" size="2xl" mt={20} mb={20}>
        Mafia
      </Heading>
      <Input
        placeholder="Your Name"
        mb={10}
        onChange={(e) => setName(e.target.value)}
      />
      <Stack spacing={10}>
        {OpenGameHostModal(room, joinRoom, name)}
        {JoinModal(name)}
      </Stack>
    </div>
  );
}

export default Home;
