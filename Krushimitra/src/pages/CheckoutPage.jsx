import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { CreditCard, MapPin } from 'lucide-react';

const CheckoutPage = ({ cart, currentUser, placeOrder }) => {
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = totalAmount >= 500 ? 0 : 50;
  const finalAmount = totalAmount + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address');
      setIsLoading(false);
      return;
    }

    if (!currentUser) {
      setError('Please login to place an order');
      setIsLoading(false);
      return;
    }

    // Simulate order processing delay
    setTimeout(() => {
      const orderData = {
        userId: currentUser.id,
        items: cart,
        totalAmount: finalAmount,
        shippingAddress,
        paymentMethod
      };

      placeOrder(orderData);
      setIsLoading(false);
      navigate(`/order-confirmation/${Date.now()}`);
    }, 2000);
  };

  if (!currentUser) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">
          <h5>Please login to continue</h5>
          <Button variant="primary" as={Link} to="/login">
            Login
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Checkout</h2>
      
      <Row>
        <Col lg={8}>
          <Form onSubmit={handlePlaceOrder}>
            {/* Shipping Address */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <MapPin size={20} className="me-2" />
                Shipping Address
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter complete delivery address"
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Payment Method */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <CreditCard size={20} className="me-2" />
                Payment Method
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Cash on Delivery (COD)"
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Online Payment"
                    disabled
                    className="mb-2"
                  />
                  <small className="text-muted">Online payment coming soon!</small>
                </Form.Group>
              </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        </Col>
        
        <Col lg={4}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                {cart.map(item => (
                  <div key={item.product.id} className="d-flex justify-content-between mb-2">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3 fw-bold h5">
                <span>Total:</span>
                <span>₹{finalAmount}</span>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading me-2"></span>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="w-100 mt-2"
                as={Link}
                to="/cart"
              >
                Back to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;