import React from 'react';
import { Navbar, Nav, Container, Badge, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingCart, LogIn, UserPlus, LogOut, Home } from 'lucide-react';

const Header = ({ currentUser, cartItemCount, logout, showAlert }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <span className="me-2">🌱</span>
            KrushiMitra
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={isActive('/') ? 'active fw-bold' : ''}
              >
                <Home size={18} className="me-1" />
                Home
              </Nav.Link>
            </Nav>
            
            <Nav className="align-items-center">
              {currentUser ? (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/cart" 
                    className={`position-relative ${isActive('/cart') ? 'active fw-bold' : ''}`}
                  >
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <Badge 
                        bg="danger" 
                        pill 
                        className="position-absolute top-0 start-100 translate-middle"
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </Nav.Link>
                  
                  <Nav.Link 
                    as={Link} 
                    to="/profile"
                    className={isActive('/profile') ? 'active fw-bold' : ''}
                  >
                    <User size={18} className="me-1" />
                    {currentUser.name}
                  </Nav.Link>
                  
                  {currentUser.role === 'admin' && (
                    <Nav.Link 
                      as={Link} 
                      to="/admin"
                      className={isActive('/admin') ? 'active fw-bold' : ''}
                    >
                      Admin Dashboard
                    </Nav.Link>
                  )}
                  
                  {currentUser.role === 'farmer' && (
                    <Nav.Link 
                      as={Link} 
                      to="/farmer"
                      className={isActive('/farmer') ? 'active fw-bold' : ''}
                    >
                      Farmer Dashboard
                    </Nav.Link>
                  )}
                  
                  <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <LogOut size={18} className="me-1" />
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login"
                    className={isActive('/login') ? 'active fw-bold' : ''}
                  >
                    <LogIn size={18} className="me-1" />
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register"
                    className={isActive('/register') ? 'active fw-bold' : ''}
                  >
                    <UserPlus size={18} className="me-1" />
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Global Alert */}
      {showAlert && (
        <Container className="mt-2">
          <Alert variant={showAlert.type} className="fade-in mb-0">
            {showAlert.message}
          </Alert>
        </Container>
      )}
    </>
  );
};

export default Header;