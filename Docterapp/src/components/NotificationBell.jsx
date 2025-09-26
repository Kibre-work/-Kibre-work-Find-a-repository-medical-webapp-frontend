import React, { useEffect, useState, useRef } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pollingRef = useRef();

  // Mark notifications as read when dropdown is opened
  const markNotificationsAsRead = async () => {
    try {
      setLoading(true);
      await fetch('http://localhost:8000/api/notification/mark-read/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchNotifications(); // Only update count after re-fetch
    } catch {
      setError('Failed to mark notifications as read');
    } finally {
      setLoading(false);
    }
  };

  // Wrap fetchNotifications so it can be called from markNotificationsAsRead
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:8000/api/notification/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data);
      setCount(data.filter(n => !n.is_read).length);
      // Emit event for any new unread appointment items to allow toasts
      const hasUnreadAppointment = Array.isArray(data) && data.some(n => !n.is_read && n.type === 'appointment');
      if (hasUnreadAppointment) {
        window.dispatchEvent(new CustomEvent('appointments:new', {
          detail: {
            notifications: data.filter(n => !n.is_read && n.type === 'appointment')
          }
        }));
      }

      // Emit event for any new unread prescription items to allow toasts
      const hasUnreadPrescription = Array.isArray(data) && data.some(n => !n.is_read && n.type === 'prescription');
      if (hasUnreadPrescription) {
        window.dispatchEvent(new CustomEvent('prescriptions:new', {
          detail: {
            notifications: data.filter(n => !n.is_read && n.type === 'prescription')
          }
        }));
      }
    } catch {
      setCount(0);
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      setLoading(true);
      await fetch('http://localhost:8000/api/notification/notifications/', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchNotifications();
    } catch {
      setError('Failed to clear notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    pollingRef.current = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    // Listen for app-wide refresh events to update immediately
    const handleRefresh = () => {
      fetchNotifications();
    };
    window.addEventListener('notifications:refresh', handleRefresh);

    return () => {
      clearInterval(pollingRef.current);
      window.removeEventListener('notifications:refresh', handleRefresh);
    };
  }, []);

  const handleBellClick = () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown) markNotificationsAsRead();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ cursor: 'pointer' }} onClick={handleBellClick}>
        <FaBell size={24} color="#0d6efd" />
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: -6,
            right: -6,
            background: '#dc3545',
            color: '#fff',
            borderRadius: '50%',
            padding: '2px 7px',
            fontSize: 13,
            fontWeight: 600,
            minWidth: 22,
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
          }}>{count}</span>
        )}
      </div>
      {showDropdown && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 32,
          minWidth: 280,
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          zIndex: 1000,
          padding: 12
        }}>
          <div style={{ fontWeight: 700, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Notifications</span>
            {Array.isArray(notifications) && notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                style={{
                  marginLeft: 8,
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 13
                }}
                disabled={loading}
              >
                Clear All
              </button>
            )}
          </div>
          {loading ? (
            <div style={{ color: '#888' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: '#dc3545' }}>{error}</div>
          ) : Array.isArray(notifications) && notifications.length > 0 ? (
            <>
              {/* Unread notifications */}
              {notifications.filter(n => !n.is_read).length > 0 && notifications.filter(n => !n.is_read).map(n => (
                <div key={n.id} style={{
                  background: '#e9f5ff',
                  padding: 8,
                  borderRadius: 6,
                  marginBottom: 6,
                  fontSize: 15
                }}>
                  {n.type && (
                    <span style={{
                      display: 'inline-block',
                      background: '#e0e0e0',
                      color: '#0d6efd',
                      fontWeight: 600,
                      fontSize: 12,
                      borderRadius: 4,
                      padding: '2px 8px',
                      marginRight: 8
                    }}>{n.type.charAt(0).toUpperCase() + n.type.slice(1)}</span>
                  )}
                  {n.message}
                </div>
              ))}
              {/* Divider if both unread and read exist */}
              {notifications.filter(n => !n.is_read).length > 0 && notifications.filter(n => n.is_read).length > 0 && (
                <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
              )}
              {/* Read notifications */}
              {notifications.filter(n => n.is_read).map(n => (
                <div key={n.id} style={{
                  background: '#f8f9fa',
                  padding: 8,
                  borderRadius: 6,
                  marginBottom: 6,
                  fontSize: 15,
                  color: '#888'
                }}>
                  {n.type && (
                    <span style={{
                      display: 'inline-block',
                      background: '#e0e0e0',
                      color: '#0d6efd',
                      fontWeight: 600,
                      fontSize: 12,
                      borderRadius: 4,
                      padding: '2px 8px',
                      marginRight: 8
                    }}>{n.type.charAt(0).toUpperCase() + n.type.slice(1)}</span>
                  )}
                  {n.message}
                </div>
              ))}
            </>
          ) : (
            <div style={{ color: '#888' }}>No notifications.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
