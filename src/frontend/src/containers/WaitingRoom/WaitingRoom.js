import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";

function WaitingRoom({ players, isAdmin, isSolo }) {
  const launchGameBtnEnable = isAdmin && (isSolo ? true : players.length > 0);

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
      {launchGameBtnEnable && (
        <button onClick={() => emitAppSocketEvent(SOCKETS.START_GAME)}>
          Launch game
        </button>
      )}
    </>
  );
}

export default WaitingRoom;
