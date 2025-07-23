import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';

const HomePage = ({ products, addToCart, currentUser, setCurrentPage, setSelectedProduct, showAlert }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle adding product to cart
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Navigate to product detail page
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

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

        {/* Search and Filter */}
        <Row className="mb-4 g-3">
          <Col md={6} lg={4}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              size="lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6} lg={4}>
            <Form.Select 
              size="lg"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={4} className="d-flex align-items-center">
            <small className="text-muted">
              <strong>{filteredProducts.length}</strong> products found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </small>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row>
          {filteredProducts.map(product => (
            <Col key={product.id} lg={4} md={6} className="mb-4">
              <Card 
                className="h-100" 
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="h5 fw-bold">₹{product.price}/{product.unit}</div>
                  {product.inStock ? (
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart size={18} className="me-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled className="w-100">
                      Out of Stock
                    </Button>
                  )}
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