import "./App.css";
import { Heading, Button, ButtonGroup, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import Player from "./Player";

function Lobby() {

  const [lobbyList, setLobbyList] = useState([""])

  const addToLobby = (playerName: string) => {
    if (lobbyList.length === 0) {
      setLobbyList([playerName])
    } else {
      lobbyList.push(playerName)
    }
  }

  const removeFromLobby = (playerName: string) => {
    if (lobbyList.includes(playerName)) {
      const index = lobbyList.indexOf(playerName)
      const sliced = lobbyList.splice(index, 1)
      if (index > -1 && lobbyList.length !== 0) {
        setLobbyList(sliced)
      }
      if (lobbyList.length === 0) {
        setLobbyList([])
      }
    }
  }

  let displayedItems = ["Becca", "Theo", "Alex", "Robert"]

  return (
    <div className="Lobby">
      <Heading as="h1" size="2xl" mb={10}>
        Game Lobby
      </Heading>
      <Heading as="h2" size="xl" mb={10}>
        Game Code: CODE
      </Heading>
      <Heading as="h3" size="md" mb={2}>
        Players in Lobby:
      </Heading>
      <List spacing={3} mb={10}>
        {displayedItems.map((player, index) => (
          <div className="player" key={player}>
            <Player {...player} />
          </div>
        ))}
      </List>
      <ButtonGroup spacing={4}>
        <Button colorScheme="green">Start Game</Button>
        <Button colorScheme="red">Cancel Game</Button>
      </ButtonGroup>
    </div>
  );
}

export default Lobby;