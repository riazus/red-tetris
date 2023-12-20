import "./App.css";
import HashRouter from "./components/HashRouter";
import Home from "./containers/Home/Home";
import GameRoomForm from "./containers/GameRoom/GameRoom";
import Leaderboard from "./containers/Leaderboard/Leaderboard";
import RoomList from "./containers/RoomList/RoomList";

function App() {
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

  return <HashRouter router={router} />;
}

export default App;
