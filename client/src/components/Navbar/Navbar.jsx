import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import Profile from '../Profile';
import LoginButton from '../LoginButton';

const Navbar = ({ user, logout, login }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [{
    name:'Home',
    link:''
  },
  {
    name:'Min. Transaction Acc List ',
    link:'min-transaction-account-list'
  },
  {
    name:'Product List',
    link:'product-list'
  }];

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">MyApp</div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <NavLink
              to={`/${link?.link?.toLowerCase()}`}
              key={link?.name}
             className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 transition ${
                isActive ? 'font-semibold text-red-700' : ''
              }`
            }
            >
              {link?.name}
            </NavLink>
          ))}
        </div>

        {/* Profile or Login (desktop) */}
        <div className="hidden md:block">
          {user ? (
            <Profile user={user} logout={logout} />
          ) : (
            <LoginButton onClick={login} type="login" />
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {links.map(link => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="block text-gray-600 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}

          {/* Profile or Login (mobile) */}
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <Profile user={user} logout={logout} />
            ) : (
              <LoginButton onClick={login} type="login" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
