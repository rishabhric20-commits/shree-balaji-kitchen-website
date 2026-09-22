import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_MENU } from '../data/tiffinData.js';
import { tiffinService } from '../services/tiffinService.js';
import { Calendar, Utensils, Sparkles, ChevronRight, Info, Heart } from 'lucide-react';

export const WeeklyMenu = ({ onSelectDayTrial }) => {
  const [activeDay, setActiveDay] = useState('Monday');

  const selectedMenu = tiffinService.getMenuForDay(activeDay);

  return (
    <section id="menu" className="py-5 bg-light border-top border-bottom">
      <div className="container py-lg-4">
        
        {/* Section Header */}
        <div className="text-center mx-auto mb-4" style={{ maxWidth: '700px' }}>
          <div className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-2 small fw-semibold">
            <Utensils size={14} className="text-warning" />
            <span>Never Get Bored - Rotated Weekly Menu</span>
          </div>
          <h2 className="display-6 fw-bold font-serif text-dark">
            Our Weekly Sample Menu
          </h2>
          <p className="text-secondary">
            Freshly prepared every day with pure spices, homestyle recipes, ghee rotis, and balanced nutrition.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="d-flex align-items-center justify-content-start justify-content-sm-center gap-2 overflow-auto pb-3 pt-1 no-scrollbar">
          {WEEKLY_MENU.map((item) => {
            const isActive = item.day === activeDay;
            return (
              <button
                key={item.day}
                onClick={() => setActiveDay(item.day)}
                className={`btn btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-2 fw-semibold text-nowrap transition ${
                  isActive
                    ? 'btn-warning text-dark shadow-sm'
                    : 'btn-outline-secondary bg-white text-dark'
                }`}
              >
                <Calendar size={14} className={isActive ? 'text-dark' : 'text-muted'} />
                <span>{item.day}</span>
                {item.day === 'Saturday' && (
                  <span className="badge bg-danger text-white ms-1" style={{ fontSize: '0.65rem' }}>
                    Special
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Card Display */}
        <div className="mx-auto mt-4" style={{ maxWidth: '900px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="card border-0 rounded-4 shadow-sm overflow-hidden"
            >
              {/* Header banner */}
              <div className="p-4 text-white" style={{ background: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)' }}>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge rounded-pill bg-warning text-dark fw-bold">
                        {selectedMenu.day}'s Special Thali
                      </span>
                      <span className="badge rounded-pill bg-success text-white">
                        Fresh Batch
                      </span>
                    </div>
                    <h3 className="font-serif fw-bold text-white mb-1">
                      {selectedMenu.mainCurry} & {selectedMenu.sideCurry}
                    </h3>
                    <p className="text-warning-subtle small mb-0" style={{ maxWidth: '540px' }}>
                      {selectedMenu.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-3 text-center text-sm-end" style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.25)', minWidth: '130px' }}>
                    <div className="small text-warning-subtle text-uppercase fw-semibold">Thali Price</div>
                    <div className="fs-2 font-serif fw-bold text-white lh-1 my-1">₹90</div>
                    <div className="badge bg-warning text-dark">Trial @ ₹80</div>
                  </div>
                </div>
              </div>

              {/* Items & Nutrition */}
              <div className="card-body p-4">
                <div className="row g-4 align-items-center">
                  
                  {/* Included dishes */}
                  <div className="col-md-7">
                    <h5 className="small fw-bold text-uppercase mb-3 d-flex align-items-center gap-1" style={{ color: '#b45309' }}>
                      <Sparkles size={16} />
                      <span>What's Inside {selectedMenu.day}'s Tiffin:</span>
                    </h5>

                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border">
                        <span className="fs-5">🫓</span>
                        <div>
                          <div className="fw-bold small text-dark">Breads / Rotis</div>
                          <div className="text-secondary small">{selectedMenu.rotis}</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border">
                        <span className="fs-5">🥘</span>
                        <div>
                          <div className="fw-bold small text-dark">Main Sabzi / Curry</div>
                          <div className="text-secondary small">{selectedMenu.mainCurry}</div>
                        </div>
                      </div>

                      {selectedMenu.sideCurry && (
                        <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border">
                          <span className="fs-5">🥣</span>
                          <div>
                            <div className="fw-bold small text-dark">Dal / Side Dish</div>
                            <div className="text-secondary small">{selectedMenu.sideCurry}</div>
                          </div>
                        </div>
                      )}

                      <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border">
                        <span className="fs-5">🍚</span>
                        <div>
                          <div className="fw-bold small text-dark">Rice Preparation</div>
                          <div className="text-secondary small">{selectedMenu.rice}</div>
                        </div>
                      </div>

                      {selectedMenu.extras && selectedMenu.extras.length > 0 && (
                        <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border">
                          <span className="fs-5">🥗</span>
                          <div>
                            <div className="fw-bold small text-dark">Sides & Extras</div>
                            <div className="text-secondary small">{selectedMenu.extras.join(' + ')}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nutrition & Order CTA */}
                  <div className="col-md-5">
                    <div className="p-3 rounded-4 bg-light border h-100 d-flex flex-column justify-content-between">
                      <div>
                        <div className="small fw-bold text-secondary text-uppercase mb-2">
                          Nutritional Breakdown (Approx)
                        </div>
                        <div className="row g-2 mb-3">
                          <div className="col-6">
                            <div className="bg-white p-2 rounded-3 border text-center">
                              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Energy</div>
                              <div className="fw-bold text-dark">{selectedMenu.calories} kcal</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-white p-2 rounded-3 border text-center">
                              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Protein</div>
                              <div className="fw-bold text-success">{selectedMenu.protein}</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-2 rounded-3 bg-success-subtle text-success-emphasis small d-flex align-items-start gap-2 border border-success-subtle mb-3">
                          <Heart size={16} className="text-success flex-shrink-0 mt-1" />
                          <span>
                            <strong>Health Guarantee:</strong> Cooked with minimal refined oil, pure spices, and iodized salt.
                          </span>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => onSelectDayTrial(selectedMenu)}
                          className="btn btn-balaji-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                        >
                          <span>Order {selectedMenu.day}'s Trial Box (@ ₹80)</span>
                          <ChevronRight size={16} />
                        </button>
                        <div className="text-center text-muted small mt-2" style={{ fontSize: '0.75rem' }}>
                          Custom Jain (No Onion & Garlic) or Low Oil option available!
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Diet Callout */}
        <div className="mt-4 p-3 rounded-3 bg-warning-subtle border border-warning text-center mx-auto text-dark small d-flex align-items-center justify-content-center gap-2" style={{ maxWidth: '650px' }}>
          <Info size={16} className="text-warning flex-shrink-0" />
          <span>
            Dietary restrictions? We happily prepare <strong>Jain Meals</strong>, <strong>Sugar-Free</strong>, and <strong>Low-Salt</strong> boxes upon request.
          </span>
        </div>

      </div>
    </section>
  );
};
