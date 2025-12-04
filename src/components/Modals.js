'use client';

import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children, title, isLuxury = false, isProfile = false, isImage = false }) => {
  if (!isOpen) return null;
  return (
    <div className={`modal show`}>
      <div className={`modal-content ${isLuxury ? 'luxury-modal' : ''}`} style={isImage ? {background:'transparent', boxShadow:'none', padding:0, maxWidth:'95%'} : {}}>
        <span className="close" onClick={onClose} style={isImage ? {color:'white', background:'rgba(0,0,0,0.5)', borderRadius:'50%', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center', top:'-50px', right:'0'} : {}}>×</span>

        {isProfile && children.headerImage && (
             <div className="profile-modal-header" style={{width:'100px', height:'100px', margin:'-50px auto 20px', borderRadius:'50%', border:'5px solid white', overflow:'hidden', boxShadow:'0 5px 15px rgba(0,0,0,0.2)'}}>
                <img src={children.headerImage} alt="Profile" style={{width:'100%', height:'100%', objectFit:'cover'}} />
             </div>
        )}

        {title && <h2 className={isLuxury ? 'luxury-title' : ''} style={isImage ? {display:'none'} : {textAlign:'center', marginBottom:'20px', color: isLuxury ? '#D4AF37' : '#002366'}}>{title}</h2>}
        {isProfile ? children.body : children}
      </div>
    </div>
  );
};

export default function Modals({ activeModal, onClose, data = {}, onImageClick }) {

  // 1. Image Full View Modal
  if (activeModal === 'image') {
      return (
          <Modal isOpen={true} onClose={onClose} isImage={true}>
              <img src={data.imageUrl} alt="Full View" className="image-modal-content" />
          </Modal>
      );
  }

  // 2. All Members Modal (GRID LAYOUT + IMAGE CLICK)
  if (activeModal === 'allMembers') {
     const members = data.members || [];
     const sortedMembers = [...members].sort((a, b) => a.name.localeCompare(b.name));

     return (
        <Modal isOpen={true} onClose={onClose} title="All Community Members">
            <div className="all-members-grid">
                {sortedMembers.map(m => (
                    <div key={m.id} className="grid-card">
                        {/* Click on Image triggers Full View */}
                        <img 
                            src={m.displayImageUrl} 
                            alt={m.name} 
                            className="grid-img"
                            onClick={(e) => {
                                e.stopPropagation();
                                onImageClick(m.displayImageUrl);
                            }}
                        />
                        <span className="grid-name">{m.name}</span>
                    </div>
                ))}
            </div>
        </Modal>
     );
  }

  // 3. SIP Status List (FIXED DESIGN)
  if (activeModal === 'sipStatus') {
     const members = data.members || [];
     return (
        <Modal isOpen={true} onClose={onClose} title="Current Month SIP Status">
           <div className="sip-list-container">
              {members.map(m => (
                 <div key={m.id} className="sip-row">
                    <div className="sip-user-info">
                        <img src={m.displayImageUrl} alt={m.name} className="sip-user-img" />
                        <span className="sip-user-name">{m.name}</span>
                    </div>
                    <div className={`sip-status-btn ${m.sipStatus.paid ? 'status-paid' : 'status-unpaid'}`}>
                       {m.sipStatus.paid ? 'Paid' : 'Not Paid'}
                    </div>
                 </div>
              ))}
           </div>
        </Modal>
     );
  }

  // 4. Penalty Wallet (FIXED DATA DISPLAY)
  if (activeModal === 'penalty') {
      // Data prop se correctly value uthana
      const penaltyBalance = data.communityStats?.totalPenaltyBalance || 0;
      const [showHistory, setShowHistory] = useState(false);

      return (
        <Modal isOpen={true} onClose={onClose} title="PENALTY WALLET" isLuxury={true}>
            <div style={{background:'rgba(220, 53, 69, 0.08)', padding:'25px', borderRadius:'15px', textAlign:'center', marginBottom:'20px'}}>
                <div style={{color:'#dc3545', fontSize:'2.5rem', fontWeight:'900'}}>₹{penaltyBalance.toLocaleString('en-IN')}</div>
                <p style={{color:'#002366', fontWeight:'700', fontSize:'0.9rem', margin:'5px 0 0'}}>CURRENT PENALTY BALANCE</p>
            </div>

            <hr style={{border:0, height:'1px', background:'#D4AF37', margin:'20px 0', opacity:0.5}} />

            <button className="pill-button" style={{width:'100%', justifyContent:'center'}} onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? 'HIDE HISTORY' : 'VIEW HISTORY'}
            </button>

            {showHistory && (
                <div style={{marginTop:'15px', textAlign:'center', color:'#888', fontSize:'0.9rem'}}>
                   <p>No penalty history records found.</p>
                </div>
            )}
        </Modal>
      );
  }

  // 5. Balance Modal
  if (activeModal === 'balance') {
    const { totalSipAmount, totalCurrentLoanAmount, netReturnAmount, availableCommunityBalance } = data.communityStats || {};
    return (
      <Modal isOpen={true} onClose={onClose} title="Community Funds" isLuxury={true}>
         {/* Same Balance UI as before */}
         <div className="balance-group">
            <span className="balance-label">TOTAL SIP AMOUNT</span>
            <span className="balance-value green-text">₹{(totalSipAmount||0).toLocaleString('en-IN')}</span>
         </div>
         <div className="balance-group">
            <span className="balance-label">TOTAL LOAN GIVEN</span>
            <span className="balance-value red-text">₹{(totalCurrentLoanAmount||0).toLocaleString('en-IN')}</span>
         </div>
         <div className="balance-group">
             <span className="balance-label">NET RETURN (PROFIT)</span>
             <span className="balance-value gold-text-value">₹{(netReturnAmount||0).toLocaleString('en-IN')}</span>
         </div>
         <div style={{background:'#e8f5e9', padding:'15px', borderRadius:'10px', marginTop:'15px', textAlign:'center', border:'1px solid #28a745'}}>
             <p style={{margin:0, fontSize:'0.9rem', fontWeight:'700', color:'#155724'}}>AVAILABLE BALANCE</p>
             <div style={{fontSize:'2rem', fontWeight:'900', color:'#28a745'}}>₹{(availableCommunityBalance||0).toLocaleString('en-IN')}</div>
         </div>
      </Modal>
    );
  }

  // 6. Profile Modal
  if (activeModal === 'profile' && data.member) {
    const m = data.member;
    return (
      <Modal isOpen={true} onClose={onClose} isProfile={true} children={{
          headerImage: m.displayImageUrl,
          body: (
             <>
                {m.isPrime && <div style={{textAlign:'center', background:'#D4AF37', color:'black', display:'inline-block', padding:'2px 8px', borderRadius:'4px', fontWeight:'bold', fontSize:'0.8rem', position:'absolute', top:'80px', right:'20px'}}>Prime</div>}
                <h2 style={{textAlign:'center', color:'#002366', marginBottom:'20px'}}>{m.name}</h2>
                <ul className="profile-stats-list">
                    <li style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                        <span style={{fontWeight:'bold', color:'#555'}}>Balance</span>
                        <span style={{fontWeight:'bold', color: (m.balance||0)>=0 ? '#28a745' : '#dc3545'}}>₹{(m.balance||0).toLocaleString()}</span>
                    </li>
                    <li style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                        <span style={{fontWeight:'bold', color:'#555'}}>Loan Return</span>
                        <span style={{fontWeight:'bold', color:'#17a2b8'}}>₹{(m.totalReturn||0).toLocaleString()}</span>
                    </li>
                    <li style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                        <span style={{fontWeight:'bold', color:'#555'}}>Loan Count</span>
                        <span style={{fontWeight:'bold'}}>{m.loanCount||0}</span>
                    </li>
                </ul>
                <button style={{width:'100%', padding:'12px', marginTop:'20px', backgroundColor:'#002366', color:'white', border:'none', borderRadius:'8px', fontWeight:'bold'}} onClick={()=>alert('Full view protected')}>
                   Full View
                </button>
             </>
          )
      }} />
    );
  }

  // 7. EMI Modal
  if (activeModal === 'emi' && data.product) {
     const p = data.product;
     const price = parseFloat(p.price);
     return (
        <Modal isOpen={true} onClose={onClose} title={`EMI: ${p.name}`}>
           <ul style={{listStyle:'none', padding:0}}>
              {Object.entries(p.emi || {}).map(([months, rate]) => {
                  const r = parseFloat(rate);
                  const m = parseInt(months);
                  const total = price * (1 + r/100);
                  const monthly = Math.ceil(total/m);
                  return (
                     <li key={months} style={{display:'flex', justifyContent:'space-between', padding:'12px', borderBottom:'1px solid #eee', alignItems:'center'}}>
                        <div style={{fontWeight:'bold', fontSize:'1.1rem'}}>{months} Months</div>
                        <div style={{textAlign:'right'}}>
                            <div style={{fontWeight:'bold', color:'#002366'}}>₹{monthly.toLocaleString()}/mo</div>
                            <div style={{fontSize:'0.8rem', color:'#777'}}>{r}% Interest</div>
                        </div>
                     </li>
                  );
              })}
           </ul>
        </Modal>
     );
  }

  return null;
}


