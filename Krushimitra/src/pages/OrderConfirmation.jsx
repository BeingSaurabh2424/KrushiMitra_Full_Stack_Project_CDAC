import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { CheckCircle, Home, User } from "lucide-react";

const OrderConfirmation = ({ orderId }) => {
  return (
    <Container className="mt-5">
      <div className="text-center py-5">
        <Card className="dashboard-card mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Body className="p-5">
            <CheckCircle size={80} className="text-success mb-4" />
            <h2 className="text-success mb-3">Order Placed Successfully!</h2>
            <p className="h5 mb-3">Order ID: {orderId}</p>
            <p className="text-muted mb-4">
              Thank you for your order. We have received your order and will
              process it soon. You will receive a confirmation call from our
              team within 24 hours.
            </p>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button variant="primary" as={Link} to="/" className="px-4">
                <Home size={18} className="me-2" />
                Continue Shopping
              </Button>
              <Button
                variant="outline-primary"
                as={Link}
                to="/profile"
                className="px-4"
              >
                <User size={18} className="me-2" />
                View Orders
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default OrderConfirmation;
