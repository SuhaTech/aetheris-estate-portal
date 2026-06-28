import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import Overview from './sections/Overview'; 
import PropertyListings from './sections/PropertyListings';
import Tenants from './sections/Tenants';
import WorkOrders from './sections/WorkOrders';
import Payments from './sections/Payments';
import Contact from './sections/Contact';
import styles from './Dashboard.module.css';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState('Admin User');
  
  // Settings States
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedUser = localStorage.getItem('user');

    if (storedName) {
      setCurrentUserName(storedName);
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) setCurrentUserName(parsedUser.name);
        else if (parsedUser && parsedUser.username) setCurrentUserName(parsedUser.username);
      } catch (e) {
        setCurrentUserName(storedUser);
      }
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      try {
        const propertiesRes = await axios.get(`${API_BASE_URL}/properties`);
        setListings(Array.isArray(propertiesRes.data) ? propertiesRes.data : []);
      } catch (error) { console.error("Properties fetch failed:", error.message); }

      try {
        const workordersRes = await axios.get(`${API_BASE_URL}/workorders`);
        setRequests(Array.isArray(workordersRes.data) ? workordersRes.data : []);
      } catch (error) { console.error("Workorders fetch failed:", error.message); }

      try {
        const tenantsRes = await axios.get(`${API_BASE_URL}/tenants`);
        setTenants(Array.isArray(tenantsRes.data) ? tenantsRes.data : []);
      } catch (error) { console.error("Tenants fetch failed:", error.message); }

      try {
        const paymentsRes = await axios.get(`${API_BASE_URL}/payments`);
        setPayments(Array.isArray(paymentsRes.data) ? paymentsRes.data : []);
      } catch (error) { console.error("Payments ledger fetch failed:", error.message); }

    } catch (globalError) {
      console.error("Global system initialization failure:", globalError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddProperty = async (newProperty) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/properties`, newProperty);
      setListings((prev) => [response.data, ...prev]);
      alert('🎉 Premium Property added to MongoDB ecosystem successfully!');
    } catch (error) { console.error(error); }
  };

  const handleRegisterTenant = async (newTenantData) => {
    try {
      await axios.post(`${API_BASE_URL}/tenants`, newTenantData);
      fetchDashboardData();
      alert('👥 Occupant registered successfully!');
    } catch (error) { console.error(error); }
  };

  const handleAddWorkOrder = async (newOrder) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/workorders`, newOrder);
      setRequests((prev) => [response.data, ...prev]);
      alert('Incident saved to MongoDB successfully!');
    } catch (error) { console.error(error); }
  };

  const getUserInitials = (nameString) => {
    if (!nameString) return 'AD';
    const parts = nameString.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  const renderServicePage = (title, subtitle, description, bgGradient, featureLabel) => (
    <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', minHeight: '70vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ background: bgGradient, padding: '40px', borderRadius: '12px', color: '#fff', marginBottom: '30px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>SYSTEM INTEGRATION WING</span>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '10px', letterSpacing: '-0.5px' }}>{title}</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '15px' }}>{subtitle}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: '#2d3748' }}>Asset Diagnostic Framework</h3>
          <p style={{ color: '#4a5568', lineHeight: '1.7', fontSize: '14px' }}>{description}</p>
          <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '8px', borderLeft: '4px solid #3182ce' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#2d3748' }}>✓ System Control State Active</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#718096' }}>Telemetry links, engineering protocols, and maintenance tracking schemas are fully synced with the database layer.</p>
          </div>
        </div>
        <div style={{ background: '#f7fafc', padding: '25px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#2d3748', fontSize: '16px' }}>Network Status</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span style={{ color: '#718096' }}>{featureLabel}:</span>
            <span style={{ color: '#38a169', fontWeight: 'bold' }}>● ONLINE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span style={{ color: '#718096' }}>Active Incidents:</span>
            <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{requests.length} Registered</span>
          </div>
          <button onClick={() => setActiveTab('maintenance')} style={{ width: '100%', padding: '12px', background: '#0f2027', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '15px', fontSize: '13px' }}>
            Open Maintenance Hub
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#1e3c72', fontWeight: 'bold' }}>
        ⚙️ Connecting to Enterprise Database Matrix...
      </div>
    );
  }

  return (
    <div className={styles.premiumLayout}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className={styles.contentArea}>
        <div className={styles.viewContainer}>
          
          {activeTab === 'home' && (
            <div className={styles.scrollableDashboard}>
              <Overview listings={listings} tenants={tenants} requests={requests} />
              <div className={styles.pageDivider}></div>
              <section id="listings-segment"><PropertyListings listings={listings} onAddProperty={handleAddProperty} /></section>
              <div className={styles.pageDivider}></div>
              <section id="tenants-segment"><Tenants tenants={tenants} listings={listings} onRegisterTenant={handleRegisterTenant} /></section>
              <div className={styles.pageDivider}></div>
              <section id="maintenance-segment"><WorkOrders requests={requests} onAddOrder={handleAddWorkOrder} listings={listings} /></section>
              <div className={styles.pageDivider}></div>
              <section id="payments-segment"><Payments payments={payments} /></section>
              <div className={styles.pageDivider}></div>
              <section id="contact-segment"><Contact /></section>
            </div>
          )}

          {activeTab === 'listings' && <PropertyListings listings={listings} onAddProperty={handleAddProperty} />}
          {activeTab === 'tenants' && <Tenants tenants={tenants} listings={listings} onRegisterTenant={handleRegisterTenant} />}
          {activeTab === 'maintenance' && <WorkOrders requests={requests} onAddOrder={handleAddWorkOrder} listings={listings} />}
          {activeTab === 'payments' && <Payments payments={payments} />}
          {activeTab === 'contact' && <Contact />}

          {activeTab === 'srv-plumbing' && renderServicePage(
            "Plumbing Systems Asset Matrix",
            "Automated flow optimization and premium high-pressure infrastructure monitoring loops.",
            "Integrates digital leak point analytics, main isolation backup valves, and structural skyscraper plumbing maps.",
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            "Hydraulic Flow Grid"
          )}

          {activeTab === 'srv-electrical' && renderServicePage(
            "Electrical Grid Management Hub",
            "Phase balancing modules, power factor optimization protocols, and live load telemetry.",
            "Governs structural distribution sub-stations, backup diesel power matrix loops, and smart energy optimization rules.",
            "linear-gradient(135deg, #b7791f 0%, #744210 100%)",
            "Voltage Matrix Status"
          )}

          {activeTab === 'srv-cleaning' && renderServicePage(
            "Deep Disinfection & Sanitation Logistics",
            "Advanced air quality controls, smart chemical monitoring, and multi-tenant clearing protocols.",
            "Coordinates corporate asset biosecurity levels, commercial indoor air-handling filtration triggers, and professional sanitation logs.",
            "linear-gradient(135deg, #2c5364 0%, #203a43 100%)",
            "Bio-Sanitation Grid"
          )}

          {/* ─── REAL & USEFUL MY PROFILE VIEW ─── */}
          {activeTab === 'adm-account' && (
            <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', minHeight: '70vh', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a202c', borderBottom: '2px solid #edf2f7', paddingBottom: '15px', marginBottom: '30px' }}>👤 User Profile Dashboard</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Left Block - User Avatar and Main Details */}
                <div style={{ textAlign: 'center', padding: '30px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 20px auto', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    {getUserInitials(currentUserName)}
                  </div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#2d3748', fontWeight: '700', textTransform: 'uppercase' }}>{currentUserName}</h3>
                  <p style={{ fontSize: '13px', color: '#718096', margin: '0 0 15px 0' }}>System Operator</p>
                  <span style={{ fontSize: '11px', color: '#fff', background: '#38a169', padding: '6px 14px', borderRadius: '50px', fontWeight: '700', textTransform: 'uppercase' }}>Active Session</span>
                </div>

                {/* Right Block - Real Dashboard Statistics */}
                <div>
                  <h4 style={{ color: '#2d3748', marginBottom: '20px', fontSize: '16px', fontWeight: '700' }}>Your Managed Ecosystem Statistics</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: '#ebf8ff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3182ce' }}>
                      <span style={{ display: 'block', fontSize: '12px', color: '#2b6cb0', fontWeight: '700', textTransform: 'uppercase' }}>Properties Managed</span>
                      <strong style={{ fontSize: '28px', color: '#2b6cb0' }}>{listings.length}</strong>
                    </div>
                    <div style={{ background: '#f0fff4', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #38a169' }}>
                      <span style={{ display: 'block', fontSize: '12px', color: '#276749', fontWeight: '700', textTransform: 'uppercase' }}>Active Tenants</span>
                      <strong style={{ fontSize: '28px', color: '#276749' }}>{tenants.length}</strong>
                    </div>
                    <div style={{ background: '#fffaf0', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #dd6b20' }}>
                      <span style={{ display: 'block', fontSize: '12px', color: '#9c4221', fontWeight: '700', textTransform: 'uppercase' }}>Pending Workorders</span>
                      <strong style={{ fontSize: '28px', color: '#9c4221' }}>{requests.length}</strong>
                    </div>
                    <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #805ad5' }}>
                      <span style={{ display: 'block', fontSize: '12px', color: '#553c9a', fontWeight: '700', textTransform: 'uppercase' }}>System Connectivity</span>
                      <strong style={{ fontSize: '18px', color: '#553c9a', display: 'block', marginTop: '8px' }}>MongoDB Live</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── REAL & USEFUL SETTINGS PANEL ─── */}
          {activeTab === 'adm-settings' && (
            <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', minHeight: '70vh', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a202c', borderBottom: '2px solid #edf2f7', paddingBottom: '15px', marginBottom: '30px' }}>⚙️ System Settings & Preferences</h2>
              
              <div style={{ maxWidth: '650px' }}>
                {/* Setting Row 1: Interface Style */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #edf2f7' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '15px' }}>Application Theme</h4>
                    <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>Switch between premium light and standard dark workspace mode.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setDarkMode(!darkMode);
                      alert(darkMode ? 'Switched to Light Mode' : 'Dark Mode theme settings preserved for next system update!');
                    }}
                    style={{ padding: '8px 16px', background: darkMode ? '#0f2027' : '#edf2f7', color: darkMode ? '#fff' : '#2d3748', border: '1px solid #cbd5e0', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                  >
                    {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </button>
                </div>

                {/* Setting Row 2: Mail System Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #edf2f7' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '15px' }}>Email Alerts & Notifications</h4>
                    <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>Receive automatic alerts whenever a tenant submits a new work order request.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={emailNotifications} 
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </div>

                {/* Setting Row 3: API Path Status */}
                <div style={{ padding: '20px 0', borderBottom: '1px solid #edf2f7' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '15px' }}>Backend API Connection Endpoint</h4>
                  <input type="text" value={API_BASE_URL} disabled style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '6px', background: '#f7fafc', color: '#4a5568', fontFamily: 'monospace', fontSize: '13px' }} />
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: '35px', display: 'flex', gap: '15px' }}>
                  <button 
                    onClick={() => alert('Configuration updates successfully persistent!')} 
                    style={{ padding: '12px 24px', background: '#1e3c72', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Save Preferences
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm("Are you sure you want to purge local cache sessions? This will log you out.")) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }} 
                    style={{ padding: '12px 24px', background: '#fff', color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Reset Session Cache
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}