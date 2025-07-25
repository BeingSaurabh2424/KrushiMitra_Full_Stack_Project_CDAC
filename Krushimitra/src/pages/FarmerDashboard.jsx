import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { Package, Plus, Edit, Trash2, TrendingUp, ShoppingBag } from 'lucide-react';

const FarmerDashboard = ({ currentUser, products, setProducts, orders }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    description: '',
    image: ''
  });

  if (!currentUser || currentUser.role !== 'farmer') {
    return <div>Access denied</div>;
  }

  const myProducts = products.filter(p => p.farmerId === currentUser.id);
  const myOrders = orders.filter(order => 
    order.items.some(item => item.product.farmerId === currentUser.id)
  );
  
  const totalRevenue = myOrders.reduce((sum, order) => {
    const myItems = order.items.filter(item => item.product.farmerId === currentUser.id);
    return sum + myItems.reduce((itemSum, item) => itemSum + (item.product.price * item.quantity), 0);
  }, 0);

  const resetForm = () => {
    setProductForm({
      name: '',
      category: '',
      price: '',
      unit: '',
      description: '',
      image: ''
    });
    setEditingProduct(null);
  };

  const openProductModal = (product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        unit: product.unit,
        description: product.description,
        image: product.image
      });
    } else {
      resetForm();
    }
    setShowProductModal(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.category || !productForm.price || !productForm.unit) {
      setAlert({ message: 'Please fill in all required fields', type: 'danger' });
      return;
    }

    const productData = {
      name: productForm.name,
      category: productForm.category,
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      description: productForm.description,
      image: productForm.image || 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
      farmerId: currentUser.id,
      inStock: true
    };

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      ));
      setAlert({ message: 'Product updated successfully!', type: 'success' });
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `prod_${Date.now()}`
      };
      setProducts([...products, newProduct]);
      setAlert({ message: 'Product added successfully!', type: 'success' });
    }

    setShowProductModal(false);
    resetForm();
    setTimeout(() => setAlert(null), 3000);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      setAlert({ message: 'Product deleted successfully!', type: 'success' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const renderOverview = () => (
    <Row>
      <Col md={4} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <TrendingUp size={40} className="text-primary mb-2" />
            <h4>₹{totalRevenue}</h4>
            <small className="text-muted">Total Revenue</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <Package size={40} className="text-success mb-2" />
            <h4>{myProducts.length}</h4>
            <small className="text-muted">My Products</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <ShoppingBag size={40} className="text-info mb-2" />
            <h4>{myOrders.length}</h4>
            <small className="text-muted">Orders Received</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderProducts = () => (
    <Card className="dashboard-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>My Products</h5>
        <Button variant="primary" onClick={() => openProductModal()}>
          <Plus size={18} className="me-1" />
          Add Product
        </Button>
      </Card.Header>
      <Card.Body>
        {myProducts.length === 0 ? (
          <div className="text-center py-4">
            <Package size={60} className="text-muted mb-3" />
            <h5>No products yet</h5>
            <p className="text-muted">Add your first product to start selling</p>
            <Button variant="primary" onClick={() => openProductModal()}>
              Add Product
            </Button>
          </div>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.unit}</td>
                  <td>
                    <span className={product.inStock ? 'text-success' : 'text-danger'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openProductModal(product)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  const renderOrders = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5>Orders for My Products</h5>
      </Card.Header>
      <Card.Body>
        {myOrders.length === 0 ? (
          <div className="text-center py-4">
            <ShoppingBag size={60} className="text-muted mb-3" />
            <h5>No orders yet</h5>
            <p className="text-muted">Orders for your products will appear here</p>
          </div>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map(order => {
                const myItems = order.items.filter(item => item.product.farmerId === currentUser.id);
                const itemsTotal = myItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {myItems.map(item => (
                        <div key={item.product.id}>
                          {item.product.name} x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>₹{itemsTotal}</td>
                    <td>
                      <span className={`status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="dashboard-header">
        <Container>
          <h2>Farmer Dashboard</h2>
          <p>Welcome back, {currentUser.name}! Manage your products and track orders.</p>
        </Container>
      </div>

      <Container>
        {alert && (
          <Alert variant={alert.type} className="fade-in">
            {alert.message}
          </Alert>
        )}

        {/* Navigation Tabs */}
        <div className="mb-4">
          <Button
            variant={selectedTab === 'overview' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={selectedTab === 'products' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('products')}
          >
            My Products ({myProducts.length})
          </Button>
          <Button
            variant={selectedTab === 'orders' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('orders')}
          >
            Orders ({myOrders.length})
          </Button>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'products' && renderProducts()}
        {selectedTab === 'orders' && renderOrders()}

        {/* Product Modal */}
        <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleProductSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Grains">Grains</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Spices">Spices</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₹) *</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Unit *</Form.Label>
                    <Form.Select
                      value={productForm.unit}
                      onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                      required
                    >
                      <option value="">Select Unit</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="gram">Gram (g)</option>
                      <option value="liter">Liter</option>
                      <option value="piece">Piece</option>
                      <option value="dozen">Dozen</option>
                      <option value="bundle">Bundle</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  placeholder="Describe your product..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg (optional)"
                />
                <Form.Text className="text-muted">
                  Leave empty to use default image
                </Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowProductModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default FarmerDashboard;