import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { User, Clock, MapPin, Phone, Mail } from 'lucide-react';

// UserProfile component displays user information and order history with tabbed navigation
const UserProfile = ({ currentUser, orders }) => {
  // State to manage the currently selected tab (profile or orders)
  const [selectedTab, setSelectedTab] = useState('profile');

  // Checking if user is not logged in and render login prompt
  if (!currentUser) {
    return (
      <Container className="mt-5 text-center">
        <h4>Please login to view your profile</h4>
        <Button variant="primary" as={Link} to="/login">
          Login
        </Button>
      </Container>
    );
  }

  // Filter orders to show only those belonging to the current user
  const userOrders = orders.filter(order => order.userId === currentUser.id);

  // Render profile information card with user details
  const renderProfile = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5>Profile Information</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            {/* Display user's full name with icon */}
            <div className="mb-3">
              <strong className="d-flex align-items-center mb-2">
                <User size={18} className="me-2 text-primary" />
                Full Name
              </strong>
              <p>{currentUser.name}</p>
            </div>
            
            {/* Display user's email address with icon */}
            <div className="mb-3">
              <strong className="d-flex align-items-center mb-2">
                <Mail size={18} className="me-2 text-primary" />
                Email Address
              </strong>
              <p>{currentUser.email}</p>
            </div>
          </Col>
          
          <Col md={6}>
            {/* Display user's phone number with icon */}
            <div className="mb-3">
              <strong className="d-flex align-items-center mb-2">
                <Phone size={18} className="me-2 text-primary" />
                Phone Number
              </strong>
              <p>{currentUser.phone}</p>
            </div>
            
            {/* Display user's address with icon */}
            <div className="mb-3">
              <strong className="d-flex align-items-center mb-2">
                <MapPin size={18} className="me-2 text-primary" />
                Address
              </strong>
              <p>{currentUser.address}</p>
            </div>
          </Col>
        </Row>
        
        {/* Display user role with appropriate badge */}
        <div className="mt-3">
          <strong>Account Type:</strong>
          <Badge 
            bg={currentUser.role === 'farmer' ? 'success' : 'primary'} 
            className="ms-2"
          >
            {currentUser.role}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );

  // Render orders table or empty state message
  const renderOrders = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5>My Orders ({userOrders.length})</h5>
      </Card.Header>
      <Card.Body>
        {/* Show empty state if no orders exist */}
        {userOrders.length === 0 ? (
          <div className="text-center py-5">
            <Clock size={60} className="text-muted mb-3" />
            <h5>No orders yet</h5>
            <p className="text-muted">Start shopping to see your orders here</p>
            <Button variant="primary" as={Link} to="/">
              Start Shopping
            </Button>
          </div>
        ) : (
          /* Display orders in a responsive table */
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    {/* List order items with product name and quantity */}
                    {order.items.map((item, index) => (
                      <div key={index} className="small">
                        {item.product.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    {/* Display order status with color-coded badge */}
                    <Badge bg={
                      order.status === 'pending' ? 'warning' : 
                      order.status === 'confirmed' ? 'info' :
                      order.status === 'delivered' ? 'success' : 'danger'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <div>
      {/* Header section with title and description */}
      <div className="dashboard-header">
        <Container>
          <h2>My Profile</h2>
          <p>Manage your account information and view order history</p>
        </Container>
      </div>

      <Container>
        {/* Tab navigation for switching between profile and orders */}
        <div className="mb-4">
          <Button
            variant={selectedTab === 'profile' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('profile')}
          >
            Profile
          </Button>
          <Button
            variant={selectedTab === 'orders' ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setSelectedTab('orders')}
          >
            Orders ({userOrders.length})
          </Button>
        </div>

        {/* Conditionally render profile or orders based on selected tab */}
        {selectedTab === 'profile' && renderProfile()}
        {selectedTab === 'orders' && renderOrders()}
      </Container>
    </div>
  );
};

export default UserProfile;