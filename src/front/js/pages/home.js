import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import image from "../../img/logo.jpg";

export const Home = () => {
    return (
        <div className="container text-center my-5">
            <h2 className="mb-4">Sistema de Autenticación con Python, Flask y React.js</h2>
            <p>Por favor, inicia sesión o regístrate para continuar.</p>
			<img src={image} />
        </div>
    );
}