import Peer from 'peerjs';

let peer: Peer;

export function initPeer(userId: string) {
  peer = new Peer(userId, {
    host: 'peerjs-server.herokuapp.com', // or your own server
    secure: true,
    port: 443,
  });

  return peer;
}

export function connectToPeer(peerId: string) {
  if (!peer) throw new Error('Peer not initialized');
  return peer.connect(peerId);
}

