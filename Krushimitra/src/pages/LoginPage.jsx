import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { LogIn } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const success = onLogin(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container className="mt-5">
      <div className="form-container fade-in">
        <Card>
          <Card.Header className="text-center">
            <LogIn size={40} className="mb-2 text-primary" />
            <h3>Login to KrushiMitra</h3>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>


              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading"></span> : 'Login'}
              </Button>
            </Form>

            <div className="text-center">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <Card className="mt-3 bg-light">
              <Card.Body>
                <h6>Demo Credentials:</h6>
                <small>
                  <strong>Admin:</strong> admin@krushimitra.com / admin123<br />
                  <strong>Farmer:</strong> rajesh@farmer.com / farmer123<br />
                  <strong>Customer:</strong> Register as new customer
                </small>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;