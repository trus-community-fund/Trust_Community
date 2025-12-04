'use client';

import React, { useRef } from 'react';
import { DollarSign, Gift, Calendar, Percent } from 'lucide-react';

const INFO_CARDS = [
    { icon: <DollarSign size={20}/>, title: 'Fund Deposit', text: 'Sabhi sadasya milkar fund jama karte hain (Every Month SIP) ke roop mein.', img: 'https://i.ibb.co/LzBMSjTy/20251005-091714.png' },
    { icon: <Gift size={20}/>, title: 'Loan Provision', text: 'Zarooratmand sadasya ko usi fund se loan diya jaata hai.', img: 'https://i.ibb.co/WNkzG5rm/20251005-100155.png' },
    { icon: <Calendar size={20}/>, title: 'Loan Duration', text: 'Loan keval 1 mahine ke liye hota hai (nyunatam byaj par).', img: 'https://i.ibb.co/bjkNcWrv/20251005-100324.png' },
    { icon: <Percent size={20}/>, title: 'Interest Rate', text: 'Avadhi aur rashi ke anusaar byaj darein badal sakti hain.', img: 'https://i.ibb.co/3ypdpzWR/20251005-095800.png' }
];

export default function CommunityInfo({ letters }) {
  const sliderRef = useRef(null);
  const letterArray = letters ? Object.values(letters) : [];

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      <section className="info-slider-section animate-on-scroll">
        <h2>💡 Community Info</h2>
        <div className="info-slider-container">
           {INFO_CARDS.map((card, idx) => (
             <div key={idx} className="info-card-slide">
                <h3 style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'1.1rem'}}>{card.icon} {card.title}</h3>
                <p style={{fontSize:'0.9rem', color:'#555'}}>{card.text}</p>
                {card.img && <img src={card.img} style={{marginTop:'10px', borderRadius:'8px', border:'1px solid #eee'}} alt={card.title} />}
             </div>
           ))}
        </div>
      </section>

      {letterArray.length > 0 && (
        <section style={{marginTop:'30px', textAlign:'center', paddingBottom:'20px'}}>
           <h2>About Community Letter</h2>
           <div className="slider-container">

              {/* Manual Scroll Buttons */}
              <button className="slider-btn prev" onClick={scrollLeft}>❮</button>

              {/* Scrollable Container */}
              <div className="manual-scroll-container" ref={sliderRef}>
                 {letterArray.map((letter, idx) => (
                    <div className="slide" key={idx}>
                       <img src={letter.imageUrl} alt="Letter" style={{width:'100%', borderRadius:'12px'}} />
                    </div>
                 ))}
              </div>

              <button className="slider-btn next" onClick={scrollRight}>❯</button>
           </div>
        </section>
      )}
    </>
  );
}


