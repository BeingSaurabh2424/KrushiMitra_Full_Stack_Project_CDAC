import React from 'react';
import './AboutUs.css';
import { Truck, Leaf, ShieldCheck, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="about-us-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">About Us</h2>
        <p className="lead text-muted text-center mb-5">
          Welcome to <strong>KrishiMitra Basket</strong> — a modern online grocery platform built to bring convenience, freshness, and trust to your doorstep.
        </p>

        <div className="row text-center mb-5">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="info-card">
              <Truck size={32} />
              <h5 className="mt-3">Fast Delivery</h5>
              <p className="text-muted">Same-day delivery on all fresh groceries and essentials.</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="info-card">
              <Leaf size={32} />
              <h5 className="mt-3">Fresh Products</h5>
              <p className="text-muted">Straight from farms and certified vendors across the country.</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="info-card">
              <ShieldCheck size={32} />
              <h5 className="mt-3">Secure Payments</h5>
              <p className="text-muted">Multiple safe payment options for your peace of mind.</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="info-card">
              <Users size={32} />
              <h5 className="mt-3">Customer First</h5>
              <p className="text-muted">We prioritize customer satisfaction above all else.</p>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://source.unsplash.com/600x400/?groceries,market"
              alt="KrishiMitra Basket"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h4 className="fw-bold mb-3">Why Choose KrishiMitra Basket?</h4>
            <ul className="list-unstyled text-muted fs-5 lh-lg">
              <li>✓ Wide range of grocery, dairy, organic, and home essentials.</li>
              <li>✓ Partnered with over 500+ local farmers and brands.</li>
              <li>✓ Real-time inventory & location-based delivery system.</li>
              <li>✓ Easy returns and 24/7 customer support.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;