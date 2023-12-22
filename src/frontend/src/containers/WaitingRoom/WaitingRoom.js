function WaitingRoom({ players, isAdmin, launchGame }) {
  return (
    <>
      <ul>
        {players.length > 0 &&
          players.map((player, ind) => {
            return (
              <li key={ind}>
                <p>{player.username}</p>
                {player.isAdmin && <p>Admin</p>}
              </li>
            );
          })}
      </ul>
      {isAdmin && (
        <button onClick={launchGame}>Launch game</button>
      )}
    </>
  );
}

export default WaitingRoom;
