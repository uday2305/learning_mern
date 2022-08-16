import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

import { Login } from "./pages/userLogin";
import { Register } from "./pages/registration";
import { Profile } from "./pages/userProfile";
import { CheckOut } from "./pages/checkout";

import { HomePage } from "./pages/home";
import { Cart } from "./pages/cart";
import { Orders, OrderDetails, ManageOrders } from "./pages/orderManagement";
import { Logout } from "./pages/logout/Logout";
import { ProductCategories } from "./pages/categories";
import { ProductDetails } from "./pages/productDetails";
import {
  AddProduct,
  EditProduct,
  ManageProducts,
} from "./pages/productManagement";
import { ManageUsers, AddUser, EditUser } from "./pages/userManagement";

import { PrivateRoute, PrivateAdminRoute } from "./helperComponents";
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
          <Route path="/admin/add-new-product" element={<PrivateAdminRoute />}>
            <Route path="/admin/add-new-product" element={<AddProduct />} />
          </Route>
          <Route
            path="/admin/products/:product_id/edit"
            element={<PrivateAdminRoute />}
          >
            <Route
              path="/admin/products/:product_id/edit"
              element={<EditProduct />}
            />
          </Route>
          <Route path="/admin/add-new-user" element={<PrivateAdminRoute />}>
            <Route path="/admin/add-new-user" element={<AddUser />} />
          </Route>
          <Route
            path="/admin/users/:user_id/edit"
            element={<PrivateAdminRoute />}
          >
            <Route path="/admin/users/:user_id/edit" element={<EditUser />} />
          </Route>
          <Route path="/admin/products" element={<PrivateAdminRoute />}>
            <Route path="/admin/products" element={<ManageProducts />} />
          </Route>
          <Route path="/admin/users" element={<PrivateAdminRoute />}>
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>
          <Route path="/admin/orders" element={<PrivateAdminRoute />}>
            <Route path="/admin/orders" element={<ManageOrders />} />
          </Route>
          <Route path="/orders" element={<PrivateRoute />}>
            <Route path="/orders" element={<Orders />}></Route>
          </Route>
          <Route path="/orders/:order_id" element={<PrivateRoute />}>
            <Route path="/orders/:order_id" element={<OrderDetails />}></Route>
          </Route>
          <Route path="/logout" element={<PrivateRoute />}>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default Routing;
