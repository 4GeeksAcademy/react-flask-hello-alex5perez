import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-info">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          INICIO
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <>
              <Link to="/signup" className="btn btn-secondary me-2">
                Registro
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
