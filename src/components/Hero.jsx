import React from 'react';
import { Sparkles, Star, ShieldCheck, ArrowRight, CheckCircle2, Phone, MapPin, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/tiffinData.js';

export const Hero = ({ onOpenTrialModal }) => {
  return (
    <section className="bg-warm-hero py-5 border-bottom">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          
          {/* Left Text Column */}
          <div className="col-lg-7 text-center text-lg-start">
            
            {/* Top Badges */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-3">
              <Sparkles size={16} className="text-warning" />
              <span className="fw-semibold small">Lucknow's Trusted Homestyle Tiffin Since 2021</span>
            </div>

            {/* Main Headline */}
            <h1 className="display-5 fw-bold text-dark font-serif mb-3">
              Ghar Ka Khana,<br className="d-none d-sm-inline" />
              <span style={{ color: '#d97706' }}> Fresh & Hygienic</span> Daily
            </h1>

            {/* Subtitle */}
            <p className="lead text-secondary mb-4">
              Wholesome, 100% pure vegetarian lunch and dinner cooked with traditional Indian recipes by <strong className="text-dark">{BUSINESS_INFO.owner}</strong>. Delivered piping hot to students, office goers, and families across Aliganj & Lucknow.
            </p>

            {/* Feature Checklist */}
            <div className="row g-2 mb-4 text-start justify-content-center justify-content-lg-start">
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>100% Pure Veg</span>
              </div>
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>Zero Preservatives</span>
              </div>
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>Free Delivery (&lt;5 km)</span>
              </div>
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>Leak-Proof Tiffins</span>
              </div>
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>Pause Anytime</span>
              </div>
              <div className="col-6 col-md-4 d-flex align-items-center gap-2 small fw-semibold text-secondary">
                <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                <span>Jain Meal Available</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3 mb-3">
              <button
                onClick={onOpenTrialModal}
                className="btn btn-balaji-primary px-4 py-3 d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto shadow"
              >
                <span className="fw-bold">Book Trial Meal @ ₹80</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#menu"
                className="btn btn-balaji-outline px-4 py-3 w-100 w-sm-auto text-center"
              >
                View Weekly Menu
              </a>

              <a
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="btn btn-light border p-3 rounded-circle d-none d-sm-inline-flex align-items-center justify-content-center"
                title={`Call ${BUSINESS_INFO.owner}`}
                style={{ width: '48px', height: '48px' }}
              >
                <Phone size={18} className="text-warning" />
              </a>
            </div>

            {/* Location Notice */}
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-1 text-muted small mb-4">
              <MapPin size={14} className="text-warning" />
              <span>Based in Shanti Nagar, Aliganj • Serving Lucknow</span>
            </div>

            {/* Stats Bar */}
            <div className="row g-3 pt-3 border-top text-center text-lg-start">
              <div className="col-4">
                <div className="h3 fw-bold font-serif text-dark mb-0" style={{ color: '#b45309' }}>
                  {BUSINESS_INFO.stats.happyCustomers}
                </div>
                <div className="small text-muted">Happy Foodies</div>
              </div>
              <div className="col-4">
                <div className="h3 fw-bold font-serif text-dark mb-0" style={{ color: '#b45309' }}>
                  {BUSINESS_INFO.stats.mealsDelivered}
                </div>
                <div className="small text-muted">Meals Delivered</div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-1">
                  <Star size={18} className="text-warning fill-warning" style={{ fill: '#f59e0b' }} />
                  <span className="h3 fw-bold font-serif text-dark mb-0">4.8</span>
                </div>
                <div className="small text-muted">Google Rating (420+)</div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div className="col-lg-5">
            <div className="position-relative mx-auto" style={{ maxWidth: '450px' }}>
              
              {/* Main Food Photo Frame */}
              <div className="card border-0 rounded-4 overflow-hidden shadow-lg">
                <img
                  src={BUSINESS_INFO.images.hero}
                  alt="Shree Balaji Special Veg Thali Meal"
                  className="card-img"
                  style={{ height: '360px', objectFit: 'cover' }}
                />
                
                {/* Photo Caption Overlay */}
                <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="badge bg-warning text-dark fw-bold mb-1">
                        Daily Special Thali
                      </span>
                      <h4 className="font-serif fw-bold text-white mb-0 fs-6">
                        4 Roti • Dal Tadka • Paneer • Rice
                      </h4>
                    </div>
                    <span className="fs-3 fw-bold text-warning font-serif">₹90</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Tiffin Box */}
              <div className="position-absolute d-none d-sm-flex align-items-center gap-2 p-2 bg-white rounded-3 shadow border" style={{ bottom: '-20px', left: '-20px', maxWidth: '240px' }}>
                <img
                  src={BUSINESS_INFO.images.tiffinBox}
                  alt="Stainless Steel Tiffin"
                  className="rounded-2"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                <div>
                  <div className="small fw-bold text-dark d-flex align-items-center gap-1">
                    <ShieldCheck size={14} className="text-success" /> Hot & Fresh
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                    Stainless steel leak-proof tiffins
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 - Pure Veg */}
              <div className="position-absolute p-2 bg-success text-white rounded-3 shadow" style={{ top: '-15px', right: '-15px' }}>
                <div className="d-flex align-items-center gap-1">
                  <Award size={18} className="text-white" />
                  <div className="text-start">
                    <div className="small fw-bold lh-1">100% Pure Veg</div>
                    <span style={{ fontSize: '0.65rem' }}>No Non-Veg Kitchen</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
