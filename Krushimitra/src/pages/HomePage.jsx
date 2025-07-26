import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { ShoppingCart, Star } from "lucide-react";

const HomePage = ({
  products,
  addToCart,
  currentUser,
  setSelectedProduct,
  showAlert,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1 className="fade-in display-4 fw-bold">
            Fresh from Farm to Your Table
          </h1>
          <p className="fade-in lead">
            Direct from farmers - Fresh, Organic, and Affordable
          </p>
          <Button
            variant="warning"
            size="lg"
            className="fade-in px-4 py-2"
            onClick={() => {
              const element = document.getElementById("products-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Start Shopping
          </Button>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="mt-5" id="products-section">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary">Our Fresh Products</h2>
          <p className="lead text-muted">
            Discover the finest selection of farm-fresh produce
          </p>
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
              className="shadow-sm"
            />
          </Col>
          <Col md={6} lg={4}>
            <Form.Select
              size="lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="shadow-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={4} className="d-flex align-items-center">
            <small className="text-muted">
              <strong>{filteredProducts.length}</strong> products found
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </small>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={4} md={6} className="mb-4">
              <Card
                className="product-card h-100 fade-in"
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-image"
                    style={{ transition: "transform 0.3s ease" }}
                  />
                  <div className="product-overlay">
                    <small className="text-white">Click to view details</small>
                  </div>
                </div>
                <Card.Body className="product-card-body d-flex flex-column">
                  <div className="mb-auto">
                    <span className="category-badge">{product.category}</span>
                    <Card.Title className="product-title">
                      {product.name}
                    </Card.Title>
                    <div className="product-price h5 fw-bold">
                      ₹{product.price}/{product.unit}
                    </div>
                    <Card.Text className="product-description">
                      {product.description}
                    </Card.Text>
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <small className="text-muted">(4.5) 120 reviews</small>
                    </div>
                  </div>

                  <div className="mt-auto">
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
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-4">
              <div style={{ fontSize: "4rem" }}>🔍</div>
            </div>
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline-primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Features Section */}
        <Row className="mt-5 py-5 bg-light rounded">
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">🚚</div>
            <h5 className="fw-bold">Free Delivery</h5>
            <p className="text-muted">Free delivery on orders above ₹500</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">🌱</div>
            <h5 className="fw-bold">Fresh & Organic</h5>
            <p className="text-muted">Directly sourced from local farmers</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">💰</div>
            <h5 className="fw-bold">Best Prices</h5>
            <p className="text-muted">Competitive prices with no middleman</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
