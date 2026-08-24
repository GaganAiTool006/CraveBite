import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function CustomizationModal({ item, restaurant, onClose, onConfirmAdd }) {
  const [selectedChoices, setSelectedChoices] = useState(() => {
    const initial = {};
    if (item.options) {
      item.options.forEach((opt) => {
        initial[opt.name] = opt.choices[0];
      });
    }
    return initial;
  });

  const calculateTotalPrice = () => {
    let price = item.price;
    Object.values(selectedChoices).forEach((choice) => {
      if (choice && choice.price) {
        price += choice.price;
      }
    });
    return price;
  };

  const handleSelect = (optionName, choice) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [optionName]: choice
    }));
  };

  const handleAddToCart = () => {
    onConfirmAdd(item, restaurant, selectedChoices, calculateTotalPrice());
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Customise {item.name}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Base price ₹{item.price}
          </p>

          <div style={{ marginTop: '20px' }}>
            {item.options?.map((optionGroup) => (
              <div key={optionGroup.name} style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>
                  {optionGroup.name}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {optionGroup.choices.map((choice) => {
                    const isSelected = selectedChoices[optionGroup.name]?.label === choice.label;
                    return (
                      <label
                        key={choice.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid #FC8019' : '1px solid #eee',
                          background: isSelected ? '#fff8f2' : 'white',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleSelect(optionGroup.name, choice)}
                      >
                        <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '500' }}>
                          {choice.label}
                        </span>
                        {isSelected && <Check size={16} color="#FC8019" />}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Item Total</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                ₹{calculateTotalPrice()}
              </div>
            </div>

            <button
              style={{
                background: '#FC8019',
                color: 'white',
                fontWeight: '800',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '15px'
              }}
              onClick={handleAddToCart}
            >
              Add Item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
