import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/tiffinData.js';
import { Phone, Mail, MapPin, Clock, Utensils, QrCode, CheckCircle2, Shield } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';
import { tiffinService } from '../services/tiffinService.js';

export const ContactFooter = ({
  onOpenTrialModal,
  onOpenPaymentModal,
  onOpenAdminModal
}) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    // Save to backend & Supabase
    tiffinService.submitContactInquiry({
      name: formName,
      phone: formPhone,
      message: formMsg
    });

    setSentSuccess(true);
    setTimeout(() => {
      const text = `Hi ${BUSINESS_INFO.owner} ji!%0AFrom Website Contact Form:%0AName: ${formName}%0APhone: ${formPhone}%0AMessage: ${formMsg}`;
      window.open(`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=${text}`, '_blank');
      setFormName('');
      setFormPhone('');
      setFormMsg('');
      setSentSuccess(false);
    }, 1200);
  };

  return (
    <footer id="contact" className="bg-dark text-secondary pt-5 pb-5 border-top border-secondary-subtle">
      <div className="container py-lg-4">
        
        {/* Top Contact Grid */}
        <div className="row g-5 pb-5 border-bottom border-secondary-subtle">
          
          {/* Brand & Address Info */}
          <div className="col-lg-5 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-3 p-2 bg-warning text-dark d-flex align-items-center justify-content-center fw-bold" style={{ width: '44px', height: '44px' }}>
                <Utensils size={22} />
              </div>
              <div>
                <h3 className="font-serif fw-bold h4 text-white mb-0">
                  {BUSINESS_INFO.name}
                </h3>
                <div className="small text-warning">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </div>

            <p className="small text-secondary mb-2">
              Providing fresh, hygienic, and delicious homemade meals for students, working professionals, bachelors, and families in Lucknow since {BUSINESS_INFO.establishedYear}.
            </p>

            <div className="d-flex flex-column gap-2 small text-light">
              <div className="d-flex align-items-start gap-2">
                <MapPin size={16} className="text-warning flex-shrink-0 mt-1" />
                <span>{BUSINESS_INFO.address.full}</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Phone size={16} className="text-warning flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s+/g, '')}`} className="text-light text-decoration-none">
                  {BUSINESS_INFO.contact.phone} ({BUSINESS_INFO.owner})
                </a>
              </div>

              <div className="d-flex align-items-center gap-2">
                <WhatsAppIcon size={16} className="text-success flex-shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success text-decoration-none"
                >
                  WhatsApp: {BUSINESS_INFO.contact.phone}
                </a>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Mail size={16} className="text-warning flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-light text-decoration-none">
                  {BUSINESS_INFO.contact.email}
                </a>
              </div>

              <div className="d-flex align-items-start gap-2 pt-1">
                <Clock size={16} className="text-warning flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white fw-semibold">{BUSINESS_INFO.hours.weekday}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>{BUSINESS_INFO.hours.sunday}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 d-flex gap-2 flex-wrap">
              <button
                onClick={onOpenPaymentModal}
                className="btn btn-sm btn-outline-warning rounded-pill d-flex align-items-center gap-2 px-3 py-1"
              >
                <QrCode size={16} />
                <span>Payment QR Code</span>
              </button>

              <button
                onClick={onOpenTrialModal}
                className="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3 py-1"
              >
                Book ₹80 Trial
              </button>
            </div>

          </div>

          {/* Quick Message Form */}
          <div className="col-lg-7">
            <div className="card p-4 rounded-4 bg-black border border-secondary-subtle shadow-sm">
              <h4 className="font-serif fw-bold h5 text-white mb-1">
                Send a Message or Inquiry
              </h4>
              <p className="small text-secondary mb-4">
                Have questions regarding custom diet meals, family packs, or trial orders? Fill out this form for instant response.
              </p>

              {sentSuccess ? (
                <div className="alert alert-success d-flex align-items-center gap-2 rounded-3">
                  <CheckCircle2 size={18} className="text-success" />
                  <span className="small fw-semibold">Connecting to WhatsApp with {BUSINESS_INFO.owner}...</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label small text-secondary fw-bold text-uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Ankit Trivedi"
                        className="form-control bg-dark text-white border-secondary"
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small text-secondary fw-bold text-uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 70077 67076"
                        className="form-control bg-dark text-white border-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label small text-secondary fw-bold text-uppercase">
                      Your Message / Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="e.g. I need lunch delivery in Jankipuram for 2 months..."
                      className="form-control bg-dark text-white border-secondary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-whatsapp py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                  >
                    <WhatsAppIcon size={18} />
                    <span>Send Inquiry via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 small text-secondary">
          <p className="mb-0">
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <a href="#menu" className="text-secondary text-decoration-none">Menu</a>
            <a href="#pricing" className="text-secondary text-decoration-none">Pricing</a>
            <a href="#delivery" className="text-secondary text-decoration-none">Delivery Areas</a>
            <a href="#faq" className="text-secondary text-decoration-none">FAQ</a>
            <button
              onClick={onOpenAdminModal}
              className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1 px-2 py-0 text-light"
            >
              <Shield size={12} className="text-warning" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
