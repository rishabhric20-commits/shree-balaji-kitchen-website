import React from 'react';
import { FEATURES } from '../data/tiffinData.js';
import { HeartHandshake, Leaf, ShieldCheck, Truck, Tag, Sliders } from 'lucide-react';

export const FeaturesSection = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake size={24} style={{ color: '#b45309' }} />;
      case 'Leaf': return <Leaf size={24} className="text-success" />;
      case 'ShieldCheck': return <ShieldCheck size={24} style={{ color: '#b45309' }} />;
      case 'Truck': return <Truck size={24} style={{ color: '#b45309' }} />;
      case 'Tag': return <Tag size={24} style={{ color: '#b45309' }} />;
      case 'Sliders': default: return <Sliders size={24} style={{ color: '#b45309' }} />;
    }
  };

  return (
    <section className="py-5 bg-warning-subtle border-bottom">
      <div className="container py-lg-4">
        
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <span className="badge-pure-veg mb-2">
            Why Choose Shree Balaji Tiffin
          </span>
          <h2 className="display-6 font-serif fw-bold text-dark mt-2">
            The Goodness of Home, Standard of Hygiene
          </h2>
          <p className="text-secondary">
            We understand how crucial healthy food is when you live away from home. Here is why over 1,500+ residents in Lucknow trust us daily.
          </p>
        </div>

        <div className="row g-4">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="col-sm-6 col-lg-4">
              <div className="card h-100 p-4 rounded-4 border bg-white shadow-sm">
                <div className="rounded-3 p-2 d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', border: '1px solid #fde68a' }}>
                  {getIcon(feat.icon)}
                </div>

                <h3 className="h5 font-serif fw-bold text-dark mb-2">
                  {feat.title}
                </h3>

                <p className="small text-secondary mb-0">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
