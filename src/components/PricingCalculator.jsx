import React, { useState } from 'react';
import { PRICING_PLANS, DELIVERY_AREAS, BUSINESS_INFO } from '../data/tiffinData.js';
import { Check, Sliders, Tag } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';
import { saveInquiryToSupabase } from '../lib/supabase.js';

export const PricingCalculator = ({ onOpenTrialModal, onOpenPaymentModal }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('lunch-dinner-combo');
  const [dietType, setDietType] = useState('Standard');
  const [extraRotis, setExtraRotis] = useState(0);
  const [selectedArea, setSelectedArea] = useState('Aliganj');

  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[3];
  const areaObj = DELIVERY_AREAS.find((a) => a.name === selectedArea) || DELIVERY_AREAS[0];

  // Price calculations
  const basePrice = selectedPlan.price;
  const rotiAddon = selectedPlan.period === 'month' ? extraRotis * 300 : extraRotis * 10;
  const deliveryFee = areaObj.isFreeDelivery ? 0 : selectedPlan.period === 'month' ? 300 : 20;
  const totalPrice = basePrice + rotiAddon + deliveryFee;

  const handleWhatsAppSubscribe = () => {
    saveInquiryToSupabase({
      name: 'Website Visitor',
      phone: 'Pending via WhatsApp',
      type: 'Subscription Plan Request',
      details: {
        plan: selectedPlan.name,
        period: selectedPlan.period,
        dietType,
        extraRotis,
        deliveryArea: selectedArea,
        totalPrice
      }
    });

    const text = `Hi ${BUSINESS_INFO.owner} ji! I want to subscribe to *${selectedPlan.name}* at Shree Balaji Tiffin Services.%0A%0A*Details:*%0A- Plan: ${selectedPlan.name} (₹${selectedPlan.price})%0A- Diet Preference: ${dietType}%0A- Extra Rotis: ${extraRotis > 0 ? `+${extraRotis} rotis` : 'None'}%0A- Delivery Area: ${selectedArea} (${areaObj.isFreeDelivery ? 'Free Delivery' : 'Distance Delivery'})%0A- Calculated Total: ₹${totalPrice}%0A%0APlease confirm starting date and payment details!`;
    window.open(`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-5 bg-white">
      <div className="container py-lg-4">
        
        {/* Section Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <div className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-2 small fw-semibold">
            <Tag size={14} className="text-warning" />
            <span>Transparent & Honest Pricing • No Hidden Costs</span>
          </div>
          <h2 className="display-6 fw-bold font-serif text-dark">
            Flexible Tiffin Plans & Subscriptions
          </h2>
          <p className="text-secondary">
            Choose a plan that fits your routine. Trial meal available for just ₹80!
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="row g-4 mb-5 justify-content-center">
          {PRICING_PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <div key={plan.id} className="col-md-6 col-lg-4">
                <div
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`card h-100 rounded-4 p-4 transition shadow-sm border ${
                    plan.popular
                      ? 'bg-dark text-white border-warning'
                      : isSelected
                      ? 'border-warning shadow'
                      : 'border-light-subtle bg-white text-dark'
                  }`}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {plan.savingsBadge && (
                    <span className="position-absolute top-0 end-0 translate-middle-y me-4 badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm">
                      {plan.savingsBadge}
                    </span>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className={`small fw-bold text-uppercase ${plan.popular ? 'text-warning' : 'text-primary'}`}>
                      {plan.period === 'month' ? 'Monthly Plan' : plan.period === 'day' ? 'Daily Family Pack' : 'One-Time Meal'}
                    </span>
                    {isSelected && (
                      <span className="badge bg-warning text-dark">Selected</span>
                    )}
                  </div>

                  <h3 className="h5 font-serif fw-bold mb-2">{plan.name}</h3>
                  <p className={`small mb-4 ${plan.popular ? 'text-secondary-subtle' : 'text-secondary'}`}>
                    {plan.description}
                  </p>

                  <div className="d-flex align-items-baseline gap-1 mb-4 pb-3 border-bottom border-secondary-subtle">
                    <span className="display-6 font-serif fw-bold">₹{plan.price.toLocaleString('en-IN')}</span>
                    <span className="small text-muted">/{plan.period}</span>
                  </div>

                  <ul className="list-unstyled d-flex flex-column gap-2 mb-4 small flex-grow-1">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <Check size={16} className={`flex-shrink-0 mt-1 ${plan.popular ? 'text-warning' : 'text-success'}`} />
                        <span className={plan.popular ? 'text-light' : 'text-dark'}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                    }}
                    className={`btn w-100 rounded-pill fw-bold py-2 ${
                      plan.popular
                        ? 'btn-warning text-dark'
                        : isSelected
                        ? 'btn-balaji-primary'
                        : 'btn-outline-dark'
                    }`}
                  >
                    {isSelected ? 'Selected Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customization & Price Calculator Box */}
        <div className="card border rounded-4 p-4 p-md-5 mx-auto bg-light shadow-sm" style={{ maxWidth: '900px' }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="rounded-3 p-2 d-flex align-items-center justify-content-center text-white bg-warning" style={{ width: '40px', height: '40px' }}>
              <Sliders size={20} className="text-dark" />
            </div>
            <div>
              <h3 className="h5 font-serif fw-bold mb-0 text-dark">
                Custom Subscription Calculator
              </h3>
              <div className="small text-muted">
                Personalize your diet preferences and delivery location to calculate final cost.
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Options Panel */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-bold text-uppercase text-secondary">
                  1. Selected Meal Plan
                </label>
                <select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="form-select fw-semibold"
                >
                  {PRICING_PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price}/{p.period}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label small fw-bold text-uppercase text-secondary">
                  2. Diet & Cooking Preference
                </label>
                <div className="row g-2">
                  {['Standard', 'Less Oil & Spice', 'Jain (No Onion/Garlic)', 'High Protein'].map((d) => (
                    <div key={d} className="col-6">
                      <button
                        type="button"
                        onClick={() => setDietType(d)}
                        className={`btn btn-sm w-100 py-2 rounded-3 text-start small fw-semibold ${
                          dietType === d
                            ? 'btn-warning text-dark border-warning'
                            : 'btn-outline-secondary bg-white text-dark'
                        }`}
                      >
                        {d}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label small fw-bold text-uppercase text-secondary">
                  3. Extra Rotis Needed?
                </label>
                <div className="d-flex gap-2">
                  {[0, 2, 4].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setExtraRotis(cnt)}
                      className={`btn btn-sm flex-fill py-2 rounded-3 small fw-bold ${
                        extraRotis === cnt
                          ? 'btn-dark text-white'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                    >
                      {cnt === 0 ? 'Standard 4' : `+${cnt} Extra`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label small fw-bold text-uppercase text-secondary">
                  4. Select Delivery Area in Lucknow
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="form-select fw-semibold"
                >
                  {DELIVERY_AREAS.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name} ({a.pincode}) — {a.isFreeDelivery ? 'FREE Delivery (<5 km)' : 'Distance Delivery'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Summary & Action */}
            <div className="col-md-6">
              <div className="card h-100 p-4 rounded-3 border bg-white shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center pb-2 border-bottom mb-3">
                    <span className="fw-bold small text-dark">Price Summary</span>
                    <span className={`badge ${areaObj.isFreeDelivery ? 'bg-success' : 'bg-secondary'}`}>
                      {areaObj.isFreeDelivery ? 'FREE Delivery' : 'Nominal Fee'}
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-2 small text-secondary mb-4">
                    <div className="d-flex justify-content-between">
                      <span>Base Plan ({selectedPlan.name}):</span>
                      <strong className="text-dark">₹{basePrice.toLocaleString('en-IN')}</strong>
                    </div>

                    {extraRotis > 0 && (
                      <div className="d-flex justify-content-between">
                        <span>Extra Rotis (+{extraRotis}):</span>
                        <strong className="text-dark">+₹{rotiAddon}</strong>
                      </div>
                    )}

                    <div className="d-flex justify-content-between">
                      <span>Delivery Fee ({selectedArea}):</span>
                      <strong className={areaObj.isFreeDelivery ? 'text-success' : 'text-dark'}>
                        {areaObj.isFreeDelivery ? '₹0 (FREE)' : `+₹${deliveryFee}`}
                      </strong>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Cooking Style:</span>
                      <strong className="text-dark">{dietType}</strong>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-baseline pt-3 border-top mb-4">
                    <div>
                      <div className="small fw-bold text-uppercase text-secondary">Total Amount</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Includes all taxes & delivery</div>
                    </div>
                    <div className="fs-3 fw-bold font-serif" style={{ color: '#b45309' }}>
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={handleWhatsAppSubscribe}
                    className="btn btn-whatsapp w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <WhatsAppIcon size={18} />
                    <span>Subscribe via WhatsApp Now</span>
                  </button>

                  <button
                    onClick={onOpenTrialModal}
                    className="btn btn-sm btn-outline-secondary w-100 py-2"
                  >
                    Test with 1-Day Trial Meal @ ₹80
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
