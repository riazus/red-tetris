import { getAppSocket } from "../socket";
import { gameListeners, removeGameListeners } from "./gameListeners";

jest.mock("../../app/slices/gameSlice", () => ({
  addPlayer: jest.fn(),
  deletePlayer: jest.fn(),
  restartGame: jest.fn(),
  setIsGameover: jest.fn(),
  setIsSolo: jest.fn(),
  setIsStarted: jest.fn(),
  setRoomPlayers: jest.fn(),
  setTetrominos: jest.fn(),
  updatePlayersGameover: jest.fn(),
  updatePlayersScore: jest.fn(),
  updatePlayersSpectrum: jest.fn(),
}));

jest.mock("../../app/slices/playerSlice", () => ({
  restartPlayerGame: jest.fn(),
  setIsAdmin: jest.fn(),
  setIsWinner: jest.fn(),
  setRoomName: jest.fn(),
  setPlayerGameover: jest.fn(),
}));

jest.mock("../socket", () => ({
  getAppSocket: jest.fn(),
}));

describe("gameListeners", () => {
  it("should subscribe to the events", () => {
    const dispatch = jest.fn();
    const on = jest.fn();
    const off = jest.fn();

    getAppSocket.mockImplementation(() => ({ on, off }));
    gameListeners(dispatch);
    expect(on).toHaveBeenCalledTimes(11);
    expect(off).toHaveBeenCalledTimes(0);
  });

  it("should unsubscribe to the events", () => {
    const dispatch = jest.fn();
    const on = jest.fn();
    const off = jest.fn();

    getAppSocket.mockImplementation(() => ({ on, off }));
    removeGameListeners(dispatch);
    expect(off).toHaveBeenCalledTimes(10);
    expect(on).toHaveBeenCalledTimes(0);
  });
});
