import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import { Link } from "react-router-dom";

export default function LoginAdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { LoginAdmin } = useAuth();

    const enviarDados = async (event) => {
        event.preventDefault();
        try {
            await LoginAdmin({
                email: email,
                password: password,
            });
        } catch (error) {
            toast.error("Email e/ou senha inválidos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            setPassword('');
        }
    };

    return (
        <div className="page-body flex items-center justify-center">
            <div className="modal-login">
                <h1 className="text-title-modal-login">Login Admin</h1>
                <form onSubmit={enviarDados} className="form-modal-login">
                    <div className="flex flex-col gap-3 w-[80%]">
                        <span className="input-group-login">
                            <label htmlFor="email" className="label-login">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-login" />
                        </span>
                        <Link to="/admin/forgot-password" className="link-login">Esqueceu a senha?</Link>
                    </div>
                    <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center w-[80%]">Entrar</button>
                </form>
            </div>
        </div>
    )
}