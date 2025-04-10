import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { initSocket } from '../socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const setup = async () => {
      const socketInstance = await initSocket();
      if (isMounted.current) {
        setSocket(socketInstance);
      }
    };

    setup();

    return () => {
      isMounted.current = false;
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
