import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Breadcrumb } from 'react-bootstrap';
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';

const ProductDetailPage = ({ products, addToCart, currentUser, selectedProduct, setSelectedProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // Get product from URL parameter or selectedProduct
  const product = selectedProduct || products.find(p => p.id === id);

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <h4>Product not found</h4>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <Container className="mt-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Back Button */}
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={18} className="me-2" />
        Back to Products
      </Button>

      <Row>
        {/* Product Images */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="main-image-container mb-3">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
              <div className="d-flex gap-2 px-3 pb-3">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`img-thumbnail ${selectedImage === index ? 'border-primary' : ''}`}
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details */}
        <Col lg={6}>
          <div className="product-details">
            <Badge bg="success" className="mb-2">{product.category}</Badge>
            <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="fw-bold me-2">4.5</span>
              <span className="text-muted">(120 reviews)</span>
            </div>

            {/* Price */}
            <div className="price-section mb-4">
              <h2 className="text-primary fw-bold mb-1">₹{product.price}/{product.unit}</h2>
              <small className="text-muted">Inclusive of all taxes</small>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h5 className="fw-bold">Description</h5>
              <p className="text-muted">{product.description}</p>
              <p className="text-muted">
                Fresh and organic {product.name.toLowerCase()} sourced directly from local farmers. 
                Rich in nutrients and grown without harmful pesticides. Perfect for your daily nutritional needs.
              </p>
            </div>

            {/* Product Info */}
            <div className="mb-4">
              <Row>
                <Col sm={6}>
                  <div className="info-item mb-2">
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Unit:</strong> {product.unit}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="info-item mb-2">
                    <strong>Availability:</strong> 
                    <span className={product.inStock ? 'text-success ms-1' : 'text-danger ms-1'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="info-item mb-2">
                    <strong>Delivery:</strong> Same day delivery
                  </div>
                </Col>
              </Row>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Quantity</h6>
              <div className="d-flex align-items-center gap-3">
                <div className="quantity-controls">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center mx-2"
                    style={{ width: '80px' }}
                    min="1"
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="ms-3">
                  <strong>Total: ₹{(product.price * quantity).toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mb-4">
              {product.inStock ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-grow-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} className="me-2" />
                  Add to Cart
                </Button>
              ) : (
                <Button variant="secondary" size="lg" className="flex-grow-1" disabled>
                  Out of Stock
                </Button>
              )}
              
              <Button variant="outline-danger" size="lg">
                <Heart size={20} />
              </Button>
              
              <Button variant="outline-info" size="lg">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">🚚</span>
                <small>Free delivery on orders above ₹500</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">🔄</span>
                <small>Easy returns within 7 days</small>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2">✅</span>
                <small>100% organic and pesticide-free</small>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Related Products Section */}
      <Row className="mt-5">
        <Col>
          <h3 className="fw-bold mb-4">You might also like</h3>
          <div className="text-center py-4">
            <p className="text-muted">Related products will be shown here</p>
            <Button variant="outline-primary" onClick={() => navigate('/')}>
              Browse All Products
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;