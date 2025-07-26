import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import UserProfile from './pages/UserProfile';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './components/Footer';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastOrderId, setLastOrderId] = useState('');
  const [showAlert, setShowAlert] = useState(null);

  // Initialize sample data
  useEffect(() => {
    const sampleProducts = [
      {
        id: '1',
        name: 'Fresh Tomatoes',
        category: 'Vegetables',
        price: 40,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Fresh red tomatoes grown organically',
        farmerId: 'farmer1',
        inStock: true
      },
      {
        id: '2',
        name: 'Organic Carrots',
        category: 'Vegetables',
        price: 60,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Sweet and crunchy organic carrots',
        farmerId: 'farmer1',
        inStock: true
      },
      {
        id: '3',
        name: 'Fresh Milk',
        category: 'Dairy',
        price: 55,
        unit: 'liter',
        image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Pure cow milk from grass-fed cows',
        farmerId: 'farmer2',
        inStock: true
      },
      {
        id: '4',
        name: 'Brown Rice',
        category: 'Grains',
        price: 80,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Nutritious brown rice',
        farmerId: 'farmer2',
        inStock: true
      },
      {
        id: '5',
        name: 'Fresh Apples',
        category: 'Fruits',
        price: 120,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Crisp and sweet red apples',
        farmerId: 'farmer1',
        inStock: true
      },
      {
        id: '6',
        name: 'Fresh Bananas',
        category: 'Fruits',
        price: 50,
        unit: 'dozen',
        image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Ripe yellow bananas',
        farmerId: 'farmer2',
        inStock: true
      }
    ];

    const sampleUsers = [
      {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@krushimitra.com',
        password: 'admin123',
        role: 'admin',
        phone: '9999999999',
        address: 'Admin Office'
      },
      {
        id: 'farmer1',
        name: 'Rajesh Kumar',
        email: 'rajesh@farmer.com',
        password: 'farmer123',
        role: 'farmer',
        phone: '9876543210',
        address: 'Village Krishnapur, District Mathura'
      },
      {
        id: 'farmer2',
        name: 'Priya Sharma',
        email: 'priya@farmer.com',
        password: 'farmer123',
        role: 'farmer',
        phone: '9876543211',
        address: 'Village Govindpur, District Vrindavan'
      }
    ];

    setProducts(sampleProducts);
    setUsers(sampleUsers);
  }, []);

  const showAlertMessage = (message, type = 'success') => {
    setShowAlert({ message, type });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      showAlertMessage('Please login to add items to cart', 'warning');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showAlertMessage(`${product.name} added to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD${Date.now()}`,
      status: 'pending',
      orderDate: new Date().toISOString()
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCart([]);
    setLastOrderId(newOrder.id);
    showAlertMessage('Order placed successfully!', 'success');
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      showAlertMessage(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    return false;
  };

  const register = (userData) => {
    if (users.find(u => u.email === userData.email)) {
      return false; // User already exists
    }
    const newUser = {
      ...userData,
      id: `user${Date.now()}`
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    showAlertMessage(`Welcome to KrushiMitra, ${newUser.name}!`, 'success');
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showAlertMessage('Logged out successfully', 'info');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!currentUser) {
      showAlertMessage('Please login to access this page', 'warning');
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      showAlertMessage('Access denied. Insufficient privileges.', 'danger');
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Header
          showAlert={showAlert}
          currentUser={currentUser}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          logout={logout}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <HomePage
                products={products}
                addToCart={addToCart}
                currentUser={currentUser}
                setSelectedProduct={setSelectedProduct}
                showAlert={showAlert}
              />
            } 
          />
          
          <Route 
            path="/login" 
            element={
              currentUser ? <Navigate to="/" replace /> : <LoginPage onLogin={login} />
            } 
          />
          
          <Route 
            path="/register" 
            element={
              currentUser ? <Navigate to="/" replace /> : <RegisterPage onRegister={register} />
            } 
          />
          
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailPage
                products={products}
                addToCart={addToCart}
                currentUser={currentUser}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCartQuantity={updateCartQuantity}
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage
                  cart={cart}
                  currentUser={currentUser}
                  placeOrder={placeOrder}
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile
                  currentUser={currentUser}
                  orders={orders}
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/order-confirmation/:orderId" 
            element={
              <ProtectedRoute>
                <OrderConfirmation orderId={lastOrderId} />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard
                  users={users}
                  orders={orders}
                  products={products}
                  setUsers={setUsers}
                  setOrders={setOrders}
                />
              </ProtectedRoute>
            } 
          />

          {/* Farmer Routes */}
          <Route 
            path="/farmer" 
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard
                  currentUser={currentUser}
                  products={products}
                  setProducts={setProducts}
                  orders={orders}
                />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* footer added to all pages */}
      <Footer/>
    </Router>
  );
}

export default App;