'use client';

import React from 'react';
import { Wallet, Eye } from 'lucide-react'; // Icons added

const DEFAULT_IMAGE = 'https://i.ibb.co/HTNrbJxD/20250716-222246.png';

const FRAMES = {
  gold: 'https://ik.imagekit.io/kdtvm0r78/1764742107098.png',
  silver: 'https://ik.imagekit.io/kdtvm0r78/20251203_134510.png',
  bronze: 'https://ik.imagekit.io/kdtvm0r78/20251203_133726.png',
  normal: 'https://i.ibb.co/Y7LYKDcb/20251007-103318.png'
};

export default function MemberSlider({ members, onMemberClick, onOpenModal }) {
  if (!members || members.length === 0) return <div className="loading-text">Loading Members...</div>;

  return (
    <section className="bank-members animate-on-scroll">
      <div className="header-container">
        <h2 className="bank-headline">COMMUNITY MEMBERS</h2>

        {/* Updated Buttons with Pill Style */}
        <div className="header-buttons-wrapper">
           <button className="pill-button" onClick={() => onOpenModal('penalty')}>
             <Wallet size={16} /> बैंक WALLET
           </button>
           <button className="pill-button" onClick={() => onOpenModal('balance')}>
             <Eye size={16} /> VIEW BALANCE
           </button>
        </div>
      </div>

      <div className="member-slider" id="memberContainer">
        {members.map((member, index) => {
          let rankClass = '';
          let frameUrl = FRAMES.normal;
          let rankType = 'normal';

          if (index === 0) { rankClass = 'gold-card'; frameUrl = FRAMES.gold; rankType = 'gold'; }
          else if (index === 1) { rankClass = 'silver-card'; frameUrl = FRAMES.silver; rankType = 'silver'; }
          else if (index === 2) { rankClass = 'bronze-card'; frameUrl = FRAMES.bronze; rankType = 'bronze'; }
          else { rankClass = 'normal-framed-card-wrapper'; }

          const isTop3 = index < 3;
          const wrapperClass = isTop3 ? `framed-card-wrapper ${rankClass}` : `normal-framed-card-wrapper`;

          return (
            <div key={member.id} className={`${wrapperClass} animate-on-scroll`} onClick={() => onMemberClick(member)}>

              {isTop3 ? (
                <div className="framed-card-content">
                  <img src={member.displayImageUrl || DEFAULT_IMAGE} alt={member.name} className="framed-member-photo" loading="lazy" />
                  <img src={frameUrl} alt="Frame" className="card-frame-image" />
                  <div className="framed-info-container">
                    <p className={`framed-member-name ${rankType}-text`}>{member.name}</p>
                    <div className={`framed-balance-badge ${rankType}-bg`}>
                      ₹{Math.round(member.balance).toLocaleString('en-IN')}
                    </div>
                  </div>
                  {member.isPrime && <div className="framed-prime-tag">Prime</div>}
                </div>
              ) : (
                <div className="normal-card-content">
                   <img src={member.displayImageUrl || DEFAULT_IMAGE} alt={member.name} className="normal-framed-photo" loading="lazy" />
                   <img src={frameUrl} alt="Frame" className="normal-card-frame-image" />
                   <div className="normal-card-rank">{index + 1}</div>
                   <div className="normal-info-container">
                      <p className="normal-framed-name">{member.name}</p>
                      <div className="normal-framed-balance">
                         ₹{Math.round(member.balance).toLocaleString('en-IN')}
                      </div>
                   </div>
                   {member.isPrime && <div className="normal-prime-tag">Prime</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


