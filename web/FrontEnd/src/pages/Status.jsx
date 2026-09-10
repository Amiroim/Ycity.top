import useServerStatus from "../hooks/useServerStatus";
import "../styles/Status.css";

function Status() {
  const status = useServerStatus();

  const players = status?.players.list || [];
  const totalSlots = status?.players.max || 50;
  const slots = Array.from({ length: totalSlots }, (_, i) => players[i] || null);

  return (
    <main className="status">
      <div className="playersStatus">
        {status?.players.online || 0} / {status?.players.max || 50}
      </div>
      <div className="playersGrid">
        {slots.map((player, idx) => (
          <div className={`player ${player ? "" : "empty"}`} key={idx}>
            <div className="logo">
              {player ? player.name[0].toUpperCase() : "-"}
            </div>
            <div className="name">
              {player ? player.name : "offline"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Status;
