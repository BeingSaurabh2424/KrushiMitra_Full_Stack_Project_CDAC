import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FarmerDashboard from "./pages/FarmerDashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginPage /> */}
      {/* <CartPage/> */}
      {/* <Header/> */}
      {/* <HomePage/> */}
      {/* <FarmerDashboard/> */}
    </>
  );
}

export default App;
