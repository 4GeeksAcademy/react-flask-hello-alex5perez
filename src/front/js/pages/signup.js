import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.BACKEND_URL + "/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                navigate("/login");
            } else {
                const errorData = await response.json();
                console.error("Error en el registro:", errorData.msg || "No se especificó un mensaje de error");
            }
        } catch (error) {
            console.error("Error al conectarse al servidor:", error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="container">
                <h2 className="text-center mb-4">Registro</h2>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    Registrarse
                </button>
            </form>
        </div>
    );
};
