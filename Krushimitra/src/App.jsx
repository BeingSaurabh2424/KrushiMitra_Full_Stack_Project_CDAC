import React, { useState, useEffect } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
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
      setCurrentPage('login');
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
    setCurrentPage('order-confirmation');
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      if (user.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else if (user.role === 'farmer') {
        setCurrentPage('farmer-dashboard');
      } else {
        showAlertMessage(`Welcome back, ${user.name}!`, 'success');
        setCurrentPage('home');
      }
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
    setCurrentPage('home');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showAlertMessage('Logged out successfully', 'info');
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage onRegister={register} setCurrentPage={setCurrentPage} />;
      case 'cart':
        if (!currentUser) {
          showAlertMessage('Please login to view your cart', 'warning');
          return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
        }
        return (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'checkout':
        if (!currentUser) {
          showAlertMessage('Please login to checkout', 'warning');
          return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
        }
        return (
          <CheckoutPage
            cart={cart}
            currentUser={currentUser}
            placeOrder={placeOrder}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'admin-dashboard':
        if (!currentUser || currentUser.role !== 'admin') {
          showAlertMessage('Access denied. Admin privileges required.', 'danger');
          return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
        }
        return (
          <AdminDashboard
            users={users}
            orders={orders}
            products={products}
            setUsers={setUsers}
            setOrders={setOrders}
          />
        );
      case 'farmer-dashboard':
        if (!currentUser || currentUser.role !== 'farmer') {
          showAlertMessage('Access denied. Farmer privileges required.', 'danger');
          return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
        }
        return (
          <FarmerDashboard
            currentUser={currentUser}
            products={products}
            setProducts={setProducts}
            orders={orders}
          />
        );
      case 'profile':
        if (!currentUser) {
          showAlertMessage('Please login to view your profile', 'warning');
          return <LoginPage onLogin={login} setCurrentPage={setCurrentPage} />;
        }
        return (
          <UserProfile
            currentUser={currentUser}
            orders={orders}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'order-confirmation':
        return (
          <OrderConfirmation
            orderId={lastOrderId}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailPage
            product={selectedProduct}
            addToCart={addToCart}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
      default:
        return (
          <HomePage
            products={products}
            addToCart={addToCart}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
            showAlert={showAlert}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header
        showAlert={showAlert}
        currentUser={currentUser}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        setCurrentPage={setCurrentPage}
        logout={logout}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;