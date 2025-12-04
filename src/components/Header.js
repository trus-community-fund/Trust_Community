'use client';

import React, { useState, useEffect } from 'react';
import { Bell, DownloadCloud, ShoppingCart, TrendingUp, CreditCard, QrCode, Activity } from 'lucide-react';

export default function Header({ communityStats, totalMembers, members = [], onOpenModal }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [displayMode, setDisplayMode] = useState('stats'); // 'stats' or 'top3'

  // Auto Rotate Display Logic (Every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayMode(prev => prev === 'stats' ? 'top3' : 'stats');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Install App Logic
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
    } else {
      alert("Install not supported or already installed.");
    }
  };

  // Prepare Top 3 Members
  const topMembers = members.slice(0, 3);

  return (
    <header className="animate-on-scroll">

      {/* --- DYNAMIC DISPLAY BOX --- */ }
      <div className="header-display" id="headerDisplay">
        <div className="ad-content">

          {displayMode === 'stats' ? (
            // MODE 1: BANK STATS
            <div className="ad-bank-stats-container animate-on-scroll">
               <img src="https://ik.imagekit.io/kdtvm0r78/IMG-20251202-WA0000.jpg" alt="Logo" className="ad-bank-logo" />
               <ul className="ad-bank-stats">
                  <li>Established: <strong>23 June 2024</strong></li>
                  <li>Total Members: <strong>{totalMembers || 0}</strong></li>
                  <li>Loan Disbursed: <strong>₹{(communityStats?.totalLoanDisbursed || 0).toLocaleString('en-IN')}</strong></li>
               </ul>
            </div>
          ) : (
            // MODE 2: TOP 3 MEMBERS
            <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <div className="ad-headline">🚀 Top Wealth Creators 🚀</div>
                <div className="ad-top-three-container animate-on-scroll">
                    {topMembers.map((m, idx) => (
                        <div key={idx} className="ad-top-three-member">
                            <img src={m.displayImageUrl} alt={m.name} className="ad-top-three-img" />
                            <p className="ad-top-three-name">{m.name}</p>
                            <p className="ad-top-three-amount">₹{Math.round(m.balance).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}

        </div>

        {/* Marquee */}
        <div className="ticker-wrap">
          <div className="ticker">
             ... Your trusted financial partner... Welcome to Trust Community Fund... 
          </div>
        </div>
      </div>

      <h1>Trust Community Fund</h1>
      <h4>ESTD: 23 JUNE 2024</h4>

      {/* Buttons */}
      <div className="header-actions">
        <div className="dynamic-buttons-wrapper">
          <button className="civil-button" style={{color:'#002366', border:'1px solid #002366'}} onClick={()=>alert('Coming Soon')}>
            <TrendingUp size={18}/> <b>PROFIT</b>
          </button>
          <button className="civil-button" style={{background:'#FFD700', color:'#000'}} onClick={()=>onOpenModal('sipStatus')}>
            <CreditCard size={18}/> <b>SIP STATUS</b>
          </button>
        </div>

        <div className="dynamic-buttons-wrapper">
           <button className="civil-button" style={{border:'1px solid #ccc'}} onClick={()=>alert('Coming Soon')}>
             <QrCode size={18}/> <b>QR</b>
           </button>
           <button className="civil-button" style={{background:'#dc3545', color:'white'}} onClick={()=>window.open('loan_dashbord.html')}>
             <Activity size={18}/> <b>LOAN</b>
           </button>
           <button className="notification-btn civil-button" style={{background:'#001540', border:'1px solid #FFD700'}} onClick={()=>window.location.href='notifications.html'}>
             <Bell size={18} color="#FFD700"/>
             <span className="notification-dot"></span>
           </button>
        </div>

        <div className="dynamic-buttons-wrapper" style={{flexDirection:'column', gap:'10px', marginTop:'10px'}}>
            <button className="civil-button" style={{background:'#00FFFF', color:'#000', width:'200px'}}>
               <ShoppingCart size={18}/> <b>BANK STORE</b>
            </button>
            {deferredPrompt && (
              <button className="civil-button" style={{background:'#28a745', color:'white', width:'200px'}} onClick={handleInstallClick}>
                 <DownloadCloud size={18}/> <b>INSTALL APP</b>
              </button>
            )}
        </div>
      </div>
    </header>
  );
}


