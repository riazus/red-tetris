import Link from "../../components/Link";
import { useGetLeaderboardQuery } from "../../app/api/api";
import { Button, Flex, Table } from "antd";

function Leaderboard() {
  const { data, isLoading } = useGetLeaderboardQuery();
  console.log(data);

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
      {/* <Link to="#">Go to Home</Link> */}
      <Button type="primary" to="#">
        Home
      </Button>
    </Flex>
  );
}

export default Leaderboard;
