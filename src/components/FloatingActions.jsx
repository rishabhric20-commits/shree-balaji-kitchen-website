import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';
import { BUSINESS_INFO } from '../data/tiffinData.js';

export const FloatingActions = ({ onOpenTrialModal }) => {
  return (
    <>
      {/* Floating Sticky Bottom Bar for Mobile Devices */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-white border-top border-warning p-2 d-sm-none shadow-lg d-flex align-items-center justify-content-between gap-2" style={{ zIndex: 1040 }}>
        <a
          href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s+/g, '')}`}
          className="btn btn-light border flex-fill py-2 small fw-bold d-flex align-items-center justify-content-center gap-1 text-dark text-decoration-none"
        >
          <Phone size={14} style={{ color: '#b45309' }} />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20I%20want%20to%20order`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp flex-fill py-2 small fw-bold d-flex align-items-center justify-content-center gap-1"
        >
          <WhatsAppIcon size={14} />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenTrialModal}
          className="btn btn-warning text-dark flex-fill py-2 small fw-bold d-flex align-items-center justify-content-center gap-1"
        >
          <Sparkles size={14} />
          <span>Trial @ ₹80</span>
        </button>
      </div>

      {/* Floating Action Badge for Desktop (Bottom Right) */}
      <div className="d-none d-sm-flex position-fixed bottom-0 end-0 m-4 flex-column align-items-end" style={{ zIndex: 1040 }}>
        <a
          href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20I%20want%20to%20order%20food`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center"
          style={{ width: '56px', height: '56px' }}
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon size={28} />
        </a>
      </div>
    </>
  );
};
