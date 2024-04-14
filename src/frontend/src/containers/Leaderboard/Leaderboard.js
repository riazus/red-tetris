import { Flex, Table } from "antd";
import { useGetLeaderboard } from "./useGetLeaderboard";

function Leaderboard() {
  const { data, isLoading } = useGetLeaderboard();

  return (
    <Flex vertical align="center">
      <h1>Leaderboard</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        data && (
          <Table
            data-testid="leaderboard-data"
            columns={[
              { title: "Player Name", dataIndex: "username" },
              { title: "Score", dataIndex: "score" },
            ]}
            dataSource={data.map(({ username, score }, i) => ({
              key: i,
              username,
              score,
            }))}
            bordered={true}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: 30 }}
          />
        )
      )}
    </Flex>
  );
}

export default Leaderboard;
