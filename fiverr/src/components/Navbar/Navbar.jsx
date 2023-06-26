import { useState } from "react";
import "./navbar.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { newRequest } from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auths/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div
          className={
            active || pathname !== "/"
              ? "logo nav-link-active"
              : "logo nav-link-inactive"
          }
        >
          <Link className="link" to="/">
            <span className={active ? " active text" : "text"}>fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className={active ? "active links " : "links"}>
          <span
            className={
              active || pathname !== "/" ? "link-span" : "link-span-inactive"
            }
          >
            Fiverr Business
          </span>
          <span
            className={
              active || pathname !== "/" ? "link-span" : "link-span-inactive"
            }
          >
            Explore
          </span>
          <span
            className={
              active || pathname !== "/" ? "link-span" : "link-span-inactive"
            }
          >
            English
          </span>

          {!currentUser?.isSeller && (
            <span
              className={
                active || pathname !== "/" ? "link-span" : "link-span-inactive"
              }
            >
              Become a Seller
            </span>
          )}
          {!currentUser ? (
            <Link className="link" to="/login">
              <span
                className={
                  active || pathname !== "/"
                    ? "link-span"
                    : "link-span-inactive"
                }
              >
                Sign in
              </span>
            </Link>
          ) : (
            <Link className="link" onClick={handleLogout}>
              <span
                className={
                  active || pathname !== "/"
                    ? "link-span"
                    : "link-span-inactive"
                }
              >
                Logout
              </span>
            </Link>
          )}
          {!currentUser && (
            <Link to="/register">
              <button
                className={
                  active || pathname !== "/"
                    ? "link-span btn primary navbar-btn"
                    : " btn primary"
                }
              >
                Join
              </button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/no-avatar.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link option" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link option" to="/add">
                        Add new Gig
                      </Link>
                    </>
                  )}
                  <Link className="link option" to="/orders">
                    Orders
                  </Link>
                  <Link className="link option" to="/messages">
                    Messages
                  </Link>
                  <Link className="link option" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphic & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link" to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
