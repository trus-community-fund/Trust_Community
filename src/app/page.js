'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initFirebase } from '../lib/firebase';
import { processRawData } from '../lib/utils';

import Header from '../components/Header';
import MemberSlider from '../components/MemberSlider';
import QuickActions from '../components/QuickActions';
import ProductSlider from '../components/ProductSlider';
import CommunityInfo from '../components/CommunityInfo';
import Modals from '../components/Modals';

export default function HomePage() {
  const [data, setData] = useState({ 
    processedMembers: [], 
    communityStats: {}, 
    allProducts: {}, 
    adminSettings: {} 
  });

  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); 
  const [selectedItem, setSelectedItem] = useState(null); 

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const firebase = await initFirebase();
      if (!firebase) return;

      const auth = firebase.auth();
      const db = firebase.database();

      auth.onAuthStateChanged((user) => {
        if (!isMounted) return;
        if (!user) {
          router.push('/login');
        } else {
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

  // Modal Handlers
  const openModal = (type, item = null) => {
    setSelectedItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  // Special Handler for Image Zoom
  const handleImageClick = (imageUrl) => {
      openModal('image', { imageUrl });
  };

  if (loading) return (
    <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', flexDirection:'column', color:'#002366'}}>
      <img src="https://ik.imagekit.io/kdtvm0r78/IMG-20251202-WA0000.jpg" alt="Logo" style={{width:'80px', marginBottom:'20px', borderRadius:'50%'}} />
      <h3>Trust Community Fund...</h3>
    </div>
  );

  return (
    <main className="content-wrapper">

      <Header 
        communityStats={data.communityStats} 
        totalMembers={data.processedMembers.length} 
        onOpenModal={openModal} 
      />

      <MemberSlider 
        members={data.processedMembers} 
        onMemberClick={(m) => openModal('profile', m)}
        onOpenModal={openModal} 
      />

      <QuickActions 
        totalMembers={data.processedMembers.length} 
        totalLoan={data.communityStats.totalLoanDisbursed} 
        onOpenModal={openModal} 
      />

      <ProductSlider 
        products={data.allProducts} 
        onOpenEmiModal={(p) => openModal('emi', p)} 
      />

      <CommunityInfo 
        letters={data.adminSettings?.community_letters} 
      />

      {/* Passing onImageClick to Modals */}
      <Modals 
        activeModal={activeModal} 
        onClose={closeModal}
        onImageClick={handleImageClick}
        data={{
          communityStats: data.communityStats,
          member: selectedItem, 
          product: selectedItem, 
          members: data.processedMembers,
          imageUrl: selectedItem?.imageUrl // For image modal
        }}
      />

      <footer className="footer-royal">
        <p>© {new Date().getFullYear()} Trust Community Fund. All rights reserved.</p>
        <a href="#" style={{fontSize:'0.8em', marginTop:'5px', display:'inline-block'}}>Exit</a>
      </footer>

    </main>
  );
}


