import { Flex, Table } from "antd";
import { useGetLeaderboardQuery } from "../../app/api/api";

function Leaderboard() {
  const { data, isLoading } = useGetLeaderboardQuery();

  return (
    <Flex vertical align="center">
      <h1>Leaderboard</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        data && (
          <Table
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
