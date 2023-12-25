import { useSelector } from "react-redux";
import { emitAppSocketEvent } from "../../sockets/socket";
import { SOCKETS } from "../../const";

function WaitingRoom({ players }) {
  const { isAdmin } = useSelector((root) => root.player);
  const { isSolo } = useSelector((root) => root.game);

  const launchGame = () => {
    emitAppSocketEvent(SOCKETS.START_GAME);
  };

  const launchGameBtnEnable = () =>
    isAdmin && (isSolo ? true : players.length > 0);

  return (
    <>
      <ul>
        {players.length > 0 &&
          players.map((player, ind) => {
            return (
              <li key={ind}>
                <p>{player.username}</p>
                {player.isAdmin && <p>Admin</p>}
              </li>
            );
          })}
      </ul>
      {launchGameBtnEnable() && <button onClick={launchGame}>Launch game</button>}
    </>
  );
}

export default WaitingRoom;
