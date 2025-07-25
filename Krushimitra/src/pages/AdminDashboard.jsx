import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, Modal } from 'react-bootstrap';
import { Users, ShoppingBag, Package, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';

const AdminDashboard = ({ users, orders, products, setUsers, setOrders }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalCustomers = users.filter(user => user.role === 'customer').length;
  const totalFarmers = users.filter(user => user.role === 'farmer').length;

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const renderOverview = () => (
    <Row>
      <Col md={3} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <TrendingUp size={40} className="text-primary mb-2" />
            <h4>₹{totalRevenue}</h4>
            <small className="text-muted">Total Revenue</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <ShoppingBag size={40} className="text-warning mb-2" />
            <h4>{orders.length}</h4>
            <small className="text-muted">Total Orders</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <Users size={40} className="text-success mb-2" />
            <h4>{totalCustomers}</h4>
            <small className="text-muted">Customers</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} className="mb-4">
        <Card className="dashboard-card text-center">
          <Card.Body>
            <Package size={40} className="text-info mb-2" />
            <h4>{totalFarmers}</h4>
            <small className="text-muted">Farmers</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderUsers = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5>User Management</h5>
      </Card.Header>
      <Card.Body>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.role === 'admin' ? 'danger' : user.role === 'farmer' ? 'success' : 'primary'}>
                    {user.role}
                  </Badge>
                </td>
                <td>{user.phone}</td>
                <td>
                  {user.role !== 'admin' && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderOrders = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5>Order Management</h5>
      </Card.Header>
      <Card.Body>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const customer = users.find(u => u.id === order.userId);
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{customer?.name || 'Unknown'}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <Badge bg={
                      order.status === 'pending' ? 'warning' : 
                      order.status === 'confirmed' ? 'info' :
                      order.status === 'delivered' ? 'success' : 'danger'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                    >
                      <Eye size={14} />
                    </Button>
                    <Form.Select
                      size="sm"
                      style={{ width: 'auto', display: 'inline-block' }}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Form.Select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="dashboard-header">
        <Container>
          <h2>Admin Dashboard</h2>
          <p>Manage users, orders, and monitor system performance</p>
        </Container>
      </div>

      <Container>
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
            variant={selectedTab === 'users' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('users')}
          >
            Users ({users.length})
          </Button>
          <Button
            variant={selectedTab === 'orders' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('orders')}
          >
            Orders ({orders.length})
          </Button>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'users' && renderUsers()}
        {selectedTab === 'orders' && renderOrders()}

        {/* Order Details Modal */}
        <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Order Details - {selectedOrder?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div>
                <Row>
                  <Col md={6}>
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> {users.find(u => u.id === selectedOrder.userId)?.name}</p>
                    <p><strong>Email:</strong> {users.find(u => u.id === selectedOrder.userId)?.email}</p>
                  </Col>
                  <Col md={6}>
                    <h6>Order Information</h6>
                    <p><strong>Status:</strong> <Badge bg="info">{selectedOrder.status}</Badge></p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                    <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                  </Col>
                </Row>
                <hr />
                <h6>Shipping Address</h6>
                <p>{selectedOrder.shippingAddress}</p>
                <hr />
                <h6>Order Items</h6>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product.name}</td>
                        <td>₹{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.product.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end">
                  <strong>Total Amount: ₹{selectedOrder.totalAmount}</strong>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard;