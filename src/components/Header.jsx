import React, { useState } from 'react';
import { Phone, Menu, X, Utensils, Sparkles, Clock, Shield } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';
import { BUSINESS_INFO } from '../data/tiffinData.js';

export const Header = ({ onOpenTrialModal, onOpenPaymentModal, onOpenAdminModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Weekly Menu', href: '#menu' },
    { name: 'Pricing & Plans', href: '#pricing' },
    { name: 'Our Services', href: '#services' },
    { name: 'Delivery Areas', href: '#delivery' },
    { name: 'About Us', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      {/* Top Banner */}
      <div className="py-1 px-3 text-center text-white d-flex align-items-center justify-content-center flex-wrap gap-2" style={{ backgroundColor: '#92400e', fontSize: '0.8125rem' }}>
        <span className="badge rounded-pill d-inline-flex align-items-center gap-1" style={{ backgroundColor: '#78350f', color: '#fef3c7' }}>
          <Clock size={12} /> Kitchen Open
        </span>
        <span className="fw-medium">🔥 Hot Homestyle Lunch & Dinner Delivery in Lucknow</span>
        <span className="d-none d-sm-inline">•</span>
        <span className="badge rounded-pill bg-warning text-dark fw-bold">
          Trial Meal @ ₹80 Only
        </span>
      </div>

      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between">
          
          {/* Logo */}
          <a href="#" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="rounded-3 p-1 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', border: '1px solid #fde68a' }}>
              <Utensils size={24} style={{ color: '#b45309' }} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="font-serif fw-bold text-dark fs-5 mb-0">
                  Shree Balaji
                </span>
                <span className="badge-pure-veg">
                  <span className="rounded-circle bg-success" style={{ width: '6px', height: '6px' }}></span>
                  100% Veg
                </span>
              </div>
              <div className="text-muted small fw-medium">
                Home Tiffin Services • {BUSINESS_INFO.address.area}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="btn btn-sm btn-link text-dark text-decoration-none fw-semibold px-2 py-1"
                style={{ fontSize: '0.875rem' }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Action Buttons */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1"
              title={`Call ${BUSINESS_INFO.owner}`}
            >
              <Phone size={14} className="text-warning" />
              <span>Call Us</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20I%20want%20to%20inquire%20about%20tiffin%20delivery`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenTrialModal}
              className="btn btn-balaji-primary btn-sm d-inline-flex align-items-center gap-1 px-3 py-1"
              style={{ fontSize: '0.875rem' }}
            >
              <Sparkles size={14} />
              <span>Book Trial Meal @ ₹80</span>
            </button>

            <button
              onClick={onOpenAdminModal}
              className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1 px-2 py-1"
              style={{ fontSize: '0.825rem' }}
              title="Admin Portal Login"
            >
              <Shield size={14} className="text-warning" />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="d-lg-none btn btn-light border p-2 rounded-3"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="d-lg-none bg-white border-top p-3 shadow-sm">
          <nav className="d-flex flex-column gap-2 mb-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark text-decoration-none py-1 fw-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="d-flex flex-column gap-2 pt-2 border-top">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="btn btn-balaji-primary w-100 py-2 d-flex align-items-center justify-content-center gap-1"
            >
              <Sparkles size={16} />
              <span>Book Trial Meal for ₹80</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="btn btn-outline-dark w-100 py-1 d-flex align-items-center justify-content-center gap-1"
              style={{ fontSize: '0.875rem' }}
            >
              <Shield size={14} className="text-warning" />
              <span>Admin Portal Login</span>
            </button>

            <div className="d-flex gap-2">
              <a
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-1"
              >
                <Phone size={14} className="text-warning" /> Call
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hi%20Shree%20Balaji%20Tiffin,%20I%20want%20to%20order`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success w-50 d-flex align-items-center justify-content-center gap-1"
              >
                <WhatsAppIcon size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
