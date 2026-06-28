import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <header>
          <h1>Welcome to the Property Maintenance Portal</h1>
          <p>Manage your properties and maintenance tasks easily.</p>
        </header>

        <div className={styles.ctaButtons}>
          <Link to="/login">
            <button className={styles.ctaButton}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.ctaButton}>Register</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
