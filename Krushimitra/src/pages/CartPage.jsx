import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartPage = ({ cart, removeFromCart, updateCartQuantity }) => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <div className="py-5">
          <ShoppingBag size={80} className="text-muted mb-3" />
          <h3>Your cart is empty</h3>
          <p className="text-muted">Add some products to get started</p>
          <Button variant="primary" as={Link} to="/">
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart ({totalItems} items)</h2>

      <Row>
        <Col lg={8}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Cart Items</h5>
            </Card.Header>
            <Card.Body>
              {cart.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        rounded
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 className="mb-1">{item.product.name}</h6>
                      <small className="text-muted">
                        {item.product.category}
                      </small>
                      <div className="text-primary fw-bold">
                        ₹{item.product.price}/{item.product.unit}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(
                              item.product.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          min="1"
                        />
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </Col>
                    <Col md={2} className="text-end">
                      <div className="fw-bold mb-2">
                        ₹{item.product.price * item.quantity}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="cart-summary">
            <h5 className="mb-3">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery:</span>
              <span>{totalAmount >= 500 ? "Free" : "₹50"}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-3 fw-bold">
              <span>Total:</span>
              <span>
                ₹{totalAmount >= 500 ? totalAmount : totalAmount + 50}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-2"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outline-primary"
              className="w-100"
              as={Link}
              to="/"
            >
              Continue Shopping
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
