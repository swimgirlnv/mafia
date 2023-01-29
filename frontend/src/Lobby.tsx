import "./App.css";
import { Heading, Button, ButtonGroup, List, ListItem } from "@chakra-ui/react";

function Lobby() {
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
        <ListItem>Player 1</ListItem>
        <ListItem>Player 2</ListItem>
        <ListItem>Player 3</ListItem>
      </List>
      <ButtonGroup spacing={4}>
        <Button colorScheme="green">Start Game</Button>
        <Button colorScheme="red">Cancel Game</Button>
      </ButtonGroup>
    </div>
  );
}

export default Lobby;
