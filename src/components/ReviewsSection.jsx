import React, { useState } from 'react';
import { CUSTOMER_REVIEWS, BUSINESS_INFO } from '../data/tiffinData.js';
import { Star, MessageSquarePlus, CheckCircle2, Send } from 'lucide-react';

export const ReviewsSection = () => {
  const [reviewsList, setReviewsList] = useState(CUSTOMER_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newArea, setNewArea] = useState('Aliganj');
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const added = {
      id: `rev-${Date.now()}`,
      name: newName,
      role: `Customer (${newArea})`,
      comment: newComment,
      rating: newRating,
      date: 'Just now',
      area: newArea,
      verified: true
    };

    setReviewsList([added, ...reviewsList]);
    setSubmittedMessage(true);
    setNewName('');
    setNewComment('');
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <section id="reviews" className="py-5 bg-white border-bottom">
      <div className="container py-lg-4">
        
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill bg-warning-subtle text-dark border border-warning mb-2 small fw-semibold">
              <Star size={14} className="text-warning" style={{ fill: '#f59e0b' }} />
              <span>4.8 / 5 Rating on Google Reviews</span>
            </div>
            <h2 className="display-6 font-serif fw-bold text-dark mb-1">
              What Our Customers Say
            </h2>
            <p className="text-secondary small mb-0">
              Real feedback from students, bank officers, IT professionals & families in Lucknow.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2 align-self-start align-self-md-auto"
          >
            <MessageSquarePlus size={16} />
            <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Add Review Form */}
        {showForm && (
          <div className="card border rounded-4 p-4 mb-5 bg-light shadow-sm mx-auto" style={{ maxWidth: '650px' }}>
            <h3 className="h5 font-serif fw-bold text-dark mb-1">
              Share Your Experience with Shree Balaji Tiffin
            </h3>
            <p className="small text-muted mb-4">
              Your feedback helps {BUSINESS_INFO.owner} ji and team improve our food and delivery quality!
            </p>

            {submittedMessage ? (
              <div className="alert alert-success d-flex align-items-center gap-2 py-3 rounded-3">
                <CheckCircle2 size={18} className="text-success" />
                <span className="fw-semibold small">Thank you! Your review has been recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label small fw-bold text-uppercase text-secondary">
                    Your Rating
                  </label>
                  <div className="d-flex align-items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="btn btn-link p-1 text-decoration-none"
                      >
                        <Star
                          size={24}
                          className={star <= newRating ? 'text-warning' : 'text-secondary'}
                          style={{ fill: star <= newRating ? '#f59e0b' : 'none' }}
                        />
                      </button>
                    ))}
                    <span className="small fw-bold text-muted ms-2">
                      {newRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Vikas Srivastava"
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-uppercase text-secondary">
                      Your Area in Lucknow
                    </label>
                    <input
                      type="text"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      placeholder="e.g. Aliganj / Indira Nagar"
                      className="form-control"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label small fw-bold text-uppercase text-secondary">
                    Your Review / Comments *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about the taste, hygiene, quantity, and delivery speed..."
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-balaji-primary py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  <Send size={16} />
                  <span>Submit Customer Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="row g-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="col-sm-6 col-lg-3">
              <div className="card h-100 p-4 rounded-4 border bg-light shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < rev.rating ? 'text-warning' : 'text-muted'}
                          style={{ fill: i < rev.rating ? '#f59e0b' : 'none' }}
                        />
                      ))}
                    </div>

                    {rev.verified && (
                      <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    )}
                  </div>

                  <p className="small text-secondary fst-italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-top d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center small" style={{ width: '36px', height: '36px' }}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="h6 font-serif fw-bold text-dark mb-0">{rev.name}</h4>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{rev.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
