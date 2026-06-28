import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function WorkOrders({ requests, onAddOrder, listings }) {
  const [propertyId, setPropertyId] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  // AUTOMATION: Dropdown me sirf RENTED properties dikhao jahan tenant actual me reh raha hai
  const rentedProperties = listings.filter(item => item.status === 'RENTED');

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetProperty = propertyId || rentedProperties[0]?._id;

    if (!targetProperty || !issue.trim()) {
      alert("Please select a valid occupied property asset and specify the issue.");
      return;
    }

    onAddOrder({
      propertyId: targetProperty,
      issue,
      priority,
      description: description || 'No secondary brief provided.'
    });

    setPropertyId('');
    setIssue('');
    setPriority('Medium');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionCenteredHeader}>
        <span className={styles.metaLabel}>MAINTENANCE DISPATCH</span>
        <h1 className={styles.displayHeading}>Work Orders & Logistics.</h1>
        <p className={styles.subtext}>Live management of structural modifications, system diagnostics, and tenant-reported infrastructure issues.</p>
        
        <button onClick={() => setShowForm(!showForm)} className={styles.solidActionBtn} style={{ width: 'auto', padding: '12px 30px', marginTop: '20px' }}>
          {showForm ? '✕ CLOSE DISPATCH PANEL' : '＋ LOG NEW MAINTENANCE INCIDENT'}
        </button>
      </div>

      {/* NEW MAINTENANCE FORM */}
      {showForm && (
        <div style={{ maxWidth: '650px', margin: '0 auto 40px auto' }}>
          <form className={styles.premiumFormBlock} onSubmit={handleSubmit}>
            <h3>REPORT STRUCTURAL / UTILITY INCIDENT</h3>
            
            <div className={styles.fieldGroup}>
              <label>SELECT TARGET OCCUPIED ASSET</label>
              {rentedProperties.length === 0 ? (
                <p style={{ color: '#c65911', fontSize: '12px', margin: '5px 0' }}>⚠️ Notice: No occupied/rented properties available for maintenance reporting.</p>
              ) : (
                <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
                  <option value="">-- Choose Rented Property Asset --</option>
                  {rentedProperties.map(prop => (
                    <option key={prop._id} value={prop._id}>{prop.title}</option>
                  ))}
                </select>
              )}
            </div>

            <div className={styles.formRowTwo}>
              <div className={styles.fieldGroup}>
                <label>CORE ISSUE / CATEGORY</label>
                <input type="text" placeholder="e.g., HVAC Failure, Server Room Cooling" value={issue} onChange={(e) => setIssue(e.target.value)} required />
              </div>
              <div className={styles.fieldGroup}>
                <label>CRITICALITY LEVEL</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low (Routine Check)</option>
                  <option value="Medium">Medium (Standard Dispatch)</option>
                  <option value="High">High (Immediate Emergency)</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label>DETAILED DESCRIPTION / TECHNICAL NOTES</label>
              <textarea rows="3" placeholder="Provide full context for engineering dispatch..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <button type="submit" className={styles.solidActionBtn} disabled={rentedProperties.length === 0}>
              DISPATCH ENGINEERING TEAM
            </button>
          </form>
        </div>
      )}

      {/* DATA LEDGER GRID */}
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table className={styles.architecturalTable} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eaeaea', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', color: '#555' }}>
              <th style={{ padding: '15px' }}>Ticket ID</th>
              <th style={{ padding: '15px' }}>Property Asset</th>
              <th style={{ padding: '15px' }}>Reporting Tenant</th>
              <th style={{ padding: '15px' }}>Issue Brief</th>
              <th style={{ padding: '15px' }}>Priority</th>
              <th style={{ padding: '15px' }}>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '14px' }}>
                  No active engineering work orders posted in database framework.
                </td>
              </tr>
            ) : (
              requests.map(ticket => (
                <tr key={ticket._id} style={{ borderBottom: '1px solid #f5f5f5', fontSize: '13px' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e3c72' }}><code>{ticket.ticketId || 'TKT-2026'}</code></td>
                  <td style={{ padding: '15px', fontWeight: '500' }}>
                    {ticket.property?.title ? ticket.property.title : <span style={{ color: '#aaa' }}>Decommissioned Asset</span>}
                  </td>
                  <td style={{ padding: '15px', color: '#555' }}>
                    {ticket.tenant?.name ? (
                      <div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{ticket.tenant.name}</div>
                        <div style={{ fontSize: '11px', color: '#888' }}>{ticket.tenant.email}</div>
                      </div>
                    ) : (
                      <span style={{ color: '#888', fontStyle: 'italic' }}>System Asset Maintenance</span>
                    )}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: '600' }}>{ticket.issue}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>{ticket.description}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      fontSize: '11px', fontWeight: 'bold', color: ticket.priority === 'High' ? '#d9534f' : ticket.priority === 'Medium' ? '#f0ad4e' : '#5cb85c' 
                    }}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px', background: '#fff2cc', color: '#b2a100'
                    }}>
                      ● {ticket.status || 'In Progress'}
                    </span>
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