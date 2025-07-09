import React, { useEffect, useState, useRef } from "react";
import { FaComments } from "react-icons/fa";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollingRef = useRef();

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/api/feedback/all/", {
            method:"GET",
          credentials: "include",
        });
        if (!response.ok) {
          let errorMsg = `Error: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.detail || JSON.stringify(errorData);
          } catch {
            errorMsg = response.statusText;
          }
          throw new Error(errorMsg);
        }
        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
    pollingRef.current = setInterval(fetchFeedback, 5000); // Poll every 5 seconds
    return () => clearInterval(pollingRef.current);
  }, []);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/feedback/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie('csrftoken'),
        },
      });
      if (!response.ok) throw new Error("Failed to delete feedback");
      setFeedback((prev) => prev.filter((fb) => fb.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 700, margin: "2rem auto", minHeight: 600 }}>
      <h3 className="mb-4">
        <FaComments style={{ color: "#0d6efd", marginRight: 8 }} />
        Patient Feedback
      </h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {loading ? (
          <li className="list-group-item text-center">Loading...</li>
        ) : feedback.length === 0 ? (
          <li className="list-group-item">No feedback yet.</li>
        ) : (
          feedback.map((fb) => (
            <li
              key={fb.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>{fb.full_name || fb.patient_name || fb.patient}</strong>
                <div style={{ fontSize: 14, color: "#555" }}>{fb.comment || fb.message}</div>
              </div>
              <span style={{ fontSize: 13, color: "#888" }}>{fb.date}</span>
              <button className="btn btn-sm btn-danger ms-3" onClick={() => handleDelete(fb.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewFeedback;
