import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import { Link } from "react-router-dom";

import "./style.css";
import Logo from "../../../../assets/Logo";

export default function LoginUserPage() {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const { LoginUser } = useAuth();

    const enviarDados = async (event) => {
        event.preventDefault();
        try {
            await LoginUser({
                email: email,
                password: password,
            });
        } catch (error) {
            setPassword('');
        }
    };

    return (
        <div className="page-body flex flex-col md:flex-row">
            <div className="modal-login">
                <form onSubmit={enviarDados} className="form-modal-login">
                    <h1 className="text-title-modal-login">Login</h1>
                    <div className="flex flex-col gap-3 w-[80%] md:w-[50%]">
                        <span className="input-group-login">
                            <label htmlFor="email" className="label-login">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-login" />
                        </span>
                        <Link to="/forgotpassword" className="link-login">Esqueceu a senha?</Link>
                    </div>
                    <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center w-[80%] md:w-[50%]">Entrar</button>
                </form>
            </div>
            <div className="w-full h-1/3 md:w-1/2 xl:w-1/2 md:h-screen bg-azul-200 justify-center items-center flex">
                <Logo cor={'branco'} tamanho={'grande'} />
            </div>
        </div>
    )
}