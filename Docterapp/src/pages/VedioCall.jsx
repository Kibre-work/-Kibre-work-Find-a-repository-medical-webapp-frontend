// This file is deprecated and replaced by VideoCall.jsx. Keeping for reference only.

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaVideo } from "react-icons/fa";

const VedioCall = () => {
  const [room, setRoom] = useState("");
  const location = useLocation();

  useEffect(() => {
    // If a ?room= param is present, auto-join that room
    const params = new URLSearchParams(location.search);
    const roomParam = params.get("room");
    if (roomParam) {
      setRoom(roomParam);
    }
  }, [location.search]);

  const roomUrl = `https://meet.jit.si/${encodeURIComponent(room)}`;

  if (!room) {
    return (
      <div style={{ maxWidth: 500, margin: "2rem auto" }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#0d6efd",
                textAlign: "center",
              }}
            >
              <FaVideo size={28} style={{ marginRight: 8 }} />
              Video Call
            </Card.Title>
            <div
              className="text-muted mt-3"
              style={{ fontSize: 15, textAlign: "center" }}
            >
              No room specified. Please access the video call from your appointment
              link.
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <div className="mb-3" style={{ textAlign: "center" }}>
        <a
          href={roomUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontWeight: 600,
            color: '#0d6efd',
            fontSize: 17,
            margin: '12px 0',
            textDecoration: 'underline',
            wordBreak: 'break-all'
          }}
        >
          Join Video Call in New Tab
        </a>
        <div className="text-muted mt-2" style={{ fontSize: 13 }}>
          Share this link with your doctor or patient to join the same video call.
        </div>
      </div>
      <div style={{ height: "75vh", width: "100%" }}>
        <iframe
          title="Video Call"
          src={roomUrl}
          allow="camera; microphone; fullscreen; display-capture"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  );
};

export default VedioCall;
