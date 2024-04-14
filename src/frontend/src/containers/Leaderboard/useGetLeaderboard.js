import { useGetLeaderboardQuery } from "../../app/api/api";

export const useGetLeaderboard = () => {
  const { data, isLoading } = useGetLeaderboardQuery();

  return { data, isLoading };
};
