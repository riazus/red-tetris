import "./App.css";
import HashRouter from "./components/HashRouter";
import Home from "./containers/Home/Home";
import GameRoomForm from "./containers/GameRoom/GameRoom";
import Leaderboard from "./containers/Leaderboard/Leaderboard";
import RoomList from "./containers/RoomList/RoomList";
import { useEffect } from "react";
import {
  connectAppSocket,
  disconnectAppSocket,
  initializeAppSocket,
} from "./sockets/socket";

const router = [
  {
    href: "",
    element: <Home />,
  },
  {
    href: "leaderboard",
    element: <Leaderboard />,
  },
  {
    href: "rooms",
    element: <RoomList />,
  },
  {
    href: ":roomName[:playerName]",
    element: <GameRoomForm />,
  },
];

function App() {
  const appSocket = initializeAppSocket();

  useEffect(() => {
    if (!appSocket) return;

    const connect = async () => {
      try {
        await connectAppSocket();
      } catch (err) {
        console.error("Error connecting to sockets", err);
      }
    };

    connect();

    return () => {
      disconnectAppSocket();
    };
  }, []);

  return <HashRouter router={router} />;
}

export default App;
