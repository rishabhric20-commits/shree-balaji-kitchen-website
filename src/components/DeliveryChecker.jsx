import React, { useState } from 'react';
import { DELIVERY_AREAS, BUSINESS_INFO } from '../data/tiffinData.js';
import { MapPin, Search, Clock, Truck, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export const DeliveryChecker = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = DELIVERY_AREAS.filter(
    (area) =>
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.pincode.includes(searchQuery)
  );

  return (
    <section id="delivery" className="py-5 bg-white border-bottom">
      <div className="container py-lg-4">
        
        <div className="text-center mx-auto mb-4" style={{ maxWidth: '700px' }}>
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill small fw-bold text-uppercase mb-2">
            Punctual & Fast Meal Delivery
          </span>
          <h2 className="display-6 font-serif fw-bold text-dark mt-2">
            Coverage & Delivery Areas in Lucknow
          </h2>
          <p className="text-secondary">
            Our kitchen is located at <strong>Shanti Nagar, Aliganj</strong>. We offer <strong>FREE Delivery within 5 km</strong>!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-4" style={{ maxWidth: '540px' }}>
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-light border-end-0">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your area or pincode (e.g. Aliganj, 226024)..."
              className="form-control border-start-0 fs-6"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-light border text-muted small"
                type="button"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Areas Cards Grid */}
        <div className="row g-3">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area) => (
              <div key={area.name} className="col-sm-6 col-lg-3">
                <div className="card h-100 p-3 rounded-3 border bg-light shadow-sm">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-2 p-1 bg-warning text-dark d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <MapPin size={16} />
                      </div>
                      <div>
                        <h4 className="h6 font-serif fw-bold text-dark mb-0">{area.name}</h4>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{area.pincode}</span>
                      </div>
                    </div>

                    <span className={`badge ${area.isFreeDelivery ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {area.isFreeDelivery ? 'FREE Delivery' : 'Standard'}
                    </span>
                  </div>

                  <div className="pt-2 border-top small text-secondary d-flex flex-column gap-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <Truck size={14} /> Distance:
                      </span>
                      <strong className="text-dark">{area.distanceKm} km</strong>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <Clock size={14} /> Est. Time:
                      </span>
                      <strong className="text-dark">{area.estimatedMinutes} mins</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4 bg-light rounded-4 border p-4">
              <AlertCircle size={32} className="text-warning mb-2" />
              <h4 className="h6 fw-bold text-dark">Don't see your locality listed?</h4>
              <p className="small text-secondary mb-3">
                We deliver to most parts of Lucknow! Send your address on WhatsApp for instant confirmation.
              </p>
              <a
                href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20is%20delivery%20available%20for%20my%20area:%20${encodeURIComponent(searchQuery)}?`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm px-3"
              >
                <WhatsAppIcon size={16} />
                <span>Check My Area on WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Timings Callout */}
        <div className="card border-0 rounded-4 p-3 mt-4 text-white bg-dark">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-3 p-2 bg-warning text-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Clock size={20} />
              </div>
              <div>
                <h5 className="font-serif fw-bold text-white mb-0 fs-6">Daily Meal Dispatch Schedule</h5>
                <div className="small text-light">
                  <strong>Lunch:</strong> 11:30 AM – 2:00 PM • <strong>Dinner:</strong> 7:30 PM – 9:30 PM
                </div>
              </div>
            </div>

            <span className="badge bg-secondary text-warning px-3 py-2 text-nowrap">
              Hot Meals On-Time Guarantee
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
