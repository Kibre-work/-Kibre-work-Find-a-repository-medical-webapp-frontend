import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Dummy fetch function, replace with real API call
const fetchVideoInvites = async () => {
  // Simulate API: [{id, doctorName, roomName, status}]
  return [
    { id: 1, doctorName: 'Dr. Smith', roomName: 'room_doctor42_patient99_20250619', status: 'pending' },
    // ...more invites
  ];
};

const PatientVideoInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInvites = async () => {
      setLoading(true);
      // Replace with real API call
      const data = await fetchVideoInvites();
      setInvites(data);
      setLoading(false);
    };
    loadInvites();
  }, []);

  const handleJoin = (roomName) => {
    navigate(`/videocall?room=${encodeURIComponent(roomName)}`);
  };

  if (loading) return <div className="text-center my-4"><Spinner animation="border" /></div>;
  if (!invites.length) return null;

  return (
    <Card className="mb-4 shadow-sm" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: 20, fontWeight: 600, color: '#0d6efd' }}>Video Call Invitations</Card.Title>
        <ListGroup variant="flush" className="mt-3">
          {invites.map(invite => (
            <ListGroup.Item key={invite.id} className="d-flex justify-content-between align-items-center">
              <span>{invite.doctorName} invited you to a video call</span>
              <Button variant="primary" size="sm" onClick={() => handleJoin(invite.roomName)}>
                Join
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PatientVideoInvites;
