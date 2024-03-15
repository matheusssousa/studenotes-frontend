import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ArtForgotPassword from "../../../../assets/Art/ArtForgotPassword.svg";
import { checkPassword } from "../../../../hooks/Validation/ValidationPassword";
import { toast } from "react-toastify";
import ApiAdmin from "../../../../services/ApiAdmin";

export default function ResetPasswordAdminPage() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const params = useParams();

    if (navigate) {
        return <Navigate to="/admin" />;
    }

    const enviarDados = async (event) => {
        event.preventDefault();
        const passwordValidation = checkPassword(password);
        if (!passwordValidation.valid) {
            passwordValidation.messages.forEach((message) => {
                toast.error(message, {
                    theme: "colored"
                });
            });
            return;
        }
        if (password !== passwordConfirm) {
            return toast.error("As senhas não conferem.", {
                theme: "colored"
            });
        }

        try {
            ApiAdmin.post(``, {
                token: params.token,
                email: email,
                password: password,
                password_confirmation: passwordConfirm,
            });
            toast.success("Senha alterada com sucesso!", {
                theme: "colored"
            });
            setNavigate(true);
        } catch (error) {
            toast.error("Erro ao alterar senha. Verifique e tente novamente.", {
                theme: "colored"
            });
        }
    }

    return (
        <div className="page-body flex flex-col md:flex-row">
            <div className="w-full md:h-full bg-neutro-500 justify-center items-center flex">
                <img src={ArtForgotPassword} alt="ArtForgotPassword" />
            </div>
            <div className="modal-forgot-password">
                <h2 className="text-title-modal-login">Cadastrar nova senha</h2>
                <form onSubmit={enviarDados} className="form-modal-forgot-password">
                    <div className="flex flex-col gap-3 w-[80%] md:w-[50%]">
                        <span className="input-group-login">
                            <label htmlFor="email" className="label-login">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" required />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-login" required />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Confirmar Senha</label>
                            <input type="password" name="passwordConfirm" id="passwordCofirm" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} className="input-login" required />
                        </span>
                        <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center" >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}