export const SOCKETS = {
  CREATE_USER: "create_user",
  UPDATE_ROOM_PLAYERS: "update_room_players",
  ADD_ROOM_PLAYER: "add_room_player",
  DELETE_ROOM_PLAYER: "delete_room_player",
  ENTER_ROOM: "enter_room",
  CREATE_ROOM: "create_room",
  EXIT_ROOM: "exit_room",
  ON_ERROR: "on_error",
  GAMEOVER: "gameover",
  UPDATE_SPECTRUM: "update_spectrum",
  UPDATE_SCORE: "update_score",
  GAME_STARTED: "game_started",
  GAME_FINISHED: "game_finished",
  RESTART_GAME: "restart_game",
  ADD_WAITING_ROOM: "add_waiting_room",
  DELETE_WAITING_ROOM: "delete_waiting_room",
  ADD_LEADER: "add_leader",
  SET_ADMIN_STATUS: "set_admin_status",
  ASSIGN_WINNER: "assign_winner",
  PLAYER_GAMEOVER: "player_gameover",
};

export const API_BASE_URL = `http://localhost:${process.env.API_PORT ?? 5000}`;
