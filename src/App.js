import React from "react"
import GlobalState from "./context/GlobalState"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThankYou from "./pages/ThankYou"
import ManageProducts from "./pages/ManageProducts"


const App = () => {
  return(
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="manageProducts" element={<ManageProducts />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default App;