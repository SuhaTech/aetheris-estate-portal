import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function PropertyListings({ listings, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Residential Space');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [showForm, setShowForm] = useState(false); // Controls toggle view

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;

    // Fallback default image if empty
    const finalImg = img.trim() || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800';

    onAddProperty({
      title,
      type,
      desc,
      price: `₹${price}/mo`,
      img: finalImg,
      status: 'VACANT' // New properties are vacant by default
    });

    // Resetting states
    setTitle('');
    setDesc('');
    setPrice('');
    setImg('');
    setShowForm(false);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionCenteredHeader}>
        <span className={styles.metaLabel}>PORTFOLIO MANAGEMENT</span>
        <h1 className={styles.displayHeading}>Managed Entities Portfolio.</h1>
        <p className={styles.subtext}>Real-time valuation, capacity tracking, and structural status audits across assets.</p>
        
        {/* Toggle Action Button */}
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={styles.solidActionBtn} 
          style={{ width: 'auto', padding: '12px 30px', marginTop: '20px' }}
        >
          {showForm ? '✕ CLOSE CONTROL PANEL' : '＋ ADD NEW PLATFORM PROPERTY'}
        </button>
      </div>

      {/* DYNAMIC FORM DRAWER */}
      {showForm && (
        <div style={{ maxWidth: '600px', margin: '0 auto 50px auto', animation: 'fadeIn 0.3s ease-out' }}>
          <form className={styles.premiumFormBlock} onSubmit={handleSubmit}>
            <h3 style={{ borderBottomColor: '#1e3c72', color: '#1e3c72' }}>REGISTER NEW STRUCTURAL ASSET</h3>
            
            <div className={styles.fieldGroup}>
              <label>PROPERTY TITLE / NOMENCLATURE</label>
              <input type="text" placeholder="e.g., Empire Heights • Penthouse C" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className={styles.formRowTwo}>
              <div className={styles.fieldGroup}>
                <label>ASSET CLASS DOMAIN</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Residential Space">Residential Space</option>
                  <option value="Luxury Estate">Luxury Estate</option>
                  <option value="Commercial Tech Space">Commercial Space</option>
                  <option value="Elite Penthouse">Elite Penthouse</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label>MONTHLY LEASE MATRIX (Numbers Only)</label>
                <input type="text" placeholder="e.g., 75,000" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>ARCHITECTURAL SPECIFICATIONS / DESCRIPTION</label>
              <textarea rows="2" placeholder="e.g., 3 BHK Sky Mansion • Fully Modular Kitchen • Panoramic East Deck" value={desc} onChange={(e) => setDesc(e.target.value)} required />
            </div>

            <div className={styles.fieldGroup}>
              <label>VISUAL RESOURCE LINK (IMAGE URL - OPTIONAL)</label>
              <input type="url" placeholder="https://images.unsplash.com/..." value={img} onChange={(e) => setImg(e.target.value)} />
            </div>

            <button type="submit" className={styles.solidActionBtn}>INJECT PROPERTY TO DATABASE</button>
          </form>
        </div>
      )}
      
      {/* RENDER GRID */}
      <div className={styles.premiumGrid3}>
        {listings.map(item => (
          <div key={item._id || item.id} className={styles.premiumVisualCard}>
            <div className={styles.imgBlock}>
              <img src={item.img} alt={item.title} />
              <div className={item.status === 'RENTED' ? styles.cardTag : styles.cardTagVacant}>{item.status}</div>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardType}>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.cardDivider}></div>
              <div className={styles.cardFooterRow}>
                <span className={styles.cardPrice}>{item.price}</span>
                <span className={styles.statusDot}>● Operational Optimal</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}