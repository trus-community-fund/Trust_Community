'use client';

import React from 'react';
import { TrendingUp, List, MessageCircle, FileText, Cpu, Image as ImageIcon, Percent } from 'lucide-react';

export default function QuickActions({ totalMembers, totalLoan, onOpenModal }) {
  return (
    <section className="action-cards-section animate-on-scroll">
      <h2>Quick Actions</h2>
      <div className="action-cards">

        {/* 1. All Members Count */}
        <div className="action-card info-card" onClick={() => onOpenModal('allMembers')}>
          <img src="https://ik.imagekit.io/kdtvm0r78/IMG-20251202-WA0000.jpg" alt="Icon" className="action-card-icon-img" />
          <span>All members</span>
          <span className="info-card-value">{totalMembers || 0}</span>
        </div>

        {/* 2. All Time Loan */}
        <div className="action-card info-card" onClick={() => window.open('loan_dashbord.html')}>
          <TrendingUp className="action-card-icon" />
          <span>All time loan<br/><small style={{color: 'var(--primary-color)', fontWeight:'bold'}}>Click here</small></span>
          <span className="info-card-value total-loan-value">₹{(totalLoan || 0).toLocaleString('en-IN')}</span>
        </div>

        {/* 3. All Members Info */}
        <a href="members.html" className="action-card">
          <List className="action-card-icon" />
          <span>All members info</span>
        </a>

        {/* 4. WhatsApp Support (Green) */}
        <a href="https://wa.me/917903698180" target="_blank" className="action-card whatsapp-card">
          <img src="https://www.svgrepo.com/show/452133/whatsapp.svg" alt="Whatsapp" className="action-card-icon-img" />
          <span>Whatsapp Support</span>
        </a>

        {/* 5. Loan Form */}
        <a href="loan_form.html" className="action-card">
          <FileText className="action-card-icon" />
          <span>Loan form</span>
        </a>

        {/* 6. Jarvis AI */}
        <a href="Jarvis.html" className="action-card">
          <Cpu className="action-card-icon" />
          <span>Jarvis Ai</span>
        </a>

        {/* 7. Gallery */}
        <a href="gallery.html" className="action-card">
          <ImageIcon className="action-card-icon" />
          <span>Gallery</span>
        </a>

        {/* 8. Loan Calculator */}
        <a href="calculator.html" className="action-card">
          <Percent className="action-card-icon" />
          <span>Loan Calculator</span>
        </a>

      </div>
    </section>
  );
}

