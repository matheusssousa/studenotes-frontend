import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/Logo";

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
        <div className="page-body flex flex-col md:flex-row">
            <div className="modal-login">
                <form onSubmit={enviarDados} className="form-modal-login">
                    <span className="flex flex-col gap-2">
                        <h1 className="text-title-modal-login">Login</h1>
                        <h2 className="subtitle-modal-login">ACESSO ADMINISTRADOR</h2>
                    </span>
                    <div className="flex flex-col gap-3 w-[80%] md:w-[50%]">
                        <span className="input-group-login">
                            <label htmlFor="email" className="label-login">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-login" />
                        </span>
                        <Link to="/admin/forgotpassword" className="link-login">Esqueceu a senha?</Link>
                    </div>
                    <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center w-[80%] md:w-[50%]">Entrar</button>
                </form>
            </div>
            <div className="w-full md:h-full bg-azul-200 justify-center items-center flex">
                <Logo cor={'branco'} tamanho={'grande'} />
            </div>
        </div>
    )
}