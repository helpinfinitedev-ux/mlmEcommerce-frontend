// import UserDashboard from "./components/dashboard/UserDashboard";
// import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./components/ecommerce/Checkout";
// import ProductDetails from "./components/ecommerce/ProductDetails";
// import ShoppingCart from "./components/ecommerce/ShoppingCart";
// import Orders from "./components/ecommerce/Orders";
// import Wallet from "./components/dashboard/Wallet";
// import ForgotPassword from "./pages/ForgotPassword";

// import { CartProvider, useCart } from "./components/ecommerce/CartContext";
// import Header from "./components/shared/Header";
// import Footer from "./components/shared/Footer";

// export const ActiveUserContext = createContext();

// // navLinks removed as they were not used in the render


// // ✅ User App Layout
// const UserApp = ({ activeUser, onSwitchUser }) => (
//   <ActiveUserContext.Provider value={{ activeUser, onSwitchUser }}>
//     <div className="main-container bg-secondary-50">
//       <Header activeUser={activeUser} onSwitchUser={onSwitchUser} />

//       {/* Main Content Area */}
//       <main className="flex-1">
//         <div className="page-container">
//           <Routes>
//             <Route path="" element={<Home />} />
//             <Route path="shop" element={<Shop />} />
//             <Route path="about" element={<About />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="products/:id" element={<ProductDetails />} />
//             <Route path="cart" element={<ShoppingCart />} />
//             <Route path="checkout" element={<Checkout />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="wallet" element={<Wallet />} />
//             <Route path="forgot-password" element={<ForgotPassword />} />
//             <Route path="*" element={<Navigate to="" />} />
//           </Routes>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   </ActiveUserContext.Provider>
// );

// // ✅ Main App Wrapper
// function AppWrapper() {
//   const navigate = useNavigate();
//   const { cart } = useCart();
//   const location = useLocation();
//   const [authData, setAuthData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("authData");
//     const storedActive = localStorage.getItem("activeUser");

//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setAuthData(parsed);
//         setIsAuthenticated(true);
//       } catch {
//         localStorage.removeItem("authData");
//       }
//     }

//     if (storedActive) {
//       try {
//         const parsed = JSON.parse(storedActive);
//         setActiveUser(parsed);
//       } catch {
//         localStorage.removeItem("activeUser");
//       }
//     }
//   }, []);

//   // ✅ Login Success
//   // const handleAuthSuccess = (data) => {
//   //   setAuthData(data);
//   //   setIsAuthenticated(true);
//   //   setActiveUser(null);
//   //   localStorage.setItem("authData", JSON.stringify(data));
//   // };
//   // ✅ Login Success
//   const handleAuthSuccess = (data) => {
//     setAuthData(data);
//     setIsAuthenticated(true);
//     setActiveUser(null);
//     localStorage.setItem("authData", JSON.stringify(data));

//     // 🔥 Token ko alag save karo
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//     }
//   };


//   // ✅ Logout
//   // const handleLogout = () => {
//   //   setAuthData(null);
//   //   setIsAuthenticated(false);
//   //   setActiveUser(null);
//   //   localStorage.removeItem("authData");
//   //   localStorage.removeItem("activeUser");
//   //   localStorage.removeItem("userToken");
//   //   localStorage.removeItem("userId");
//   // };
//   // ✅ Logout
//   const handleLogout = () => {
//     setAuthData(null);
//     setIsAuthenticated(false);
//     setActiveUser(null);
//     localStorage.removeItem("authData");
//     localStorage.removeItem("activeUser");
//     localStorage.removeItem("token"); // ✅ yeh important hai
//   };



//   // ✅ Data Update
//   const handleDataUpdate = (newData) => {
//     const updatedData = { ...authData, ...newData };
//     setAuthData(updatedData);
//     localStorage.setItem("authData", JSON.stringify(updatedData));
//   };

//   // ✅ Switch User
//   const handleSwitchUser = () => {
//     setActiveUser(null);
//     localStorage.removeItem("activeUser");
//     navigate("/dashboard");
//   };

//   // ✅ User Select
//   const handleUserIdSelect = (userId) => {
//     const userInfo = {
//       userId,
//       parentMobile: authData?.parentMobile || authData?.mobileNumber,
//     };
//     setActiveUser(userInfo);
//     localStorage.setItem("activeUser", JSON.stringify(userInfo));
//     navigate(`/ user / ${userId} `);
//   };

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AuthContainer onAuthSuccess={handleAuthSuccess} />
//           )
//         }
//       />
//       <Route
//         path="/auth"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AuthContainer onAuthSuccess={handleAuthSuccess} />
//           )
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated ? (
//             <UserDashboard
//               userData={authData}
//               onLogout={handleLogout}
//               onDataUpdate={handleDataUpdate}
//               onUserIdSelect={handleUserIdSelect}
//             />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//       <Route
//         path="/user/:userId/*"
//         element={
//           activeUser ? (
//             <CartProvider userId={activeUser.userId}>
//               <UserApp activeUser={activeUser} onSwitchUser={handleSwitchUser} />
//             </CartProvider>
//           ) : (
//             <Navigate to="/dashboard" />
//           )
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// // ✅ Root App
// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <AppWrapper />
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";
import "./styles/components.css";

import AuthContainer from "./components/auth/AuthContainer";
import UserDashboard from "./components/dashboard/UserDashboard";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./components/ecommerce/Checkout";
import ProductDetails from "./components/ecommerce/ProductDetails";
import ShoppingCart from "./components/ecommerce/ShoppingCart";
import Orders from "./components/ecommerce/Orders";
import Wallet from "./components/dashboard/Wallet";
import ForgotPassword from "./pages/ForgotPassword";

import { CartProvider, useCart } from "./components/ecommerce/CartContext";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

export const ActiveUserContext = createContext();

// ✅ User App Layout
const UserApp = ({ activeUser, onSwitchUser }) => (
  <ActiveUserContext.Provider value={{ activeUser, onSwitchUser }}>
    <div className="main-container bg-secondary-50">
      <Header activeUser={activeUser} onSwitchUser={onSwitchUser} />

      <main className="flex-1">
        <div className="page-container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="" />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  </ActiveUserContext.Provider>
);

// ✅ Main App Wrapper
function AppWrapper() {
  const navigate = useNavigate();
  useLocation(); // ✅ imported correctly (even if unused now)
  useCart();     // ✅ safe to keep

  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authData");
    const storedActive = localStorage.getItem("activeUser");

    if (stored) {
      try {
        setAuthData(JSON.parse(stored));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("authData");
      }
    }

    if (storedActive) {
      try {
        setActiveUser(JSON.parse(storedActive));
      } catch {
        localStorage.removeItem("activeUser");
      }
    }
  }, []);

  // ✅ Login Success
  const handleAuthSuccess = (data) => {
    setAuthData(data);
    setIsAuthenticated(true);
    setActiveUser(null);
    localStorage.setItem("authData", JSON.stringify(data));

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    setAuthData(null);
    setIsAuthenticated(false);
    setActiveUser(null);
    localStorage.removeItem("authData");
    localStorage.removeItem("activeUser");
    localStorage.removeItem("token");
  };

  // ✅ Data Update
  const handleDataUpdate = (newData) => {
    const updated = { ...authData, ...newData };
    setAuthData(updated);
    localStorage.setItem("authData", JSON.stringify(updated));
  };

  // ✅ Switch User
  const handleSwitchUser = () => {
    setActiveUser(null);
    localStorage.removeItem("activeUser");
    navigate("/dashboard");
  };

  // ✅ User Select (FIXED ROUTE)
  const handleUserIdSelect = (userId) => {
    const userInfo = {
      userId,
      parentMobile: authData?.parentMobile || authData?.mobileNumber,
    };
    setActiveUser(userInfo);
    localStorage.setItem("activeUser", JSON.stringify(userInfo));
    navigate(`/user/${userId}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <UserDashboard
              userData={authData}
              onLogout={handleLogout}
              onDataUpdate={handleDataUpdate}
              onUserIdSelect={handleUserIdSelect}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/user/:userId/*"
        element={
          activeUser ? (
            <CartProvider userId={activeUser.userId}>
              <UserApp
                activeUser={activeUser}
                onSwitchUser={handleSwitchUser}
              />
            </CartProvider>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// ✅ Root App
function App() {
  return (
    <Router>
      <CartProvider>
        <AppWrapper />
      </CartProvider>
    </Router>
  );
}

export default App;
