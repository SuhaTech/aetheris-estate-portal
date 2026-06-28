import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function Tenants({ tenants, listings, onRegisterTenant }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');
  const [rentStatus, setRentStatus] = useState('PAID');
  const [showForm, setShowForm] = useState(false);

  // Filter only VACANT properties to show in dropdown allotment selector
  const vacantProperties = listings.filter(item => item.status === 'VACANT');

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetProperty = propertyId || vacantProperties[0]?._id;

    if (!name.trim() || !email.trim() || !targetProperty) {
      alert("Please ensure a valid vacant property asset is selected.");
      return;
    }

    onRegisterTenant({
      name,
      email,
      propertyId: targetProperty,
      leaseStart: leaseStart || 'N/A',
      leaseEnd: leaseEnd || 'N/A',
      rentStatus
    });

    setName('');
    setEmail('');
    setPropertyId('');
    setLeaseStart('');
    setLeaseEnd('');
    setShowForm(false);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionCenteredHeader}>
        <span className={styles.metaLabel}>OCCUPANT REGISTRY</span>
        <h1 className={styles.displayHeading}>Lease Allocations & Profiles.</h1>
        <p className={styles.subtext}>Secure roster monitoring active corporate lease boundaries, temporal timelines, and financial account statuses.</p>
        
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={styles.solidActionBtn} 
          style={{ width: 'auto', padding: '12px 30px', marginTop: '20px' }}
        >
          {showForm ? '✕ CLOSE REGISTRATION DECK' : '＋ ALLOT VACANT UNIT / REGISTER TENANT'}
        </button>
      </div>

      {/* NEW TENANT REGISTRATION CONTROLLER */}
      {showForm && (
        <div style={{ maxWidth: '650px', margin: '0 auto 40px auto' }}>
          <form className={styles.premiumFormBlock} onSubmit={handleSubmit}>
            <h3>ONBOARD NEW OCCUPANT TARGET</h3>
            
            <div className={styles.formRowTwo}>
              <div className={styles.fieldGroup}>
                <label>FULL LEGAL NAME / ENTITY</label>
                <input type="text" placeholder="e.g., Anant Analytics Corp" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.fieldGroup}>
                <label>OFFICIAL CORRESPONDENCE EMAIL</label>
                <input type="email" placeholder="e.g., logistics@anant.io" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>SELECT TARGET STRUCTURAL ENTITY (VACANT LISTINGS ONLY)</label>
              {vacantProperties.length === 0 ? (
                <p style={{ color: '#d9534f', fontSize: '12px', margin: '5px 0' }}>⚠️ Critical Warning: No vacant pipeline slots found in system portfolio.</p>
              ) : (
                <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
                  <option value="">-- Choose Vacant Asset Slot --</option>
                  {vacantProperties.map(prop => (
                    <option key={prop._id} value={prop._id}>{prop.title} [{prop.price}]</option>
                  ))}
                </select>
              )}
            </div>

            <div className={styles.formRowTwo}>
              <div className={styles.fieldGroup}>
                <label>LEASE WINDOW COMMENCEMENT</label>
                <input type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label>LEASE CONTRACT TERMINATION</label>
                <input type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>INITIAL ACCOUNT INVOICE PIPELINE</label>
              <select value={rentStatus} onChange={(e) => setRentStatus(e.target.value)}>
                <option value="PAID">ACCOUNT CLEAR / PAID</option>
                <option value="OVERDUE">ALERT / ACCOUNT OVERDUE</option>
              </select>
            </div>

            <button type="submit" className={styles.solidActionBtn} disabled={vacantProperties.length === 0}>
              EXECUTE LEASE ALLOCATION
            </button>
          </form>
        </div>
      )}

      {/* ARCHITECTURAL DATA ROSTER GRID */}
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table className={styles.architecturalTable} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eaeaea', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', color: '#555' }}>
              <th style={{ padding: '15px' }}>Occupant UID</th>
              <th style={{ padding: '15px' }}>Legal Profile / Identity</th>
              <th style={{ padding: '15px' }}>Allocated Unit Asset</th>
              <th style={{ padding: '15px' }}>Lease Duration Window</th>
              <th style={{ padding: '15px' }}>Financial Metric</th>
              <th style={{ padding: '15px' }}>Yield Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '14px' }}>
                  No active occupant configurations allocated in current database system framework.
                </td>
              </tr>
            ) : (
              tenants.map(tenant => (
                <tr key={tenant._id} style={{ borderBottom: '1px solid #f5f5f5', fontSize: '13px' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e3c72' }}>
                    <code>{tenant.uid || 'N/A'}</code>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: '600' }}>{tenant.name || 'Unknown Entity'}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{tenant.email || 'N/A'}</div>
                  </td>
                  <td style={{ padding: '15px', color: '#333' }}>
                    {/* FIXED: Optional chaining (?.) avoids crash if property details are missing */}
                    {tenant.property?.title ? (
                      <div>
                        <div style={{ fontWeight: '500' }}>{tenant.property.title}</div>
                        <span style={{ fontSize: '10px', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                          {tenant.property.type || 'Unit'}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: '#888', fontSize: '12px', fontStyle: 'italic' }}>Pending Allocation</span>
                    )}
                  </td>
                  <td style={{ padding: '15px', color: '#555' }}>
                    <div>{tenant.leaseStart || 'Immediate'}</div>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>to {tenant.leaseEnd || 'Flexible'}</div>
                  </td>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#222' }}>
                    {tenant.property?.price ? tenant.property.price : 'N/A'}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {/* FIXED: Crash-free dynamic badge coloring */}
                    {(() => {
                      const status = tenant.rentStatus || 'PAID';
                      const isPaid = status === 'PAID';
                      return (
                        <span 
                          style={{ 
                            display: 'inline-block', 
                            fontSize: '11px', 
                            fontWeight: '700',
                            padding: '5px 12px', 
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            backgroundColor: isPaid ? '#e2f0d9' : '#fce4d6',
                            color: isPaid ? '#385723' : '#c65911',
                            border: isPaid ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                          }}
                        >
                          ● {status}
                        </span>
                      );
                    })()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}