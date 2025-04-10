import React, { useState } from 'react';
import { v4 as id } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './CreateRoom.scss';
import { toast } from 'react-toastify';
import { FaRegCopy } from 'react-icons/fa';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId.trim()) {
      toast.error('ROOM ID is required');
      return;
    }
    navigate(`/editor/${roomId}`);
  };

  const createNewRoom = () => {
    const newRoomId = id();
    setRoomId(newRoomId);
    toast.success('Created a new room');
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">
        {/* Left: Create Room */}
        <div className="card-section">
          <h2>Create Room</h2>
          <div className="input-box">
            <input type="text" value={roomId} placeholder="Room ID" readOnly />
            <button onClick={copyRoomId}><FaRegCopy /></button>
          </div>
          <button className="action-btn" onClick={createNewRoom}>
            Create and Enter room
          </button>
        </div>

        {/* Center Divider Icon */}
        <div className="divider-icon">
          &lt;&gt;
        </div>

        {/* Right: Join Room */}
        <div className="card-section">
          <h2>Join Room</h2>
          <div className="input-box">
            <input
              type="text"
              value={roomId}
              placeholder="Enter Room ID"
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <button className="action-btn" onClick={joinRoom}>
            Enter room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
