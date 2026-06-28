import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Dashboard.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requiredSpace, setRequiredSpace] = useState('5,000 - 10,000 SQ FT');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanPhone = phone.trim();
    if (cleanPhone.startsWith('http://') || cleanPhone.startsWith('https://')) {
      alert("⚠️ Formatting Error: Please enter a valid telephone contact connection string instead of an image link/URL structure.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        company: company.trim() || 'Individual Portfolio',
        email: email.trim(),
        phone: cleanPhone,
        requiredSpace,
        message: message.trim()
      };

      await axios.post('http://localhost:5000/api/inquiries', payload);
      alert('🚀 Strategic Business Lead Captured Successfully! Our expansion team will review the parameters.');
      
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Inquiry pipeline failure:", error);
      alert("System Error: Unable to post inquiry log.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionCenteredHeader}>
        <span className={styles.metaLabel}>ACQUISITIONS & INQUIRIES</span>
        <h1 className={styles.displayHeading}>Corporate Relations Deck.</h1>
        <p className={styles.subtext}>Are you looking to acquire, expand, or lease high-yield commercial assets? Submit your operational layout requirements below.</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '40px auto 0 auto' }}>
        <form className={styles.premiumFormBlock} onSubmit={handleInquirySubmit}>
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', letterSpacing: '1px' }}>
            ACQUISITION BRIEFING SHEET
          </h3>

          <div className={styles.formRowTwo}>
            <div className={styles.fieldGroup}>
              <label>INVESTOR / ENTITY FULL NAME</label>
              <input type="text" placeholder="e.g., Gautam Adani" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.fieldGroup}>
              <label>CORPORATE ORGANIZATION</label>
              <input type="text" placeholder="e.g., Adani Enterprises" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>

          <div className={styles.formRowTwo}>
            <div className={styles.fieldGroup}>
              <label>OFFICIAL EMAIL ADDRESS</label>
              <input type="email" placeholder="e.g., development@adani.in" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.fieldGroup}>
              <label>DIRECT CONTACT PIPELINE (PHONE NUMBER)</label>
              <input type="text" placeholder="e.g., +91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>ESTIMATED STRUCTURAL AREA REQUIRED</label>
            <select value={requiredSpace} onChange={(e) => setRequiredSpace(e.target.value)}>
              <option value="Under 5,000 SQ FT">Under 5,000 SQ FT (Boutique Office)</option>
              <option value="5,000 - 10,000 SQ FT">5,000 - 10,000 SQ FT (Mid-Scale Corporate Hub)</option>
              <option value="10,000 - 50,000 SQ FT">10,000 - 50,000 SQ FT (Enterprise Tower Wing)</option>
              <option value="50,000+ SQ FT">50,000+ SQ FT (Full Scale Industrial Mega Site)</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>EXPANSION SCHEMATIC & SPECIAL DESIGN REQUIREMENT NOTES</label>
            <textarea rows="4" placeholder="Detail your zoning, utility loads, data infrastructure, or execution timelines here..." value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>

          <button type="submit" className={styles.solidActionBtn} disabled={isSubmitting}>
            {isSubmitting ? '⚙️ RE-ROUTING SECURE ENVELOPE...' : 'SUBMIT EXPANSION INQUIRY'}
          </button>
        </form>

        {/* ─── NEW PROFESSIONAL SOCIAL LINKS & LOGO FOOTER DECK ─── */}
        <hr style={{ border: 'none', borderBottom: '1px dashed #ddd', margin: '50px 0 30px 0' }} />
        
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          {/* Brand Identity Vector Block */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px', color: '#1e3c72' }}>
              AETHERIS
            </span>
            <span style={{ fontSize: '10px', background: '#1e3c72', color: '#fff', padding: '2px 6px', borderRadius: '3px', fontWeight: '700', letterSpacing: '1px' }}>
              HQ
            </span>
          </div>
          
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 20px 0' }}>
            Connecting global enterprise capital with institutional grade structural spaces.
          </p>

          {/* Premium Logo Row Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '20px' }}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0077b5', fontWeight: '700', fontSize: '14px', transition: 'transform 0.2s' }}>
              💼 LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1da1f2', fontWeight: '700', fontSize: '14px' }}>
              🌐 X / Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#333', fontWeight: '700', fontSize: '14px' }}>
              💻 GitHub Repo
            </a>
            <a href="https://aetheris.io" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '700', fontSize: '14px' }}>
              🏢 Global Site
            </a>
          </div>

          <div style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.5px' }}>
            © 2026 Aetheris Real Estate Capital Framework. All operational vectors reserved.
          </div>
        </div>
        {/* ─── END OF FOOTER DECK ─── */}

      </div>
    </div>
  );
}