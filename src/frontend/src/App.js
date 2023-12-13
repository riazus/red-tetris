import "./App.css";
import HashRouter from "./components/HashRouter";
import Home from "./containers/Home/Home";
import Leaderboard from "./containers/Leaderboard/Leaderboard";

function App() {
  const router = [
    {
      href: "",
      element: <Home />
    },
    {
      href: "leaderboard",
      element: <Leaderboard />
    }
  ];

  return (
    <HashRouter router={router} />
  );
}

export default App;
