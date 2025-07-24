import React from "react";
import { Container, Button } from "react-bootstrap";
import { ShoppingBag } from "lucide-react";

const CartPage = ({
  cart,
  removeFromCart,
  updateCartQuantity,
  setCurrentPage,
}) => {
  if (cart.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <div className="py-5">
          <ShoppingBag size={80} className="text-muted mb-3" />
          <h3>Your cart is empty</h3>
          <p className="text-muted">Add some products to get started</p>
          <Button variant="primary" onClick={() => setCurrentPage("home")}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {/* Cart items will be added here */}
    </Container>
  );
};

export default CartPage;
//yash