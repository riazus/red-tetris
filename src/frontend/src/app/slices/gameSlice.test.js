import { setupStore } from "../utils";
import {
  addPlayer,
  clearRoom,
  deletePlayer,
  restartGame,
  setIsGameover,
  setIsSolo,
  setIsStarted,
  setIsWaiting,
  setRoomPlayers,
  setTetrominos,
  updatePlayersGameover,
  updatePlayersScore,
  updatePlayersSpectrum,
} from "./gameSlice";

describe("gameSlice", () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  it("should addPlayer", () => {
    store.dispatch(addPlayer());
  });

  it("should deletePlayer", () => {
    store.dispatch(deletePlayer());
  });

  it("should setRoomPlayers", () => {
    store.dispatch(setRoomPlayers([]));
  });

  it("should setIsStarted", () => {
    store.dispatch(setIsStarted());
  });

  it("should setIsGameover", () => {
    store.dispatch(setIsGameover());
  });

  it("should setIsSolo", () => {
    store.dispatch(setIsSolo());
  });

  it("should updatePlayersSpectrum", () => {
    store.dispatch(setRoomPlayers([{ username: "lol", spectrum: [] }]));
    store.dispatch(updatePlayersSpectrum({ username: "lol", spectrum: [] }));
  });

  it("should updatePlayersScore", () => {
    store.dispatch(setRoomPlayers([{ username: "lol", score: 100 }]));
    store.dispatch(updatePlayersScore({ username: "lol", score: 150 }));
  });

  it("should updatePlayersGameover", () => {
    store.dispatch(updatePlayersGameover());
  });

  it("should clearRoom", () => {
    store.dispatch(clearRoom());
  });

  it("should restartGame", () => {
    store.dispatch(restartGame([]));
  });

  it("should setTetrominos", () => {
    store.dispatch(setTetrominos());
  });

  it("should setIsWaiting", () => {
    store.dispatch(setIsWaiting());
  });
});
