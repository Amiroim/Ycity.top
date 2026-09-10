import { useEffect, useState } from 'react';

export default function useServerStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('https://api.mcsrvstat.us/3/steve.9craft.ir:18688');
        const data = await res.json();
        setStatus({
          online: data.online,
          ip: data.ip,
          port: data.port,
          motd: data.motd?.clean || [],
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
            list: data.players?.list || []
          },
          version: data.version,
          software: data.software
        });
      } catch (err) {
        console.error('Failed to fetch server status', err);
        setStatus(null);
      }
    };

    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
