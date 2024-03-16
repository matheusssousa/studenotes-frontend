import React from "react";
import ArtLogin from "../../../assets/Art/ArtLogin.svg"
import Logo from "../../../assets/Logo";

import { Link } from "react-router-dom";

export default function InicioUserPage() {
    return (
        <div className="page-body flex bg-neutro-100 flex-col sm:flex-row">
            <div className="w-full h-full md:w-1/2 xl:w-1/2 md:h-screen bg-neutro-600 flex items-center justify-center md:rounded-br-[90%] flex-col">
                <img src={ArtLogin} alt="Logo" className="w-[80%] select-none" />
            </div>
            <div className="w-full h-full md:w-1/2 xl:w-1/2 md:h-screen flex justify-center items-center flex-col gap-8 bg-cinzaClaro p-3 relative">
                <Logo cor={'azul'} tamanho={'grande'} />
                <div className="flex flex-col w-full md:w-1/2 xl:w-1/2 gap-4 items-center justify-between">
                    <div className="w-full flex gap-3 justify-center flex-col items-center">
                        <Link to='/login' className="text-xl w-1/3 rounded-md hover:drop-shadow-md py-1 duration-200 items-center justify-center text-center bg-azul-200 text-neutro-100">Login</Link>
                        <Link to='/register' className="text-xl w-1/3 rounded-md hover:drop-shadow-md py-1 duration-200 items-center justify-center text-center text-azul-200">Cadastrar</Link>
                    </div>
                </div>
            </div>
            {/* <div className="w-full flex fixed bottom-1 items-center justify-center">
                <div className="text-md md:text-md font-medium text-neutro-600 font-poppins select-none">
                    <p>matheus sousa</p>
                    <SocialMedia />
                </div>
            </div> */}
        </div>
    )
}