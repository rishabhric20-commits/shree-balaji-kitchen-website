import React from 'react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/tiffinData.js';
import { Sun, Moon, Calendar, Clock, Briefcase, Users, Sparkles, Utensils, ArrowUpRight } from 'lucide-react';

export const ServicesSection = ({ onOpenTrialModal }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun size={24} className="text-warning" />;
      case 'Moon': return <Moon size={24} className="text-warning" />;
      case 'Calendar': return <Calendar size={24} className="text-warning" />;
      case 'Clock': return <Clock size={24} className="text-warning" />;
      case 'Briefcase': return <Briefcase size={24} className="text-warning" />;
      case 'Users': return <Users size={24} className="text-warning" />;
      case 'Sparkles': return <Sparkles size={24} className="text-warning" />;
      case 'Utensils': default: return <Utensils size={24} className="text-warning" />;
    }
  };

  return (
    <section id="services" className="py-5 bg-dark text-white">
      <div className="container py-lg-4">
        
        {/* Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill small fw-bold text-uppercase mb-2">
            Comprehensive Tiffin & Catering Solutions
          </span>
          <h2 className="display-6 font-serif fw-bold text-white mt-2">
            Services Designed for Every Meal Requirement
          </h2>
          <p className="text-secondary">
            From single daily tiffins for bachelors to festival catering and family meal packs in Lucknow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {SERVICES_LIST.map((service, index) => (
            <div key={index} className="col-sm-6 col-lg-3">
              <div className="card h-100 p-4 rounded-4 border border-secondary-subtle bg-dark text-white shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="rounded-3 p-2 bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
                    {getIcon(service.icon)}
                  </div>

                  <h3 className="h6 font-serif fw-bold text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="small text-secondary mb-4">
                    {service.desc}
                  </p>
                </div>

                <button
                  onClick={onOpenTrialModal}
                  className="btn btn-link text-warning p-0 text-start text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                >
                  <span>Inquire / Order</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate / Bulk Banner */}
        <div className="card border-0 rounded-4 p-4 mt-5 text-white" style={{ background: 'linear-gradient(135deg, #78350f, #9a3412)' }}>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div>
              <h3 className="h5 font-serif fw-bold text-white mb-1">
                Need Corporate Office Tiffins or Small Party Catering?
              </h3>
              <p className="small text-light mb-0" style={{ maxWidth: '600px' }}>
                We cater daily office lunches for companies, banks, and IT parks across Aliganj, Hazratganj & Gomti Nagar at special bulk rates!
              </p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20I%20want%20a%20quote%20for%20office/bulk%20catering`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning text-dark fw-bold text-nowrap rounded-pill px-4 py-2"
            >
              Get Bulk Quote on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
