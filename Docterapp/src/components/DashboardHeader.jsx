import React, { useContext, useMemo } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import NotificationBell from './NotificationBell';
import { UserContext } from '../contexts/UserContext';
import config from '../config';

const getAvatarUrl = (user) => {
  if (!user) return null;
  const candidates = [
    user.avatar,
    user.photo,
    user.profile_photo,
    user.profileImage,
    user.image,
    user.picture,
  ].filter(Boolean);
  if (candidates.length === 0) return null;
  const src = String(candidates[0]);
  const isAbsolute = /^https?:\/\//i.test(src) || src.startsWith('data:');
  if (isAbsolute) return src;
  // Prefix with API base if provided and relative path
  return `${config.API_BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
};

const initialsFromName = (name) => {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts[1]?.[0] || '';
  return (first + last || first || 'U').toUpperCase();
};

const DashboardHeader = ({ title, rightContent, stackTitle = false }) => {
  const { user } = useContext(UserContext);
  const avatarUrl = useMemo(() => getAvatarUrl(user), [user]);
  const displayName = user?.full_name || user?.name || user?.username || 'User';

  return (
    <Navbar
      bg="white"
      className=""
      style={{
        background: 'linear-gradient(135deg, #0b3d91 0%, #0a58ca 55%, #084298 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        minHeight: 56,
        paddingLeft: 0,
        paddingRight: 0
      }}
    >
      <Container fluid className="p-0" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div
          className={stackTitle ? 'd-flex flex-column align-items-start' : 'd-flex align-items-center'}
          style={{ gap: 10 }}
        >
          <img
            src="/log4.png"
            alt="Logo"
            style={{ height: 32, width: 46, objectFit: 'contain' }}
          />
          <div style={{ fontWeight: 600, fontSize: 17, color: '#fff' }}>{title}</div>
        </div>
        <div className="d-flex align-items-center" style={{ gap: 14 }}>
          {rightContent}
          <div style={{ color: '#fff' }}>
            <NotificationBell />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;


