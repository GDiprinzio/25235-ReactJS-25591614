import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

//Componentes propios
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import P_Route from "./Components/pRoutes/ProtectedRoutes";
import { ProductsProvider } from "./context/productsContext";
import { CartProvider } from "./context/cartContext";
import { CrudProvider } from "./context/crudContext";
//Pages
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Admin from "./pages/Admin/Admin";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Forms/Login";
import UserRegis from "./pages/Forms/userRegis";
import Users from "./pages/Users/Users";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <CrudProvider>
            <Router>
              <NavBar />
              <Container>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Store" element={<Store />} />

                  <Route
                    path="/Users"
                    element={
                      <P_Route>
                        <Users />
                      </P_Route>
                    }
                  />
                  <Route
                    path="/Admin"
                    element={
                      <P_Route>
                        <Admin />
                      </P_Route>
                    }
                  />

                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/userRegistration" element={<UserRegis />} />
                </Routes>
              </Container>
              <Footer />
            </Router>
          </CrudProvider>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
