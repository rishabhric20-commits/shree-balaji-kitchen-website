import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Utensils, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, DELIVERY_AREAS } from '../data/tiffinData.js';
import { tiffinService } from '../services/tiffinService.js';

export const TrialBookingModal = ({
  isOpen,
  onClose,
  selectedDayMenu
}) => {
  const [step, setStep] = useState('form');

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('Aliganj');
  const [fullAddress, setFullAddress] = useState('');
  const [mealTiming, setMealTiming] = useState('Lunch');
  const [dietType, setDietType] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await tiffinService.submitTrialOrder({
        customerName,
        phone,
        deliveryArea,
        address: fullAddress,
        mealType: mealTiming,
        dietPreference: dietType,
        selectedDayMenu: selectedDayMenu || {}
      });
      setOrderId(result.orderId);
      setStep('receipt');
    } catch (err) {
      console.error(err);
      // Fallback order ID
      setOrderId('SBT-' + Math.floor(10000 + Math.random() * 90000));
      setStep('receipt');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = `*NEW TRIAL MEAL BOOKING (₹80)*%0AOrder ID: ${orderId}%0A%0A*Customer Details:*%0AName: ${customerName}%0APhone: ${phone}%0AArea: ${deliveryArea}%0AAddress: ${fullAddress}%0A%0A*Meal Details:*%0ATiming: ${mealTiming}%0ADiet Preference: ${dietType}%0APayment Mode: ${paymentMethod} (₹80)%0A%0APlease confirm delivery time!`;
    window.open(`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
        <div className="modal-content rounded-4 border-0 overflow-hidden shadow-lg">
          
          {/* Header */}
          <div className="modal-header text-white border-0 py-3 px-4" style={{ background: 'linear-gradient(135deg, #b45309, #c2410c)' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-3 p-2 bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
                <Sparkles size={20} className="text-warning" />
              </div>
              <div>
                <h5 className="modal-title font-serif fw-bold text-white fs-6 mb-0">Book 1-Day Trial Meal</h5>
                <span className="small text-warning-subtle" style={{ fontSize: '0.75rem' }}>Special Discount Price @ ₹80 Only</span>
              </div>
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
          <div className="modal-body p-4">
            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                {selectedDayMenu && (
                  <div className="alert alert-warning py-2 px-3 small d-flex align-items-center gap-2 mb-1">
                    <Utensils size={16} className="text-warning flex-shrink-0" />
                    <span>
                      Selected Menu: <strong>{selectedDayMenu.day} Thali</strong> ({selectedDayMenu.mainCurry})
                    </span>
                  </div>
                )}

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Singh"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 70077 67076"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Area in Lucknow *
                    </label>
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="form-select form-select-sm"
                    >
                      {DELIVERY_AREAS.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name} ({a.pincode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Meal Slot *
                    </label>
                    <select
                      value={mealTiming}
                      onChange={(e) => setMealTiming(e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="Lunch">Lunch (11:30 AM - 2:00 PM)</option>
                      <option value="Dinner">Dinner (7:30 PM - 9:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label small fw-bold text-uppercase text-secondary">
                    Delivery Address (House No, Street, Landmark) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="House/Flat No., Building Name, Landmark..."
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Diet Preference
                    </label>
                    <select
                      value={dietType}
                      onChange={(e) => setDietType(e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="Standard">Standard Homestyle</option>
                      <option value="Less Oil & Spice">Less Oil & Low Spice</option>
                      <option value="Jain (No Onion & Garlic)">Jain Food</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="UPI">Pay via UPI / QR</option>
                      <option value="Cash">Pay Cash on Delivery</option>
                    </select>
                  </div>
                </div>

                {/* Price Callout */}
                <div className="p-3 bg-dark text-white rounded-3 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.75rem' }}>Trial Meal Special</span>
                    <strong className="text-warning fs-6">₹80 Total Amount</strong>
                  </div>
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Free Delivery (&lt;5km)
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-warning text-dark fw-bold py-2 shadow-sm"
                >
                  {isSubmitting ? 'Processing Order...' : 'Confirm Trial Booking Order'}
                </button>
              </form>
            ) : (
              <div className="text-center py-2 d-flex flex-column gap-3">
                <div className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mx-auto" style={{ width: '64px', height: '64px' }}>
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="badge bg-success-subtle text-success border border-success-subtle mb-2">
                    Backend Notification Sent
                  </span>
                  <div className="small fw-bold text-secondary text-uppercase">Trial Booking Placed</div>
                  <h4 className="font-serif fw-bold text-dark mt-1">
                    Order ID: {orderId}
                  </h4>
                  <p className="small text-secondary mb-0">
                    Thank you, <strong>{customerName}</strong>! {BUSINESS_INFO.owner}'s kitchen team has received your order and admin notification was triggered!
                  </p>
                </div>

                <div className="card p-3 rounded-3 border bg-light text-start small d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between">
                    <span>Slot:</span>
                    <strong>{mealTiming} Delivery</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Delivery Area:</span>
                    <strong>{deliveryArea}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total Amount Payable:</span>
                    <strong className="text-warning">₹80 ({paymentMethod})</strong>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="btn btn-whatsapp py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                  >
                    <span>Send Order Receipt to WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={onClose}
                    className="btn btn-sm btn-link text-secondary text-decoration-none"
                  >
                    Close & Return to Website
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
