import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export default function Player(props: { playerName: string }) {
  return (
    <div className="Player">
        <div className="container">
        <b>{props.playerName}</b>
      </div>
    </div>
  );
}