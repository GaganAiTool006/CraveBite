import React from 'react';
import { FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi';

export default function ManagerReports() {
  const reports = [
    { title: 'Daily Order Settlement & Merchant Payout Report', date: 'Today, 24 Aug 2026', size: '2.4 MB', status: 'Reconciled' },
    { title: 'Rider Shift Distance & Cash-on-Delivery Ledger', date: 'Yesterday, 23 Aug 2026', size: '1.8 MB', status: 'Audited' },
    { title: 'Kitchen SLA Prep Latency & Delay Incident Log', date: '22 Aug 2026', size: '890 KB', status: 'Closed' }
  ];

  return (
    <div className="cb-page animate-fade-in" style={{ padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)' }}>Daily Branch Settlement & Audit Reports</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Generated cash reconciliations, rider earnings statements, and operational logs</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reports.map((r, i) => (
          <div key={i} className="cb-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiFileText size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>{r.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{r.date} • {r.size}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="cb-badge cb-badge-success">{r.status}</span>
              <button className="cb-btn cb-btn-outline cb-btn-sm" onClick={() => alert('Downloading official PDF report...')}>
                <FiDownload size={14} /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
