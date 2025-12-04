'use client';

import React from 'react';

export default function ProductSlider({ products, onOpenEmiModal }) {
  if (!products || Object.keys(products).length === 0) return null;

  return (
    <section className="products-section animate-on-scroll">
      <h2>Products on EMI</h2>
      <div className="products-container">
        {Object.entries(products).map(([id, product]) => {
          const price = parseFloat(product.price) || 0;
          const mrp = parseFloat(product.mrp) || 0;
          const hasEmi = product.emi && Object.keys(product.emi).length > 0;

          return (
            <div key={id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
              </div>

              <div className="product-info">
                 <p className="product-name">{product.name}</p>
                 <div style={{display:'flex', alignItems:'center', gap:'5px', marginBottom:'5px'}}>
                    <span className="product-price">₹{price.toLocaleString('en-IN')}</span>
                    {mrp > price && <span style={{fontSize:'0.8rem', textDecoration:'line-through', color:'#aaa'}}>₹{mrp.toLocaleString('en-IN')}</span>}
                 </div>

                 {hasEmi && (
                    <button 
                        onClick={() => onOpenEmiModal(product)}
                        style={{
                            background:'transparent', border:'1px solid #aaa', borderRadius:'4px',
                            fontSize:'0.75rem', padding:'4px 8px', cursor:'pointer', color:'#555',
                            width:'100%', marginTop:'5px'
                        }}
                    >
                      View EMI Plans
                    </button>
                 )}
              </div>

              <div className="product-actions">
                 <a href={`https://wa.me/917903698180?text=I want to buy ${product.name}`} target="_blank" className="product-btn whatsapp">
                    <img src="https://www.svgrepo.com/show/452133/whatsapp.svg" alt="WA" width="18" />
                 </a>
                 <a href={product.exploreLink || '#'} target="_blank" className="product-btn explore">Explore</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


