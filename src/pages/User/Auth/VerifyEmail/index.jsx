import React from "react";
import ApiUser from "../../../../services/ApiUser";
import { toast } from "react-toastify";
import ArtVerifyEmail from "../../../../assets/Art/ArtVerifyEmail.svg";

import './style.css';

export default function VerifyEmailUserPage() {
    const enviarDados = async (event) => {
        event.preventDefault();
        try {
            await ApiUser.post('/email/verification-notification')
            toast.success("Enviado email de verificação.", {
                theme: "colored",
            });
        } catch (error) {
            toast.error("Erro ao reenviar email de verificação.", {
                theme: "colored",
            });
        }
    }
    return (
        <div className="page-body flex flex-col md:flex-row">
            <div className="modal-login">
                <div className="flex flex-col gap-3 w-[80%] md:w-[50%]">
                    <h2 className="text-title-modal-login">Verificação de email</h2>
                    <p className="info">Antes de poder usar dos serviços disponíveis no STUDENOTES, é necessário a vericação do seu e-mail, confira o e-mail de verificação (Não esqueça de olhar a caixa de spam 😉).</p>
                    <p className="info">Caso não tenha recebido, clique no botão abaixo.</p>
                    <form onSubmit={enviarDados}>
                        <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center w-full">Reenviar e-mail</button>
                    </form>
                </div>
            </div>
            <div className="w-full md:h-full bg-neutro-600 justify-center items-center flex">
                <img src={ArtVerifyEmail} alt="ArtVerifyEmail" />
            </div>
        </div>
    )
}