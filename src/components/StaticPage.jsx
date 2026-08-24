import React from 'react';

const pageData = {
  'About Us': {
    icon: '🏢',
    heading: 'About Swiggy Clone',
    desc: 'Our mission is to elevate the quality of life for the urban consumer with unparalleled convenience. Engaging and empowering an entire ecosystem of consumers, restaurants, and delivery partners.',
    highlights: ['✓ Founded in 2026', '✓ Presence in 500+ cities', '✓ 100K+ Restaurant Partners']
  },
  'Swiggy Corporate': {
    icon: '💼',
    heading: 'Corporate Solutions',
    desc: 'Empower your employees with the best food ordering experience. Manage team lunches, corporate events, and daily allowances seamlessly with our corporate dashboard.',
    highlights: ['✓ Consolidated Invoicing', '✓ Custom Meal Plans', '✓ Dedicated Account Manager']
  },
  'Careers': {
    icon: '🚀',
    heading: 'Join Our Team',
    desc: 'We are a team of passionate problem-solvers. If you thrive in a fast-paced environment and want to build products that impact millions of lives, come join us!',
    highlights: ['✓ Open work culture', '✓ Health & Wellness benefits', '✓ Rapid growth opportunities']
  },
  'Team & Tech': {
    icon: '💻',
    heading: 'Engineering at Swiggy',
    desc: 'Our tech stack is built to handle massive scale. From real-time location tracking algorithms to AI-driven personalized recommendations, our engineering team solves complex problems daily.',
    highlights: ['✓ High-scale Microservices', '✓ Advanced ML Models', '✓ Open Source Contributions']
  },
  'Swiggy One': {
    icon: '⭐',
    heading: 'Swiggy One Membership',
    desc: 'Get unlimited free deliveries, extra discounts on restaurants, and exclusive benefits on Instamart and Dineout with a single membership.',
    highlights: ['✓ Unlimited Free Delivery', '✓ Up to 30% Extra Off', '✓ Access to VIP Deals']
  },
  'Swiggy Instamart': {
    icon: '🛒',
    heading: 'Instamart - Groceries in 10 mins',
    desc: 'Swiggy Instamart delivers your daily essentials and groceries right to your doorstep in minutes. Fresh produce, snacks, and household items.',
    highlights: ['✓ 10-minute Delivery', '✓ 5000+ Products', '✓ Fresh Fruits & Veggies']
  },
  'Partner with us': {
    icon: '🤝',
    heading: 'Grow your Restaurant',
    desc: 'Partner with us to reach more customers, increase your revenue, and streamline your delivery operations. Get access to our vast delivery fleet and analytics dashboard.',
    highlights: ['✓ Increase Revenue by 40%', '✓ Real-time Analytics', '✓ Weekly Payouts']
  },
  'Ride with us': {
    icon: '🛵',
    heading: 'Become a Delivery Partner',
    desc: 'Join our fleet of delivery partners and earn on your own schedule. Get weekly payouts, accidental insurance, and flexible working hours.',
    highlights: ['✓ Zero Joining Fees', '✓ Flexible Timings', '✓ Medical Insurance Coverage']
  },
  'Available Locations': {
    icon: '📍',
    heading: 'Where We Deliver',
    desc: 'Swiggy is currently available in over 500+ cities across India. Enter your exact location to see restaurants delivering near you.',
    highlights: ['✓ Top Tier Cities (Delhi, Mumbai, Bengaluru)', '✓ Expanding to 100 new towns this year', '✓ Fast 30-min deliveries everywhere']
  },
  'Terms & Conditions': {
    icon: '📜',
    heading: 'Terms of Service',
    desc: 'Please read our terms and conditions carefully before using our application. These rules ensure a safe and smooth experience for customers and partners.',
    highlights: ['✓ User Guidelines', '✓ Refund Policies', '✓ Liability Terms']
  },
  'Privacy Policy': {
    icon: '🔒',
    heading: 'Your Privacy Matters',
    desc: 'We are committed to protecting your personal data. Learn how we collect, store, and use your information to improve your food delivery experience.',
    highlights: ['✓ Secure Data Encryption', '✓ No Third-party Selling', '✓ Transparent Data Usage']
  },
  'Investor Relations': {
    icon: '📈',
    heading: 'Invest in Swiggy',
    desc: 'Swiggy is revolutionizing the convenience economy. Access our financial reports, stock information, and corporate governance policies.',
    highlights: ['✓ Annual Financial Reports', '✓ Quarterly Earnings Calls', '✓ Corporate Governance']
  },
  'Swiggy News': {
    icon: '📰',
    heading: 'Latest News & Updates',
    desc: 'Stay up to date with the latest product launches, company milestones, and behind-the-scenes stories from the Swiggy team.',
    highlights: ['✓ Tech Innovations', '✓ Sustainability Goals', '✓ Community Initiatives']
  }
};

export default function StaticPage({ title }) {
  const data = pageData[title] || pageData['About Us'];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', minHeight: '65vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ width: '90px', height: '90px', background: '#fff2e6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '40px' }}>
          {data.icon}
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-dark)' }}>
          {data.heading}
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '700px' }}>
          {data.desc}
        </p>
      </div>
      
      <div style={{ background: 'white', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '40px', boxShadow: 'var(--shadow-md)', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: 'var(--primary-orange)' }}>Why choose us?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.highlights.map((highlight, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--primary-orange)', borderRadius: '50%' }}></div>
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
