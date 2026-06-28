import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  
  // FIX 1: Default fallback se 'OP:' hata diya, sirf 'ADMIN' rakha hai
  const [username, setUsername] = useState('ADMIN'); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    const storedName = localStorage.getItem('name');

    if (storedName) {
      // FIX 2: Agar naam ke andar galti se pehle se 'OP:' jud ke aa raha ho, toh use saaf kar denge
      const cleanName = storedName.toUpperCase().replace('OP:', '').trim();
      setUsername(cleanName);
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setUsername(parsedUser.name.toUpperCase().replace('OP:', '').trim());
        } else if (parsedUser && parsedUser.username) {
          setUsername(parsedUser.username.toUpperCase().replace('OP:', '').trim());
        }
      } catch (e) {
        setUsername(storedUser.toUpperCase().replace('OP:', '').trim());
      }
    }
  }, [activeTab]); // activeTab badalne par bhi ye fresh data check karega

  return (
    <header className={styles.topNavbar}>
      {/* BRANDING LOGO */}
      <div className={styles.navBrand} onClick={() => setActiveTab('home')}>
        <h2>AETHERIS</h2>
        <span>ESTATE PORTAL</span>
      </div>

      {/* CORE NAVIGATION SECTIONS */}
      <nav className={styles.mainNav}>
        <ul className={styles.navLinksRow}>
          <li className={activeTab === 'home' ? styles.activeLink : ''} onClick={() => setActiveTab('home')}>OVERVIEW</li>
          <li className={activeTab === 'listings' ? styles.activeLink : ''} onClick={() => setActiveTab('listings')}>PROPERTY LISTINGS</li>
          <li className={activeTab === 'tenants' ? styles.activeLink : ''} onClick={() => setActiveTab('tenants')}>TENANTS</li>
          <li className={activeTab === 'maintenance' ? styles.activeLink : ''} onClick={() => setActiveTab('maintenance')}>WORK ORDERS</li>
          <li className={activeTab === 'payments' ? styles.activeLink : ''} onClick={() => setActiveTab('payments')}>PAYMENTS</li>
          
          {/* HOVER SERVICES DROPDOWN */}
          <li 
            className={`${styles.dropdownTrigger} ${activeTab.startsWith('srv-') ? styles.activeLink : ''}`}
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            SERVICES <span className={styles.arrow}>▼</span>
            {servicesDropdown && (
              <ul className={styles.topDropdownMenu}>
                <li onClick={() => setActiveTab('srv-plumbing')}>PLUMBING SYSTEMS</li>
                <li onClick={() => setActiveTab('srv-electrical')}>ELECTRICAL GRID</li>
                <li onClick={() => setActiveTab('srv-cleaning')}>DEEP DISINFECTION</li>
              </ul>
            )}
          </li>

          <li className={activeTab === 'contact' ? styles.activeLink : ''} onClick={() => setActiveTab('contact')}>CONTACT</li>
        </ul>
      </nav>

      {/* ADMIN DROPDOWN */}
      <div className={styles.navActions}>
        <div 
          className={styles.profileDropdownTrigger}
          onMouseEnter={() => setProfileDropdown(true)}
          onMouseLeave={() => setProfileDropdown(false)}
        >
          {/* FIX 3: Ab string formatting bilkul clean standard output degi */}
          <span className={styles.operatorBadge} style={{ textTransform: 'uppercase' }}>
            OP: {username} <span className={styles.arrow}>▼</span>
          </span>
          
          {profileDropdown && (
            <ul className={styles.profileMenu}>
              <li onClick={() => setActiveTab('adm-account')}>MY ACCOUNT</li>
              <li onClick={() => setActiveTab('adm-settings')}>SETTINGS</li>
              <li onClick={() => {
                localStorage.clear(); 
                navigate('/');
              }} className={styles.logoutOption}>
                EXIT SYSTEM (LOGOUT)
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}