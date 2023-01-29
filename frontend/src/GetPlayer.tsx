// @ts-ignore
import React, {createContext, useEffect, useState} from 'react';
// @ts-ignore
import axios from "axios";

// @ts-ignore
export const AppContext = createContext();


function GetPlayer() {

  const [reading, setReading] = useState("")
  const [disableReading, setDisableReading] = React.useState(false);


  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };

const handleReading = () => {
console.log("Click recieved, waiting on backend...")
axios.get("http://10.38.34.73:5174/getCard", config)
              // @ts-ignore
              .then(response => {
              console.log("this is response.data for getPlayerDeath: " + response.data);
              setReading(response.data);
              })
              //@ts-ignore
              .catch(error => {
              console.log(error);
              });
}
  return (
    <div>
      <button disabled={disableReading} onClick={handleReading}> Kill Player </button>
      <div className="Reading"> {reading} </div>
    </div>
  );
}

export default GetPlayer;