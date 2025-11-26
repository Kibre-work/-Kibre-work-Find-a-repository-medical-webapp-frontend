import React, { useContext, useMemo } from 'react';
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
  return `${config.API_BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
};

const initialsFromName = (name) => {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts[1]?.[0] || '';
  return (first + last || first || 'U').toUpperCase();
};

const UserAvatar = ({ size = 32 }) => {
  const { user } = useContext(UserContext);
  const avatarUrl = useMemo(() => getAvatarUrl(user), [user]);
  const displayName = user?.full_name || user?.name || user?.username || 'User';

  return (
    <div
      title={displayName}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: '#e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #dee2e6'
      }}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: 12, color: '#6c757d', fontWeight: 600 }}>
          {initialsFromName(displayName)}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;



