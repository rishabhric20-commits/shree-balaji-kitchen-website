import React, { useState } from 'react';
import { FAQS, BUSINESS_INFO } from '../data/tiffinData.js';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FaqSection = () => {
  const [openId, setOpenId] = useState('faq-1');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'General', 'Delivery', 'Subscription', 'Food & Diet'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-5 bg-light border-bottom">
      <div className="container py-lg-4" style={{ maxWidth: '800px' }}>
        
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-2 small fw-semibold">
            <HelpCircle size={14} className="text-warning" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="display-6 font-serif fw-bold text-dark mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary small">
            Everything you need to know about our trial meals, subscriptions, delivery policies, and diet customizations.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="d-flex flex-column gap-3 mb-4">
          <div className="input-group shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
            <span className="input-group-text bg-white border-end-0">
              <Search size={16} className="text-muted" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. trial, free delivery, Jain food)..."
              className="form-control border-start-0 small"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1 small fw-semibold ${
                  selectedCategory === cat
                    ? 'btn-warning text-dark shadow-sm'
                    : 'btn-outline-secondary bg-white text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="d-flex flex-column gap-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="card border rounded-3 bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="btn text-start p-3 w-100 d-flex align-items-center justify-content-between gap-3"
                  >
                    <span className="d-flex align-items-center gap-2 font-serif fw-bold text-dark fs-6 mb-0">
                      <span className="badge bg-warning text-dark font-sans fw-bold">Q</span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-muted transition ${isOpen ? 'rotate-180 text-warning' : ''}`}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-3 pt-0 small text-secondary border-top bg-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 small text-muted">
              No matching questions found. Feel free to call us directly at {BUSINESS_INFO.contact.phone}!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
