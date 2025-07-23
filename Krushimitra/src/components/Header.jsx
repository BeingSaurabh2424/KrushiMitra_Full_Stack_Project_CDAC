import { Home, LogIn, LogOut, ShoppingCart, User, UserPlus } from 'lucide-react'
import React from 'react'
import { Alert, Badge, Container, Nav, Navbar } from 'react-bootstrap'

const Header=({currentUser, cartItemCount, setCurrentPage, logout, showAlert}) =>{
  return (
    <>
      <Navbar bg='light' expand='lg' className='shadow-sm sticky-top'>
        <Container>
            <Navbar.Brand
              href='#'
              onClick={()=> setCurrentPage('home')}
              className='d-flex align-items-center'
              style={{cursor:'pointer'}}
            >
                <span className='me-2'>🌱</span>
                KrushiMitra
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
               <Nav className='me-auto'>
                  <Nav.Link onClick={()=> setCurrentPage('home')} style={{cursor:'pointer'}}>
                    <Home size={18} className='me-1' />
                    Home
                  </Nav.Link>
               </Nav>

                <Nav className="align-items-cente">
                { currentUser ? (
                    <>
                      <Nav.Link onClick={()=>setCurrentPage('cart')} className="position-relative" style={{cursor}}>
                        <ShoppingCart size={20}/>
                        {cartItemCount > 0 && (
                            <Badge
                              bg='danger'
                              pill
                              className='position-absolute top-0 start-100 translate-middle'
                            >
                                {cartItemCount}
                            </Badge>
                        )}
                      </Nav.Link>

                      <Nav.Link onClick={()=> setCurrentPage('profile')} style={{cursor:'pointer'}}>
                        <User size={18} className='me-1' />
                      </Nav.Link>

                      {currentUser.role==='admin' &&(
                        <Nav.Link onClick={()=>setCurrentPage('admin-dashboard')} style={{cursor:'pointer'}}>
                            Admin Dashboard
                        </Nav.Link>
                      )}

                      {currentUser.role==='farmer' && (
                        <Nav.Link onClick={()=>setCurrentPage('farmer-dashboard')} style={{cursor:'pointer'}}>
                            Farmer Dashboard
                        </Nav.Link>
                      )}
                        <Nav.Link onClick={logout} style={{cursor:'pointer'}}>
                            <LogOut size={18} className='me-1'/>
                            Logout
                        </Nav.Link>
                    </>
                ) :(
                    <>
                        <Nav.Link onClick={()=> setCurrentPage('login')} style={{cursor:'pointer'}}>
                            <LogIn size={18} className='me-1'/>
                            Login
                        </Nav.Link>
                        <Nav.Link onClick={()=>setCurrentPage('register')} style={{cursor:'pointer'}}>
                            <UserPlus size={18} className='me-1'/>
                            Register
                        </Nav.Link>
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Global Alert  */}

      {showAlert && (
        <Container className='mt-2'>
            <Alert variant={showAlert.type} className='fade-in mb-0'>
                {showAlert.message}
            </Alert>
        </Container>
      )}
    </>
  )
}

export default Header
