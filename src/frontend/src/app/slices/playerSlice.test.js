import { setupStore } from "../utils";
import {
  exitRoom,
  restartPlayerGame,
  setIsAdmin,
  setIsGameover,
  setIsWinner,
  setRoomName,
  setUsername,
  updateScore,
  updateSpectrum,
} from "./playerSlice";

describe("playerSlice", () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  it("should setUsername", () => {
    store.dispatch(setUsername());
  });

  it("should setRoomName", () => {
    store.dispatch(setRoomName());
  });

  it("should updateScore", () => {
    store.dispatch(updateScore());
  });

  it("should updateSpectrum", () => {
    store.dispatch(updateSpectrum());
  });

  it("should setIsAdmin", () => {
    store.dispatch(setIsAdmin());
  });

  it("should setIsGameover", () => {
    store.dispatch(setIsGameover());
  });

  it("should setIsWinner", () => {
    store.dispatch(setIsWinner());
  });

  it("should restartPlayerGame", () => {
    store.dispatch(restartPlayerGame());
  });

  it("should exitRoom", () => {
    store.dispatch(exitRoom());
  });
});
