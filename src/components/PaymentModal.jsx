import React from 'react';
import { X, QrCode, Smartphone, Wallet, Banknote, Landmark, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/tiffinData.js';

export const PaymentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
        <div className="modal-content rounded-4 border-0 overflow-hidden shadow-lg">
          
          {/* Header */}
          <div className="modal-header bg-dark text-white border-0 py-3 px-4">
            <div>
              <span className="badge bg-warning text-dark fw-bold mb-1">
                Secure Payments
              </span>
              <h5 className="modal-title font-serif fw-bold text-white fs-6">
                Payment Methods & QR Code
              </h5>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-light rounded-circle p-1"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            
            {/* UPI QR Code Block */}
            <div className="card border rounded-4 p-4 text-center mb-4 bg-light shadow-sm">
              <h6 className="font-serif fw-bold text-dark mb-3">
                Scan & Pay via any UPI App (GPay / PhonePe / Paytm / BHIM)
              </h6>

              <div className="bg-white p-3 rounded-3 shadow-sm border mx-auto mb-3 d-flex flex-column align-items-center justify-content-center" style={{ width: '160px', height: '160px' }}>
                <QrCode size={110} className="text-dark" />
                <span className="badge bg-warning text-dark mt-1" style={{ fontSize: '0.65rem' }}>
                  SHREE BALAJI TIFFIN
                </span>
              </div>

              <div className="small text-secondary">
                <div>Merchant: <strong>Shree Balaji Tiffin Services</strong></div>
                <div>UPI ID: <code className="bg-white px-2 py-1 rounded border text-danger fw-bold">7007767076@okbizaxis</code></div>
              </div>
            </div>

            {/* List of Payment Options */}
            <div className="d-flex flex-column gap-2 mb-4">
              <h6 className="small fw-bold text-uppercase text-secondary mb-1">
                Supported Payment Modes
              </h6>

              <div className="p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <Smartphone size={22} className="text-success" />
                  <div>
                    <strong className="small text-dark d-block">Google Pay & PhonePe</strong>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{BUSINESS_INFO.contact.phone}</span>
                  </div>
                </div>
                <span className="badge bg-success-subtle text-success border border-success-subtle">Instant</span>
              </div>

              <div className="p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <Wallet size={22} className="text-primary" />
                  <div>
                    <strong className="small text-dark d-block">Paytm Wallet & UPI</strong>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{BUSINESS_INFO.contact.phone}</span>
                  </div>
                </div>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle">Instant</span>
              </div>

              <div className="p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <Banknote size={22} className="text-warning" />
                  <div>
                    <strong className="small text-dark d-block">Cash on Delivery</strong>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>Pay directly to delivery executive</span>
                  </div>
                </div>
                <span className="badge bg-warning-subtle text-warning border border-warning-subtle">Available</span>
              </div>

              <div className="p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <Landmark size={22} className="text-purple text-info" />
                  <div>
                    <strong className="small text-dark d-block">Bank Transfer (IMPS / NEFT)</strong>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>Account details on monthly invoice</span>
                  </div>
                </div>
                <span className="badge bg-info-subtle text-info border border-info-subtle">Monthly</span>
              </div>
            </div>

            <div className="p-3 rounded-3 bg-light border text-center small text-secondary d-flex align-items-center justify-content-center gap-2">
              <ShieldCheck size={18} className="text-success flex-shrink-0" />
              <span>After payment, send screenshot on WhatsApp ({BUSINESS_INFO.contact.phone}) for instant receipt.</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
