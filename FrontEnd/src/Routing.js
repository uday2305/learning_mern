import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

import { Login } from "./pages/userLogin";
import { Register } from "./pages/registration";
import { Profile } from "./pages/userProfile";
import { CheckOut } from "./pages/checkout";

import { HomePage } from "./components/HomePage";
import { Cart } from "./components/Cart";
import Orders from "./components/Orders";
import ProductCategories from "./components/ProductCategories";
import { ProductDetails } from "./components/ProductDetails";
import {
  AddProduct,
  EditProduct,
  ManageProducts,
} from "./pages/productManagement";
import ManageOrders from "./components/ManageOrders";

import { PrivateRoute } from "./helperComponents";
import { history } from "./helpers";

function Routing() {
  return (
    <Router history={history}>
      <Header />
      <main className="flex-shrink-0">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/categories" element={<ProductCategories />}></Route>
          <Route
            path="/categories/:category_id"
            element={<ProductCategories />}
          ></Route>
          <Route
            path="/products/:product_id"
            element={<ProductDetails />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/admin/add-new-product" element={<PrivateRoute />}>
            <Route path="/admin/add-new-product" element={<AddProduct />} />
          </Route>
          <Route
            path="/admin/products/:product_id/edit"
            element={<PrivateRoute />}
          >
            <Route
              path="/admin/products/:product_id/edit"
              element={<EditProduct />}
            />
          </Route>
          <Route path="/admin/products" element={<PrivateRoute />}>
            <Route path="/admin/products" element={<ManageProducts />} />
          </Route>
          <Route path="/admin/orders" element={<PrivateRoute />}>
            <Route path="/admin/orders" element={<ManageOrders />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default Routing;
