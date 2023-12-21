import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SOCKETS } from "../../const";
import io from "socket.io-client";

// TODO
const API_BASE_URL = "http://localhost:5000";

let socket;
export function getSocket() {
  if (!socket) {
    console.log("Create new socket connection");
    socket = io(API_BASE_URL, { path: "/socket" });
  }
  return socket;
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getLeaderboard: builder.query({ query: () => ({ url: "leaderboard" }) }),
    getAvailableRooms: builder.query({
      query: () => ({ url: "rooms" }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(SOCKETS.ADD_WAITING_ROOM, (newRoom) => {
            updateCachedData((draft) => {
              draft.push(newRoom);
            });
          });

          socket.on(SOCKETS.DELETE_WAITING_ROOM, (deletedRoom) => {
            updateCachedData((draft) => {
              const ind = draft.findIndex(
                (room) => room.name === deletedRoom.name
              );
              draft.splice(ind, 1);
            });
          });

          await cacheEntryRemoved;

          socket.off(SOCKETS.ADD_WAITING_ROOM);
          socket.off(SOCKETS.DELETE_WAITING_ROOM);
        } catch {}
      },
    }),
    addPlayerToLeaderboard: builder.mutation({
      query: (body) => ({
        url: "leaderboard",
        body,
        method: "POST",
        responseHandler: (res) => {
          if (res.status === 201) res.text();
        },
      }),
    }),
    createUser: builder.mutation({
      queryFn: (username) => {
        const socket = getSocket();
        return {
          data: new Promise((resolve) => {
            socket.emit(SOCKETS.CREATE_USER, { username }, (response) =>
              resolve(response)
            );
          }),
        };
      },
    }),
    createRoom: builder.mutation({
      queryFn: (data) => {
        const socket = getSocket();
        return {
          data: new Promise((resolve) => {
            socket.emit(SOCKETS.CREATE_ROOM, data, (response) =>
              resolve(response)
            );
          }),
        };
      },
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useCreateUserMutation,
  useCreateRoomMutation,
  useGetAvailableRoomsQuery,
  useAddPlayerToLeaderboardMutation,
} = api;
