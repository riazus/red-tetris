import { useEffect } from "react";
import HashRouter from "./components/HashRouter";
import GameRoomForm from "./containers/GameRoom/GameRoom";
import Home from "./containers/Home/Home";
import Leaderboard from "./containers/Leaderboard/Leaderboard";
import RoomList from "./containers/RoomList/RoomList";
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
  useEffect(() => {
    initializeAppSocket();

    (async () => {
      await connectAppSocket();
    })();

    return () => {
      disconnectAppSocket();
    };
  }, []);

  return <HashRouter router={router} />;
}

export default App;
