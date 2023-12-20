function WaitingRoom({ players, isAdmin }) {
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
      {isAdmin && <button>Launch game</button>}
    </>
  );
}

export default WaitingRoom;
