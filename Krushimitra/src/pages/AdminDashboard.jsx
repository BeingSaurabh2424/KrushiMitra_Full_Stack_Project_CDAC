import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const AdminDashboard = ({ users, orders, products, setUsers, setOrders }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div>
      <div className="dashboard-header">
        <Container>
          <h2>Admin Dashboard</h2>
          <p>Manage users, orders, and monitor system performance</p>
        </Container>
      </div>

      <Container>
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
      </Container>
    </div>
  );
};

export default AdminDashboard;