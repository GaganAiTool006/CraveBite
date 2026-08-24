import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function CategoryCarousel({ selectedCategory, onSelectCategory }) {
  return (
    <section style={{ marginBottom: '32px' }}>
      <div className="section-title-row">
        <h2 className="section-heading">What's on your mind?</h2>
      </div>

      <div className="category-scroll-container">
        <div
          className={`category-item-card ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <div className="category-img-wrapper" style={{ background: '#fff2e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#FC8019' }}>ALL</span>
          </div>
          <span className="category-name">All Items</span>
        </div>

        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <div
              key={cat.id}
              className={`category-item-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(isActive ? null : cat.name)}
            >
              <div className="category-img-wrapper">
                <img src={cat.image} alt={cat.name} className="category-img" />
              </div>
              <span className="category-name" style={{ color: isActive ? '#FC8019' : 'inherit', fontWeight: isActive ? '800' : '600' }}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
