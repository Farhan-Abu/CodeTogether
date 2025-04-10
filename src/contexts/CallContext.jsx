// src/contexts/CallContext.jsx
import React, { createContext, useContext, useRef } from "react";
import Peer from "simple-peer";
import { initSocket } from "../socket";

const CallContext = createContext();

export const useCall = () => useContext(CallContext);

export const CallProvider = ({ children }) => {
  const peersRef = useRef([]);
  const audioRef = useRef();
  const socketRef = useRef();

  const joinVoiceCall = async (roomId, username) => {
    socketRef.current = await initSocket();
    socketRef.current.emit("join-call", { roomId, username });

    socketRef.current.on("all-users", (users) => {
      users.forEach((user) => {
        const peer = createPeer(user.socketId, socketRef.current.id);
        peersRef.current.push({ peerID: user.socketId, peer });
      });
    });

    socketRef.current.on("user-joined", (payload) => {
      if (!payload.signal) return;

      const peer = addPeer(payload.signal, payload.callerId);
      peersRef.current.push({ peerID: payload.callerId, peer });
    });

    socketRef.current.on("receiving-returned-signal", (payload) => {
      const item = peersRef.current.find(p => p.peerID === payload.id);
      item?.peer.signal(payload.signal);
    });

    socketRef.current.on("user-left-call", (id) => {
      const peerObj = peersRef.current.find(p => p.peerID === id);
      if (peerObj) {
        peerObj.peer.destroy();
        peersRef.current = peersRef.current.filter(p => p.peerID !== id);
      }
    });
  };

  const createPeer = (userToSignal, callerID) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: audioRef.current?.srcObject });
    peer.on("signal", signal => {
      socketRef.current.emit("sending-signal", { userToSignal, callerID, signal });
    });
    peer.on("stream", stream => {
      audioRef.current.srcObject = stream;
    });
    return peer;
  };

  const addPeer = (incomingSignal, callerId) => {
    const peer = new Peer({ initiator: false, trickle: false });
    peer.on("signal", signal => {
      socketRef.current.emit("returning-signal", { signal, callerID: callerId });
    });
    peer.signal(incomingSignal);
    peer.on("stream", stream => {
      audioRef.current.srcObject = stream;
    });
    return peer;
  };

  const leaveCall = () => {
    peersRef.current.forEach(({ peer }) => peer.destroy());
    if (socketRef.current) socketRef.current.disconnect();
  };

  return (
    <CallContext.Provider value={{ joinVoiceCall, leaveCall, audioRef }}>
      {children}
    </CallContext.Provider>
  );
};
