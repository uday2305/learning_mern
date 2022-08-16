import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { cartActions, redirectActions } from "../redux/actions";
import { connect, useSelector } from "react-redux";

function Header(props) {
  const location = useLocation();
  //Only re-run the effect if location changes
  useEffect(() => {
    props.clearRedirects();
  }, [location]);

  const cart = useSelector((state) => state.getCartItems);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Shop24x7
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Products"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-secondary visually-hidden"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>

            <ul className="navbar-nav me-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-item btn btn-warning position-relative"
                  role="button"
                >
                  <span className="fs-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>
                  {cart && cart.items && cart?.items?.length !== 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">Items</span>
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              {props.user ? (
                props.user.isAdmin ? (
                  <li className="nav-item dropdown me-5">
                    <Link
                      className="nav-link dropdown-toggle fs-4"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {props.user?.firstName}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Manage Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orders">
                          Manage Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/users">
                          Manage Users
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/products">
                          Manage Products
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item dropdown me-5">
                    <Link
                      className="nav-link dropdown-toggle fs-4"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {props.user?.firstName}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Manage Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-item ms-3 btn btn-warning"
                    role="button"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function mapState(state) {
  let { user } = state.userAuthentication;
  return { user };
}

const actionCreators = {
  clearRedirects: redirectActions.redirectSuccess,
  getCartItems: cartActions.getCartItems,
};

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };
