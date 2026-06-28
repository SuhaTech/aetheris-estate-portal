import React from 'react';
import styles from '../Dashboard.module.css';

export default function Overview({ listings, tenants, requests }) {
  // Dynamic portfolio stats derivation
  const totalAssets = listings.length;
  const occupiedUnits = listings.filter(item => item.status === 'RENTED').length;
  const vacantUnits = listings.filter(item => item.status === 'VACANT').length;
  const activeTickets = requests.filter(ticket => ticket.status !== 'Resolved').length;

  return (
    <div className={styles.sectionWrapper} style={{ fontFamily: '"Inter", sans-serif', color: '#1a202c' }}>
      
      {/* ─── PREMIUM HERO BANNER ─── */}
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '50px',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        padding: '80px 50px',
        color: '#fff',
        boxShadow: '0 20px 40px rgba(15,32,39,0.15)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <span style={{ 
            fontSize: '12px', fontWeight: '800', letterSpacing: '3px', 
            background: 'rgba(255,255,255,0.15)', padding: '6px 14px', 
            borderRadius: '50px', textTransform: 'uppercase', backdropFilter: 'blur(4px)'
          }}>
            SYSTEM COMMAND CENTER
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: '800', margin: '20px 0 15px 0', letterSpacing: '-1px', lineHeight: '1.15' }}>
            Institutional Real Estate Asset Matrix.
          </h1>
          <p style={{ fontSize: '16px', color: '#dae5f8', lineHeight: '1.7', margin: 0, opacity: 0.9 }}>
            Automated enterprise portal orchestrating premium commercial layouts, tenant ledger synchronization, structural risk tracking, and real-time yield deployment frameworks.
          </p>
        </div>
      </div>

      {/* ─── EXECUTIVE METRICS COUNTER DECK ─── */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '25px', 
        marginBottom: '60px' 
      }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#718096', letterSpacing: '1px', textTransform: 'uppercase' }}>PORTFOLIO SIZE</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0f2027', margin: '8px 0' }}>{totalAssets} Units</div>
          <span style={{ fontSize: '13px', color: '#38a169', fontWeight: '600' }}>● Active Infrastructure</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#718096', letterSpacing: '1px', textTransform: 'uppercase' }}>CAPITAL YIELD RATIO</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#203a43', margin: '8px 0' }}>{occupiedUnits} Mapped</div>
          <span style={{ fontSize: '13px', color: '#4a5568', fontWeight: '500' }}>{vacantUnits} Vacant Options</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#718096', letterSpacing: '1px', textTransform: 'uppercase' }}>DISPATCH TICKETS</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#e53e3e', margin: '8px 0' }}>{activeTickets} Open</div>
          <span style={{ fontSize: '13px', color: activeTickets > 0 ? '#dd6b20' : '#38a169', fontWeight: '600' }}>
            {activeTickets > 0 ? '⚠️ High Priority Engaged' : '✓ Systems Operational'}
          </span>
        </div>
      </div>

      {/* ─── ALTERNATING FEATURE LAYOUT SECTIONS ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginBottom: '60px' }}>
        
        {/* Section 1: Image LEFT, Text RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px', minHeight: '350px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
            <div style={{ 
              width: '100%', height: '100%', minHeight: '350px',
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80')`, 
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#3182ce', letterSpacing: '1.5px', textTransform: 'uppercase' }}>DOMAIN ALPHA</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '10px 0 20px 0', letterSpacing: '-0.5px' }}>Asset Management Pipeline</h2>
            <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.7', margin: 0 }}>
              Live indexing and pricing configuration parameters for prime retail wings, high-density server architectures, and corporate skyscraper floors. Take granular control over operational metrics, availability statuses, and value compounding logs effortlessly.
            </p>
          </div>
        </div>

        {/* Section 2: Text LEFT, Image RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#3182ce', letterSpacing: '1.5px', textTransform: 'uppercase' }}>DOMAIN BETA</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '10px 0 20px 0', letterSpacing: '-0.5px' }}>Corporate Occupant Roster</h2>
            <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.7', margin: 0 }}>
              Monitoring active corporate profiles, temporal contractual lease windows, and automated rental settlement triggers. Sync corporate entities to structural parameters and establish clear profiles for multi-floor tenants inside your centralized network ecosystem.
            </p>
          </div>
          <div style={{ flex: '1 1 450px', minHeight: '350px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
            <div style={{ 
              width: '100%', height: '100%', minHeight: '350px',
              backgroundImage: `url('https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=800&q=80')`, 
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          </div>
        </div>

        {/* Section 3: Image LEFT, Text RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px', minHeight: '350px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
            <div style={{ 
              width: '100%', height: '100%', minHeight: '350px',
              // FIXED: Replaced with a solid, active corporate engineering infrastructure image
              backgroundImage: `url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80')`, 
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#3182ce', letterSpacing: '1.5px', textTransform: 'uppercase' }}>DOMAIN GAMMA</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '10px 0 20px 0', letterSpacing: '-0.5px' }}>Engineering Dispatch & Logistics</h2>
            <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.7', margin: 0 }}>
              Real-time handling of infrastructure tickets, zoning alerts, and structural health deployments map directly to occupied coordinates. Prioritize structural incidents, streamline vendor communications, and ensure high-tier client satisfaction with zero operational lag.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}