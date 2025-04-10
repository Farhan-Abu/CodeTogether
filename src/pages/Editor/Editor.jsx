import "./editor.scss";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { ClientLogo } from "../../components/ClientLogo/ClientLogo";
import CodePage from "../../components/CodePage/CodePage";
import { initSocket } from "../../socket";
import ACTIONS from "../../Actions";
import { toast } from "react-hot-toast";

const Editor = () => {
  const socketRef = useRef(null);
  const codeRef = useRef("");
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const location = useLocation();
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();

        const handleErrors = (e) => {
          toast.error("Socket connection failed, try again later.");
          reactNavigator("/");
        };

        socketRef.current.on("connect_error", handleErrors);
        socketRef.current.on("connect_failed", handleErrors);

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }

          setClientList(clients);

          if (codeRef.current) {
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeRef.current,
              socketId,
            });
          }
        });

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClientList((prev) => prev.filter((c) => c.socketId !== socketId));
        });
      } catch (error) {
        console.error("Socket initialization error:", error);
        toast.error("Could not connect to server.");
        reactNavigator("/");
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.JOINED);
      }
    };
  }, [roomId, location.state?.username, reactNavigator]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy Room ID");
      console.error(err);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  const handleStartCall = () => {
    console.log("Start Call button clicked!");
    // Later: Show popup or trigger voice call UI
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="editor">
      <div className="leftside">
        <div className="lefttop">
          <h3>CodeTogether</h3>
          <h5>{location.state?.username}</h5>
          <h6>Room ID: {roomId}</h6>
          <hr />
          <div className="clientList">
            {clientList.map((client) => (
              <ClientLogo key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="leftbottom">
          <button onClick={copyRoomId}>Copy Room ID</button>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      </div>
      <div className="rightside">
        <CodePage
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
          onStartCall={handleStartCall} // ✅ Passed
        />
      </div>
    </div>
  );
};

export default Editor;
