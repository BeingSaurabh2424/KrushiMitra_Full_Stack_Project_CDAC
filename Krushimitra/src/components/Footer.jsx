import React from 'react';
import './Footer.css';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin as LinkedIn,
  Mail,
  Phone,
  MapPin,
  Leaf,
  Truck,
  Shield,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Main Footer Content */}
      <div className="container footer-content py-5">
        <div className="row">
          {/* Contact & Features */}
          <div className="col-lg-6 col-md-12 mb-4">
            <h4 className="section-title">Get In Touch</h4>

            <div className="contact-item">
              <div className="d-flex align-items-center">
                <div className="contact-icon">
                  <Phone className="text-light-green" size={20} />
                </div>
                <div>
                  <p className="small text-light-green mb-1 fw-semibold">Customer Care</p>
                  <p className="h6 text-soft-white mb-0">1800-123-4567</p>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="d-flex align-items-center">
                <div className="contact-icon">
                  <Mail className="text-light-green" size={20} />
                </div>
                <div>
                  <p className="small text-light-green mb-1 fw-semibold">Email Support</p>
                  <p className="h6 text-soft-white mb-0">help@krishimitra.com</p>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="d-flex align-items-center">
                <div className="contact-icon">
                  <MapPin className="text-light-green" size={20} />
                </div>
                <div>
                  <p className="small text-light-green mb-1 fw-semibold">Office</p>
                  <p className="h6 text-soft-white mb-0">123 Agriculture Hub, Farm City, Pune 4210244</p>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <div className="feature-badge">
                <Truck className="text-light-green me-2" size={18} />
                <span className="text-soft-white fw-semibold">Free Delivery Available</span>
              </div>
              <div className="feature-badge">
                <Shield className="text-light-green me-2" size={18} />
                <span className="text-soft-white fw-semibold">100% Safe & Secure</span>
              </div>
              
            </div>

            <h5 className="section-title">Connect With Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="social-link"><Facebook size={22} /></a>
              <a href="#" className="social-link"><Twitter size={22} /></a>
              <a href="#" className="social-link"><Instagram size={22} /></a>
              <a href="#" className="social-link"><LinkedIn size={22} /></a>
            </div>
          </div>

          {/* Brand Section */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="brand-section">
              <div className="brand-logo">
                <Leaf size={32} color="white" />
              </div>
              <h3 className="h2 fw-bold text-soft-white mb-4">KrishiMitra</h3>
              <p className="text-muted-light mb-4 fs-5 lh-base">
                Your trusted partner in agriculture. We connect farmers directly with consumers,
                providing fresh, quality agricultural products while supporting sustainable farming practices
                and empowering rural communities.
              </p>
              <div className="tagline-badge">
                <Leaf size={16} />
                <span>Farm Fresh • Direct to Door</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <div className="brand-logo me-3 small-logo">
                  <Leaf size={20} color="white" />
                </div>
                <div>
                  <span className="h5 fw-bold text-soft-white mb-0">KrishiMitra</span>
                  <div className="small text-muted-light">© 2024 All rights reserved</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="tagline-badge">
                  <span>🌱 Fresh from Farm</span>
                  <span className="mx-2">•</span>
                  <span>🚚 Same Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
