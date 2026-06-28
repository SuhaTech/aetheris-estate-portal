import React from 'react';
import styles from '../Dashboard.module.css';

export default function Payments({ payments }) {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionCenteredHeader}>
        <span className={styles.metaLabel}>FINANCIAL RECORDS</span>
        <h1 className={styles.displayHeading}>Invoicing & Ledgers.</h1>
        <p className={styles.subtext}>Automated corporate accounting sheet tracking cashflows, localized asset rental yields, and structural lease clearings.</p>
      </div>

      {/* ARCHITECTURAL FINANCIAL SHEET */}
      <div style={{ overflowX: 'auto', marginTop: '40px' }}>
        <table className={styles.architecturalTable} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eaeaea', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', color: '#555' }}>
              <th style={{ padding: '15px' }}>Invoice ID</th>
              <th style={{ padding: '15px' }}>Associated Occupant</th>
              <th style={{ padding: '15px' }}>Target Property Asset</th>
              <th style={{ padding: '15px' }}>Execution Due Date</th>
              <th style={{ padding: '15px' }}>Gross Amount</th>
              <th style={{ padding: '15px' }}>Audit Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '14px' }}>
                  No automated transaction indices posted in current ledger database.
                </td>
              </tr>
            ) : (
              payments.map(invoice => (
                <tr key={invoice._id} style={{ borderBottom: '1px solid #f5f5f5', fontSize: '13px' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e3c72' }}>
                    <code>{invoice.invoiceId}</code>
                  </td>
                  <td style={{ padding: '15px' }}>
                    {invoice.tenant ? (
                      <div>
                        <div style={{ fontWeight: '600' }}>{invoice.tenant.name}</div>
                        <div style={{ fontSize: '11px', color: '#888' }}>{invoice.tenant.email}</div>
                      </div>
                    ) : (
                      <span style={{ color: '#aaa', fontSize: '12px' }}>Anonymous Entity</span>
                    )}
                  </td>
                  <td style={{ padding: '15px', color: '#333' }}>
                    {invoice.property ? (
                      <div>
                        <div style={{ fontWeight: '500' }}>{invoice.property.title}</div>
                        <span style={{ fontSize: '10px', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                          {invoice.property.type}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: '#d9534f', fontSize: '11px' }}>⚠️ Asset Unlinked</span>
                    )}
                  </td>
                  <td style={{ padding: '15px', color: '#555' }}>
                    {invoice.dueDate}
                  </td>
                  <td style={{ padding: '15px', fontWeight: '700', color: '#111', fontSize: '14px' }}>
                    {invoice.amount}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span 
                      className={invoice.status === 'PAID' ? styles.cardTag : styles.cardTagVacant} 
                      style={{ 
                        display: 'inline-block', 
                        fontSize: '10px', 
                        padding: '4px 10px',
                        backgroundColor: invoice.status === 'PAID' ? '#e2f0d9' : '#fce4d6',
                        color: invoice.status === 'PAID' ? '#385723' : '#c65911',
                        border: 'none'
                      }}
                    >
                      ● {invoice.status}
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