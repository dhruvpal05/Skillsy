import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Settings, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../common/Button/Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Users size={24} />
          <span>SkillSwap</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/browse" 
                className={`${styles.navLink} ${isActive('/browse') ? styles.active : ''}`}
              >
                Browse
              </Link>
              <Link 
                to="/swaps" 
                className={`${styles.navLink} ${isActive('/swaps') ? styles.active : ''}`}
              >
                My Swaps
              </Link>
              <Link 
                to="/profile" 
                className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`${styles.navLink} ${isActive('/register') ? styles.active : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* User Menu */}
        {isAuthenticated && (
          <div className={styles.userMenu}>
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell size={20} />
            </Button>
            <div className={styles.userInfo}>
              <img 
                src={user?.profilePhoto || `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`}
                alt={user?.name || 'User'} 
                className={styles.avatar}
              />
              <span className={styles.userName}>{user?.name}</span>
            </div>
            <div className={styles.dropdown}>
              <Link to="/settings" className={styles.dropdownItem}>
                <Settings size={16} />
                Settings
              </Link>
              <button onClick={handleLogout} className={styles.dropdownItem}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/browse" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/swaps" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                My Swaps
              </Link>
              <Link 
                to="/profile" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/settings" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className={styles.mobileNavLink}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};