import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initPeer, connectToPeer } from '../../lib/peer';

export default function ChatRoom() {
  const router = useRouter();
  const { room } = router.query;
  const [messages, setMessages] = useState<string[]>([]);
  const [peerId, setPeerId] = useState('');
  const [conn, setConn] = useState<any>(null);

  useEffect(() => {
    if (!room) return;
    const id = room as string;
    const peer = initPeer(id);
    setPeerId(peer.id);

    peer.on('connection', (connection) => {
      setConn(connection);
      connection.on('data', (data) => {
        setMessages((prev) => [...prev, data]);
      });
    });
  }, [room]);

  const sendMessage = (msg: string) => {
    if (conn) conn.send(msg);
    setMessages((prev) => [...prev, `You: ${msg}`]);
  };

  return (
    <div id="chat">
      {messages.map((m, i) => <div key={i}>{m}</div>)}
      <input
        placeholder="Type message"
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage(e.currentTarget.value);
        }}
      />
    </div>
  );
}

