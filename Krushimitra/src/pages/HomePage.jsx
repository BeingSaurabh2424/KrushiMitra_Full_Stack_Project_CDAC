import React from 'react';
import { Container, Button } from 'react-bootstrap';

const HomePage = ({ products, addToCart, currentUser, setCurrentPage, setSelectedProduct, showAlert }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold">Fresh from Farm to Your Table</h1>
          <p className="lead">Direct from farmers - Fresh, Organic, and Affordable</p>
          <Button 
            variant="warning" 
            size="lg" 
            className="px-4 py-2"
            onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Start Shopping
          </Button>
        </Container>
      </div>

      {/* Placeholder for Products */}
      <Container className="mt-5" id="products-section">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary">Our Fresh Products</h2>
          <p className="lead text-muted">Discover the finest selection of farm-fresh produce</p>
        </div>
        {/* Product grid will be added here */}
      </Container>
    </div>
  );
};

export default HomePage;