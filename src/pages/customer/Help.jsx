import React, { useState } from 'react';
import { FiHelpCircle, FiMessageSquare, FiPhone, FiMail, FiChevronDown, FiCheck } from 'react-icons/fi';

export default function Help() {
  const faqs = [
    { q: 'How do I track my active order?', a: 'Once an order is confirmed, you can navigate to "My Orders" or click "Live Track" to monitor real-time updates from kitchen preparation to delivery partner arrival.' },
    { q: 'What payment options are supported?', a: 'We support all major Indian UPI apps (Google Pay, PhonePe, Paytm, CRED), Credit/Debit cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery.' },
    { q: 'How do I apply coupon codes for discounts?', a: 'During checkout or on the Cart page, type your promo code into the "Apply Coupon" box or choose from the available voucher list.' },
    { q: 'Can I cancel or modify my order after placing it?', a: 'You can cancel an order within 60 seconds of placing it before the kitchen accepts preparation. After acceptance, please contact our support team.' },
    { q: 'How do I become a Restaurant or Delivery partner?', a: 'Click "Partner with us" in the footer or visit the Partner Login portal in the top switcher bar to register your kitchen or vehicle.' }
  ];

  const [openIdx, setOpenIdx] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (ticketSubject && ticketMessage) {
      setSubmitted(true);
      setTimeout(() => {
        setTicketSubject('');
        setTicketMessage('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: '40px 0' }}>
      <div className="cb-container" style={{ maxWidth: '840px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontSize: '28px'
          }}>
            <FiHelpCircle />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-main)' }}>
            Help & Customer Support
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Find quick answers to common questions or reach out to our dedicated 24/7 support desk.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="cb-card" style={{ padding: '28px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Frequently Asked Questions</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    background: openIdx === idx ? 'var(--bg-subtle)' : 'white'
                  }}
                >
                  <span>{faq.q}</span>
                  <FiChevronDown style={{ transform: openIdx === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {openIdx === idx && (
                  <div style={{ padding: '16px 20px', background: 'white', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', borderTop: '1px solid var(--border)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Ticket */}
        <div className="cb-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Send Support Ticket</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Have an issue with an order or payment? Drop us a line and an agent will reply within 5 minutes.
          </p>

          {submitted && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '14px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck size={18} /> Support ticket #TK-84192 created! We are reviewing your request.
            </div>
          )}

          <form onSubmit={handleSubmitTicket}>
            <div className="cb-form-group">
              <label className="cb-label">Subject / Issue Topic</label>
              <input 
                type="text" 
                required 
                placeholder="E.g. Delivery delayed for Order #ORD-98231" 
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="cb-input" 
              />
            </div>

            <div className="cb-form-group">
              <label className="cb-label">Message Details</label>
              <textarea 
                rows="4" 
                required 
                placeholder="Describe your issue with order number or restaurant name..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="cb-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="cb-btn cb-btn-primary">
              <FiMessageSquare /> Submit Support Ticket
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
