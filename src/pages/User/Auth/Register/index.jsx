import React, { useState } from "react";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import { toast } from "react-toastify";
import { checkPassword } from "../../../../hooks/Validation/ValidationPassword";
import ApiUser from "../../../../services/ApiUser";
import Logo from "../../../../assets/Logo";

import "./style.css";

export default function RegisterUserPage() {
    const { LoginUser } = useAuth();
    const [name, setName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [passwordConfirmed, setPasswordConfirmed] = useState(undefined);

    const CadastrarDados = async (event) => {
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
        if (password !== passwordConfirmed) {
            toast.error("As senhas não conferem.", {
                theme: "colored"
            });
            return;
        }

        try {
            await ApiUser.post('/auth/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmed,
            });
            toast.success("Cadastro realizado com sucesso! Foi enviado um e-mail de verificação para o seu endereço de e-mail.", {
                theme: "colored"
            });
            LoginSistema(event);
        } catch (error) {
            if (error.response.data.message === "The email has already been taken.") {
                toast.error("Este e-mail já foi cadastrado.", {
                    theme: "colored"
                });
                return;
            }
            toast.error("Erro ao cadastrar. Verifique os dados e tente novamente.", {
                theme: "colored"
            });
        }
    }

    const LoginSistema = async (event) => {
        event.preventDefault();
        try {
            await LoginUser({
                email: email,
                password: password,
            });
        } catch (error) { }
    }

    return (
        <div className="page-body flex flex-col md:flex-row">
            <div className="w-full md:h-full bg-azul-200 justify-center items-center flex">
                <Logo cor={'branco'} tamanho={'grande'} />
            </div>
            <div className="w-full md:h-full flex items-center justify-center gap-12 flex-col bg-neutro-100">
                <h2 className="text-title-modal-login">Cadastrar</h2>
                <form onSubmit={CadastrarDados} className="form-modal-register">
                    <div className="flex flex-col gap-3 w-[80%] md:w-[50%]">
                        <span className="input-group-login">
                            <label htmlFor="name" className="label-login">Nome</label>
                            <input type="text" name="name" id="name" value={name} onChange={(event) => setName(event.target.value)} className="input-login" required />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="email" className="label-login">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" required />
                        </span>
                        <span className="input-group-login">
                            <label htmlFor="password" className="label-login">Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-login" required />
                        </span>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 ml-2 text-start">A senha deve conter mais de 8 caracteres.</p>
                            <p className="text-xs font-semibold text-gray-500 ml-2 text-start">A senha deve conter ao menos um caractere especial.</p>
                            <p className="text-xs font-semibold text-gray-500 ml-2 text-start">A senha deve conter ao menos um caractere maiúsculo.</p>
                        </div>
                        <span className="input-group-login">
                            <label htmlFor="password_confirm" className="label-login">Confirmar Senha</label>
                            <input type="password" name="password_confirm" id="password_confirm" value={passwordConfirmed} onChange={(event) => setPasswordConfirmed(event.target.value)} className="input-login" required />
                        </span>
                    </div>
                    <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center w-[80%] md:w-[50%]">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}