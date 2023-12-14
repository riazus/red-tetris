import "./App.css";
import HashRouter from "./components/HashRouter";
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
  ];

  return <HashRouter router={router} />;
}

export default App;
