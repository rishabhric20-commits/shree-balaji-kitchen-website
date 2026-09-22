import React from 'react';
import { BUSINESS_INFO } from '../data/tiffinData.js';
import { Heart, MapPin } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-5 bg-light border-bottom">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          
          {/* Left Visual Column */}
          <div className="col-lg-5">
            <div className="position-relative mx-auto" style={{ maxWidth: '420px' }}>
              <div className="card border-0 rounded-4 overflow-hidden shadow">
                <img
                  src={BUSINESS_INFO.images.specialThali}
                  alt="Shree Balaji Kitchen Special Thali"
                  className="card-img"
                  style={{ height: '360px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                  <span className="badge bg-warning text-dark fw-bold mb-1">
                    5+ Years of Excellence
                  </span>
                  <h3 className="h5 font-serif fw-bold text-white mb-0">
                    {BUSINESS_INFO.owner} & Team
                  </h3>
                  <div className="small text-warning-subtle">
                    Shanti Nagar, Aliganj, Lucknow
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="position-absolute d-none d-sm-flex align-items-center gap-2 p-2 bg-white rounded-3 shadow border" style={{ bottom: '-15px', right: '-15px' }}>
                <div className="rounded-2 bg-warning text-dark fw-bold font-serif fs-5 p-2 text-center" style={{ width: '42px', height: '42px' }}>
                  5+
                </div>
                <div>
                  <div className="small fw-bold text-dark">Years Serving Lucknow</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>75,000+ Hot Meals Delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="col-lg-7">
            <div className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-3 small fw-semibold">
              <Heart size={14} className="text-danger" />
              <span>Homestyle Passion & Pure Hygiene</span>
            </div>

            <h2 className="display-6 font-serif fw-bold text-dark mb-3">
              About Shree Balaji Home Tiffin Services
            </h2>

            <p className="lead text-secondary fs-6 mb-3">
              Founded in <strong>2021</strong> by <strong>{BUSINESS_INFO.owner}</strong>, Shree Balaji Home Tiffin Services was born with a simple mission: to ensure that students, bachelors, working professionals, and families in Lucknow never miss the warmth and health benefits of home-cooked food.
            </p>

            <p className="text-secondary small mb-4">
              We prepare every meal with fresh farm-bought vegetables, pure spices, cold-pressed oils, and traditional North Indian recipes. Our kitchen adheres to high standards of cleanliness, featuring stainless steel preparation counters and 100% leak-proof tiffin containers.
            </p>

            {/* Quick Facts List */}
            <div className="row g-2 mb-4">
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 border shadow-sm">
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Owner / Master Chef</div>
                  <div className="fw-bold text-dark">{BUSINESS_INFO.owner}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 border shadow-sm">
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Kitchen Location</div>
                  <div className="fw-bold text-dark">Aliganj, Lucknow</div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 border shadow-sm">
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Diet Category</div>
                  <div className="fw-bold text-success">100% Pure Vegetarian</div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 border shadow-sm">
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Working Hours</div>
                  <div className="fw-bold text-dark">7:00 AM – 10:00 PM</div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-3 rounded-3 bg-warning-subtle border border-warning d-flex align-items-start gap-2">
              <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
              <div className="small text-dark">
                <strong>Official Kitchen Address: </strong>
                <span>{BUSINESS_INFO.address.full}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
