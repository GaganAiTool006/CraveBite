import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ activeFilters, onToggleFilter }) {
  const filterPillStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '24px',
    border: '1px solid #e0e0e5',
    background: isActive ? '#f0f0f5' : 'white',
    color: '#02060c',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
      
      <button style={filterPillStyle(false)}>
        <span>Filter</span>
        <SlidersHorizontal size={14} />
      </button>

      <button style={filterPillStyle(false)}>
        <span>Sort By</span>
        <ChevronDown size={16} />
      </button>

      <button 
        style={filterPillStyle(activeFilters?.bookTable)}
        onClick={() => onToggleFilter('bookTable')}
      >
        Book a table
      </button>

      <button 
        style={filterPillStyle(activeFilters?.fastDelivery)}
        onClick={() => onToggleFilter('fastDelivery')}
      >
        Within 5km
      </button>

      <button 
        style={filterPillStyle(activeFilters?.rating4)}
        onClick={() => onToggleFilter('rating4')}
      >
        Rating 4+
      </button>

      <button 
        style={filterPillStyle(activeFilters?.pureVeg)}
        onClick={() => onToggleFilter('pureVeg')}
      >
        Pure Veg
      </button>

      <button 
        style={filterPillStyle(activeFilters?.alcohol)}
        onClick={() => onToggleFilter('alcohol')}
      >
        Serves Alcohol
      </button>

    </div>
  );
}
