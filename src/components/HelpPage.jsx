import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, PhoneCall } from 'lucide-react';

const FAQS = [
  {
    category: 'Partner Onboarding',
    q: 'What are the mandatory documents needed to list my restaurant on Swiggy?',
    a: 'You need FSSAI Licence copy, PAN Card copy, GST Registration (if applicable), and Bank Account details (Cancelled cheque).'
  },
  {
    category: 'Legal',
    q: 'What are the charges for cancellation?',
    a: 'A 100% cancellation fee is applicable if you cancel after the restaurant has accepted the order or if the delivery partner has been assigned.'
  },
  {
    category: 'Refunds',
    q: 'When will I get my refund?',
    a: 'Refunds are typically processed within 3-5 business days. For Swiggy Money, it is instant. For credit cards, it may take up to 7 days depending on your bank.'
  },
  {
    category: 'Orders',
    q: 'Can I edit my order after placing it?',
    a: 'Currently, you cannot edit an order once placed. You may need to cancel it (if within the grace period) and place a new one.'
  }
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Help & Support</h1>
        <p style={{ color: 'var(--text-muted)' }}>Let's take a step ahead and help you better.</p>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Frequently Asked Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '16px' }}>
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', background: 'transparent' }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: '#FC8019', fontWeight: '700', marginBottom: '4px' }}>{faq.category}</div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-dark)' }}>{faq.q}</div>
                </div>
                {openIndex === idx ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
              </button>
              
              {openIndex === idx && (
                <div style={{ padding: '12px 0 0 0', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#fff2e6', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <MessageSquare size={32} color="#FC8019" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Chat with us</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '16px' }}>Our support executives are available 24x7 to assist you.</p>
          <button style={{ background: '#FC8019', color: 'white', padding: '10px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>
            Start Chat
          </button>
        </div>

        <div style={{ background: '#e8f5ee', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <PhoneCall size={32} color="var(--secondary-green)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Call Support</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '16px' }}>For urgent issues regarding live orders.</p>
          <button style={{ background: 'var(--secondary-green)', color: 'white', padding: '10px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}
