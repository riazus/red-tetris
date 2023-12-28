import "./App.css";
import HashRouter from "./components/HashRouter";
import Tetris from "./components/Tetris";
import Home from "./containers/Home/Home";
import IncreaseScoreForm from "./containers/IncreaseScoreForm/IncreaseScoreForm";
import Leaderboard from "./containers/Leaderboard/Leaderboard";

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
      href: "room[]",
      element: <IncreaseScoreForm />,
    },
    {
      href: "tetris",
      element: <Tetris />,
    },
  ];

  return <HashRouter router={router} />;
}

export default App;
