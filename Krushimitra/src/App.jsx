import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


import LoginPage from './pages/LoginPage'
import { Home } from 'lucide-react'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <LoginPage/>
      <HomePage/>
        

    </>
  );
}

export default App;
