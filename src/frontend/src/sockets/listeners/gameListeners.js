import {
  addPlayer,
  deletePlayer,
  restartGame,
  setIsGameover,
  setIsSolo,
  setIsStarted,
  setRoomPlayers,
  setTetrominos,
  updatePlayersGameover,
  updatePlayersScore,
  updatePlayersSpectrum,
} from "../../app/slices/gameSlice";
import {
  restartPlayerGame,
  setIsAdmin,
  setIsWinner,
  setRoomName,
  setIsGameover as setPlayerGameover,
} from "../../app/slices/playerSlice";
import { SOCKETS } from "../../const";
import { getAppSocket } from "../socket";

export const gameListeners = (dispatch) => {
  const socket = getAppSocket();

  socket.on(
    SOCKETS.ENTER_ROOM,
    ({ isAdmin, roomName, isSolo, roomPlayers }) => {
      dispatch(setIsAdmin(isAdmin));
      dispatch(setRoomName(roomName));
      dispatch(setIsSolo(isSolo));
      dispatch(setRoomPlayers(roomPlayers));
    }
  );

  socket.on(SOCKETS.ADD_ROOM_PLAYER, ({ player }) =>
    dispatch(addPlayer(player))
  );

  socket.on(SOCKETS.DELETE_ROOM_PLAYER, ({ username }) =>
    dispatch(deletePlayer(username))
  );

  socket.on(SOCKETS.GAME_STARTED, (tetrominos) => {
    dispatch(setIsStarted(true));
    dispatch(setTetrominos(tetrominos));
    dispatch(setIsGameover(false));
    dispatch(setPlayerGameover(false));
  });

  socket.on(SOCKETS.RESTART_GAME, ({ isAdmin, players }) => {
    dispatch(restartPlayerGame(isAdmin));
    dispatch(restartGame(players));
  });

  socket.on(SOCKETS.UPDATE_SPECTRUM, (payload) => {
    dispatch(updatePlayersSpectrum(payload));
  });

  socket.on(SOCKETS.UPDATE_SCORE, (payload) => {
    dispatch(updatePlayersScore(payload));
  });

  socket.on(SOCKETS.SET_ADMIN_STATUS, () => dispatch(setIsAdmin(true)));

  socket.on(SOCKETS.ASSIGN_WINNER, () => dispatch(setIsWinner(true)));

  socket.on(SOCKETS.PLAYER_GAMEOVER, ({ username }) =>
    dispatch(updatePlayersGameover(username))
  );

  socket.on(SOCKETS.GAMEOVER, () => dispatch(setIsGameover(true)));
};

export const removeGameListeners = () => {
  const socket = getAppSocket();

  socket.off(SOCKETS.ADD_ROOM_PLAYER);
  socket.off(SOCKETS.DELETE_ROOM_PLAYER);
  socket.off(SOCKETS.GAME_STARTED);
  socket.off(SOCKETS.RESTART_GAME);
  socket.off(SOCKETS.UPDATE_SPECTRUM);
  socket.off(SOCKETS.UPDATE_SCORE);
  socket.off(SOCKETS.SET_ADMIN_STATUS);
  socket.off(SOCKETS.ASSIGN_WINNER);
  socket.off(SOCKETS.PLAYER_GAMEOVER);
  socket.off(SOCKETS.GAMEOVER);
};
