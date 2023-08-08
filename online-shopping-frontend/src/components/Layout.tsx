import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserAlt } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";

const Layout = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSalesman, setIsSalesman] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    setUserLoggedIn();
    setCustomer();
    setAdmin();
    setSalesman();
    setApproved();
  }, []);

  const setUserLoggedIn = () => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("username") !== null &&
      localStorage.getItem("role") !== null &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("status") !== null
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const setCustomer = () => {
    if (localStorage.getItem("role") == "Customer") {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    }
  };

  const setAdmin = () => {
    if (localStorage.getItem("role") == "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const setSalesman = () => {
    if (localStorage.getItem("role") == "Salesman") {
      setIsSalesman(true);
    } else {
      setIsSalesman(false);
    }
  };

  const setApproved = () => {
    if (localStorage.getItem("status") == "Approved") {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  };

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("status");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-sm bg-body-tertiary navbar-dark bg-dark">
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={{ display: "inline-block" }}
        >
          <ul className="navbar-nav text-center">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <div className="row">
                    <div className="col">
                      <b className="text-light">Registration</b>
                    </div>
                    <div className="col">
                      <FaUserPlus size="25" color="#5cb85c" />
                    </div>
                  </div>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <div className="row">
                    <div className="col">
                      <b className="text-light">Login</b>
                    </div>
                    <div className="col">
                      <RiLoginBoxFill
                        size="25"
                        color="#5cb85c"
                        style={{ marginRight: "3%" }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <b className="text-success">Profile</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isSalesman && isApproved && (
              <li className="nav-item">
                <Link className="nav-link" to="/addArticle">
                  <b className="text-success">Articles</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isCustomer && (
              <li className="nav-item">
                <Link className="nav-link" to="/newOrder">
                  <b className="text-success">Add Order</b>
                </Link>
              </li>
            )}
            {isLoggedIn && (isCustomer || isSalesman) && isApproved && (
              <li className="nav-item">
                <Link className="nav-link" to="/previousOrders">
                  <b className="text-success">Previous Orders</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/verification">
                  <b className="text-success">Verifications</b>
                </Link>
              </li>
            )}
            {isLoggedIn && (isCustomer || isSalesman) && isApproved && (
              <Link className="nav-link" to="/newOrders">
                <b className="text-success">New Orders</b>
              </Link>
            )}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/allOrders">
                  <b className="text-success">Orders</b>
                </Link>
              </li>
            )}
          </ul>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav justify-content-end">
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={logOut}>
                    <b className="text-success">Log Out</b>
                  </Link>
                </li>
              )}
              <Link className="nav-link" to="/*"></Link>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
