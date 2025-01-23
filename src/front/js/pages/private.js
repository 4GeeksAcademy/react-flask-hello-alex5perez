import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import image from "../../img/logo.jpg";

export const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await actions.private();
            if (!isValid) {
                navigate("/login");
            }
        };
        validateToken();
    }, []);

    return (
            <div className="container text-center my-5">
                <h2 className="mb-4">Bienvenido, estas dentro!</h2>
                <p>Sistema de Autenticación con Python, Flask y React.js</p>
                <img src={image} />
            </div>
        );
};
