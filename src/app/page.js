'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initFirebase } from '../lib/firebase';
import { processRawData, DEFAULT_IMAGE } from '../lib/utils';
import Header from '../components/Header';

export default function Home() {
  const [data, setData] = useState({ processedMembers: [], communityStats: {} });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const firebase = await initFirebase();
      if (!firebase) return;
      const auth = firebase.auth();

      auth.onAuthStateChanged(async (u) => {
        if (!isMounted) return;
        if (!u) {
          router.push('/login');
        } else {
          const db = firebase.database();
          const dbRef = db.ref();
          dbRef.on('value', (snapshot) => {
            if (!isMounted) return;
            const processed = processRawData(snapshot.val());
            setData(processed);
            setLoading(false);
          });
        }
      });
    };
    run();
    return () => { isMounted = false; };
  }, [router]);

  if (loading) return (
    <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#002366', fontWeight:'bold'}}>
      Loading Trust Community...
    </div>
  );

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '80px', backgroundColor: 'var(--bg-color)' }}>
      <Header />

      {/* Stats Section */}
      <div style={{ padding: '20px' }}>
        <div className="stats-card-luxury">
          <h3 style={{ margin: 0, color: '#555', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Available Balance
          </h3>
          <h1 style={{ margin: '10px 0', color: 'var(--success-color)', fontSize: '2.5em', fontWeight: '800' }}>
            ₹{(data.communityStats.availableCommunityBalance || 0).toLocaleString('en-IN')}
          </h1>
          <p style={{ margin: 0, fontSize: '0.9em', color: '#888' }}>
            Total SIP: <strong>₹{(data.communityStats.totalSipAmount || 0).toLocaleString('en-IN')}</strong>
          </p>
        </div>
      </div>

      {/* Members Grid - Using Original Styling */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ 
          color: 'var(--primary-color)', 
          borderBottom: '3px solid var(--accent-gold)', 
          paddingBottom: '5px', 
          display: 'inline-block',
          fontSize: '1.2em',
          fontWeight: '800',
          textTransform: 'uppercase'
        }}>
          Community Members ({data.processedMembers.length})
        </h3>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', 
          gap: '15px', 
          marginTop: '20px' 
        }}>
          {data.processedMembers.map((member, index) => (
            <div key={member.id} className={index < 3 ? "framed-card-wrapper gold-card" : "framed-card-wrapper"} style={{height: 'auto', minHeight: '160px'}}>

              {/* Card Logic: Top 3 get Special Frames (Image logic to be added later), currently showing clean cards */}
              <div style={{ 
                background: 'white', 
                padding: '15px', 
                borderRadius: '12px', 
                textAlign: 'center', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                border: '1px solid var(--border-color)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <img 
                  src={member.displayImageUrl || DEFAULT_IMAGE} 
                  style={{ 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    border: '3px solid var(--accent-gold)',
                    marginBottom: '10px'
                  }} 
                />
                <p style={{ 
                  margin: '0', 
                  fontWeight: '700', 
                  fontSize: '0.85em', 
                  color: 'var(--primary-color)',
                  lineHeight: '1.2'
                }}>
                  {member.name}
                </p>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  color: member.balance >= 0 ? 'var(--success-color)' : 'var(--danger-color)', 
                  fontSize: '0.9em', 
                  fontWeight: '900' 
                }}>
                  ₹{member.balance.toLocaleString('en-IN')}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
