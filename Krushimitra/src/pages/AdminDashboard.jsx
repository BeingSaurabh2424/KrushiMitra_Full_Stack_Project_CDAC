import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const AdminDashboard = ({ users, orders, products, setUsers, setOrders }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

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
              <th>Bmail</th>
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
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'users' && renderUsers()}
      </Container>
    </div>
  );
};

export default AdminDashboard;