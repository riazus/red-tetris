import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, SOCKETS } from "../../const";
import { emitAppSocketEvent, getAppSocket } from "../../sockets/socket";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: () => ({ url: "leaderboard" }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getAppSocket();
          if (!socket) throw new Error("Cannot find socket connection");

          socket.on(SOCKETS.ADD_LEADER, ({ username, score }) => {
            updateCachedData((draft) => {
              const ind = draft.findIndex((d) => d.username === username);

              if (ind !== -1) draft[ind].score = score;
              else draft.push({ username, score });
            });
          });

          await cacheEntryRemoved;

          socket.off(SOCKETS.ADD_LEADER);
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getAvailableRooms: builder.query({
      query: () => ({ url: "rooms" }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getAppSocket();
          if (!socket) throw new Error("Cannot find socket connection");

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
        } catch (err) {
          console.error(err);
        }
      },
    }),
    createUser: builder.mutation({
      queryFn: (username) => {
        return {
          data: new Promise((resolve, reject) => {
            try {
              emitAppSocketEvent(
                SOCKETS.CREATE_USER,
                { username },
                (response) => resolve(response)
              );
            } catch (err) {
              reject(err);
            }
          }),
        };
      },
    }),
    createRoom: builder.mutation({
      queryFn: (data) => {
        return {
          data: new Promise((resolve, reject) => {
            try {
              emitAppSocketEvent(SOCKETS.CREATE_ROOM, data, (response) =>
                resolve(response)
              );
            } catch (err) {
              reject(err);
            }
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
} = api;
