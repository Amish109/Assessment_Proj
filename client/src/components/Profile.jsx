import React from 'react';
import LoginButton from './LoginButton';

const Profile = ({ user, logout }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Avatar */}
      <img
        src={user.photoURL}
        alt="User"
        className="rounded-full w-10 h-10 border-2 border-blue-500"
      />

      {/* Name + Logout */}
      <div className="hidden sm:flex flex-col items-start">
        <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
          {user.displayName}
        </span>
        <LoginButton onClick={logout} type="logout" />
      </div>
    </div>
  );
};

export default Profile;
