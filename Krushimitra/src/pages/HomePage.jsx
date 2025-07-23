import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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

      {/* Main Content */}
      <Container className="mt-5" id="products-section">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary">Our Fresh Products</h2>
          <p className="lead text-muted">Discover the finest selection of farm-fresh produce</p>
        </div>

        {/* Products Grid */}
        <Row>
          {products.map(product => (
            <Col key={product.id} lg={4} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="h5 fw-bold">₹{product.price}/{product.unit}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;