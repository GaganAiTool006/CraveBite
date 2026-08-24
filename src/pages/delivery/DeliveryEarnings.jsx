import React, { useState } from 'react';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiAward, 
  FiCalendar, 
  FiCreditCard, 
  FiDownloadCloud, 
  FiArrowUpRight,
  FiZap
} from 'react-icons/fi';

export default function DeliveryEarnings() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [payoutRequested, setPayoutRequested] = useState(false);

  const earningsHistory = [
    { date: 'Today (Mon, 24 Aug)', trips: 14, base: 770, incentive: 120, tips: 60, total: 950, status: 'In Wallet' },
    { date: 'Sunday, 23 Aug', trips: 22, base: 1210, incentive: 350, tips: 140, total: 1700, status: 'Processed' },
    { date: 'Saturday, 22 Aug', trips: 24, base: 1320, incentive: 400, tips: 180, total: 1900, status: 'Processed' },
    { date: 'Friday, 21 Aug', trips: 18, base: 990, incentive: 200, tips: 90, total: 1280, status: 'Processed' },
    { date: 'Thursday, 20 Aug', trips: 16, base: 880, incentive: 150, tips: 70, total: 1100, status: 'Processed' },
    { date: 'Wednesday, 19 Aug', trips: 15, base: 825, incentive: 140, tips: 50, total: 1015, status: 'Processed' }
  ];

  const totalWeekEarning = earningsHistory.reduce((sum, item) => sum + item.total, 0);
  const totalWeekTrips = earningsHistory.reduce((sum, item) => sum + item.trips, 0);
  const totalIncentives = earningsHistory.reduce((sum, item) => sum + item.incentive, 0);

  const handleInstantPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => {
      alert('Instant payout request submitted! ₹950 will be credited to HDFC Bank A/C ending in **8912 in 15 minutes.');
    }, 400);
  };

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      
      {/* Header with Title & Instant Cashout */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
            Rider Earnings & Payout Ledger
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Weekly automatic settlements & real-time on-demand instant bank withdrawals
          </p>
        </div>

        <button 
          onClick={handleInstantPayout}
          disabled={payoutRequested}
          className="cb-btn cb-btn-primary"
          style={{
            background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
            border: 'none'
          }}
        >
          <FiZap size={16} fill="white" />
          <span>{payoutRequested ? 'Withdrawal Processing...' : 'Instant Payout (₹950)'}</span>
        </button>
      </div>

      {/* Main KPI Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '28px'
      }}>
        
        {/* Card 1: Total Earnings */}
        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              WEEKLY EARNINGS
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiDollarSign size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: 'var(--text-main)', margin: '4px 0' }}>
            ₹{totalWeekEarning.toLocaleString('en-IN')}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--success)', fontWeight: '700' }}>
            <FiTrendingUp size={14} />
            <span>{totalWeekTrips} Completed Deliveries</span>
          </div>
        </div>

        {/* Card 2: Tier & Incentive Bonus */}
        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SURGE & TARGET BONUS
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiAward size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: 'var(--accent)', margin: '4px 0' }}>
            ₹{totalIncentives.toLocaleString('en-IN')}
          </h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
            Gold Tier • 100% Target Met
          </span>
        </div>

        {/* Card 3: Next Auto Settlement */}
        <div className="cb-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SCHEDULED PAYOUT
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiCreditCard size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: 'var(--primary)', margin: '4px 0' }}>
            Tuesday
          </h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
            Direct Deposit to HDFC (**8912)
          </span>
        </div>

      </div>

      {/* Daily Breakdown Table Section */}
      <div className="cb-card" style={{ padding: '24px', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 2px 0' }}>
              Daily Shift Breakdown
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Transparent breakdown of base delivery payout, incentives, and customer tips
            </p>
          </div>

          <button 
            className="cb-btn cb-btn-outline cb-btn-sm"
            onClick={() => alert('Downloading official weekly earnings statement...')}
          >
            <FiDownloadCloud size={15} /> Download PDF
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          margin: '0 -24px',
          padding: '0 24px'
        }}>
          <table style={{
            width: '100%',
            minWidth: '600px',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13.5px'
          }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Date / Shift</th>
                <th style={{ padding: '12px 14px' }}>Trips</th>
                <th style={{ padding: '12px 14px' }}>Base Fare</th>
                <th style={{ padding: '12px 14px' }}>Incentives</th>
                <th style={{ padding: '12px 14px' }}>Customer Tips</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Total Pay</th>
              </tr>
            </thead>
            <tbody>
              {earningsHistory.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 14px', fontWeight: '800', color: 'var(--text-main)' }}>
                    {row.date}
                  </td>
                  <td style={{ padding: '16px 14px', fontWeight: '700' }}>
                    {row.trips} trips
                  </td>
                  <td style={{ padding: '16px 14px', color: 'var(--text-main)' }}>
                    ₹{row.base}
                  </td>
                  <td style={{ padding: '16px 14px', color: 'var(--accent)', fontWeight: '700' }}>
                    +₹{row.incentive}
                  </td>
                  <td style={{ padding: '16px 14px', color: 'var(--success)', fontWeight: '700' }}>
                    +₹{row.tips}
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <span className={`cb-badge ${row.status === 'In Wallet' ? 'cb-badge-warning' : 'cb-badge-success'}`}>
                      ● {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 14px', fontWeight: '900', textAlign: 'right', color: 'var(--text-main)', fontSize: '15px' }}>
                    ₹{row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
