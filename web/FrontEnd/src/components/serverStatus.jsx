import useServerStatus from '../hooks/useServerStatus';
import red from '../assets/red.svg';
import green from '../assets/green.svg';

import "../styles/serverStatus.css";

export default function ServerStatus() {
  const status = useServerStatus();

  if (!status) return <div>Loading The queries...</div>;

  return (
    <div className='statusPart'>
      <h2>
        Server Status: {status.online 
          ? <div class="status-indicator"></div> 
          : <img src={red} className="serverStatus" alt="off" />}
      </h2>
      {status.online && (
        <p>
          Players: {status.players.online} / {status.players.max} <br />
          MOTD: {status.motd} <br />
          Version: {status.version} <br />
          Latency: {status.latencyMs}ms
        </p>
      )}
    </div>
  );
}
