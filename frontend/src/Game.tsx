import "./App.css";
import {
  Heading,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function displayList(
  name: string,
  mafia: string,
  livingPlayers: string[],
  deadPlayers: string[],
  setLivingPlayers: (livingPlayers: string[]) => void,
  setDeadPlayers: (deadPlayers: string[]) => void
) {
  function handleKill(target: string) {
    setLivingPlayers(livingPlayers.filter((player) => player !== target));
    setDeadPlayers([...deadPlayers, target]);
  }
  return (
    <div className="GameList">
      {name === mafia ? (
        <div>
          <Text mb={3}>You are the killer 💀</Text>
          <Heading size="sm" mb={3}>
            Players Left Alive:
          </Heading>
          <List spacing={3} mb={10}>
            {livingPlayers.map((player) => (
              <ListItem key={player}>
                {player}
                {player !== mafia ? (
                  // a button that will handle killing the player
                  <Button
                    colorScheme="red"
                    ml={3}
                    onClick={() => handleKill(player)}
                  >
                    Kill
                  </Button>
                ) : (
                  <Text>(you)</Text>
                )}
              </ListItem>
            ))}
          </List>
          <Heading size="sm" mb={3}>
            Players Killed:
          </Heading>
          <List spacing={3} mb={10}>
            {deadPlayers.map((player) => (
              <ListItem key={player}>{player}</ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div>
          <Text mb={3}>You are a villager 😎</Text>
          <Heading size="sm" mb={3}>
            Players Left Alive:
          </Heading>
          <List spacing={3} mb={10}>
            {livingPlayers.map((player) => (
              <ListItem key={player}>{player}</ListItem>
            ))}
          </List>
          <Heading size="sm" mb={3}>
            Players Killed:
          </Heading>
          <List spacing={3} mb={10}>
            {deadPlayers.map((player) => (
              <ListItem key={player}>{player}</ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

function Game() {
  const [livingPlayers, setLivingPlayers] = useState<string[]>([
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
  ]);
  const [deadPlayers, setDeadPlayers] = useState<string[]>([]);
  const [mafia, setMafia] = useState<string>("Player 1");
  const [name, setName] = useState<string>("Player 1");

  return displayList(
    name,
    mafia,
    livingPlayers,
    deadPlayers,
    setLivingPlayers,
    setDeadPlayers
  );
}

export default Game;