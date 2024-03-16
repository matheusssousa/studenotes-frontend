import React, { useState } from "react";
import ApiAdmin from "../../../../services/ApiAdmin";
import ArtForgotPassword from "../../../../assets/Art/ArtForgotPassword.svg"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

export default function ForgotPasswordAdminPage() {
    const [email, setEmail] = useState(null);
    const [disable, setDisable] = useState(false);

    const enviarDados = async (event) => {
        event.preventDefault();
        setDisable(true);
        try {
            const response = await ApiAdmin.post('/reset/forgotpassword', { email: email });
            if (response.data.message === 'Deu errado') {
                return toast.error("Não foi possível enviar o e-mail para recuperação de sua senha, aguarde alguns minutos e tente novamente.", {
                    theme: 'colored',
                });
            }
            if (response.data.message === 'Deu certo') {
                return toast.success("Enviado e-mail de recuperação de senha.", {
                    theme: 'colored',
                });
            }
            setTimeout(() => {
                setDisable(false);
            }, 30000);
        } catch (error) {
            setTimeout(() => {
                setDisable(false);
            }, 30000);
        }
    }

    return (
        <div className="page-body flex flex-col md:flex-row">
            <Link to='/admin' className="button-back" title="Voltar"><CaretLeft size={20}/></Link>
            <div className="modal-forgot-password">
                <h2 className="text-title-modal-login">Recuperar Senha</h2>
                <form onSubmit={enviarDados} className="form-modal-forgot-password">
                    <div className="flex flex-col gap-8 w-[80%] md:w-[50%]">
                        <span className="input-group-login gap-5">
                            <label htmlFor="email" className="label-forgot-password text-center">Vixe!! Esqueceu a sua senha?!<br></br>Não se preocupe, daremos um jeitinho de te ajudar. Para que seja possível a recuperação da sua senha, informe o seu e-mail no campo abaixo</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input-login" placeholder="E-mail" required/>
                        </span>
                        <button type="submit" className="py-2 rounded-md text-neutro-100 duration-300 bg-azul-200 hover:bg-azul-300 hover:shadow-lg text-center" disabled={disable}>{disable ? 'Aguarde' : 'Enviar'}</button>
                    </div>
                </form>
            </div>
            <div className="w-full h-full md:w-1/2 xl:w-1/2 md:h-screen bg-neutro-500 justify-center items-center hidden md:flex">
                <img src={ArtForgotPassword} alt="ArtForgotPassword" />
            </div>
        </div>
    )
}