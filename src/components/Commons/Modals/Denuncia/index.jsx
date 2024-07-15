import React, { useState } from "react";
import { motion } from "framer-motion";
import ApiUser from "../../../../services/ApiUser";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify"
import '../modal.css';

const options = [
    { value: 'Spam', label: 'Spam' },
    { value: 'Conteudo Abusivo', label: 'Conteúdo Abusivo' },
    { value: 'Conteudo Inapropriado', label: 'Conteúdo Inapropriado' },
    { value: 'Linguagem Impropria', label: 'Linguagem Imprópria' },
];

export default function ModalDenuncia({ denunciado_id, denunciado_type, close }) {
    const [motivo, setMotivo] = useState([]);
    const [observacao, setObservacao] = useState("");

    const handleCheckboxChange = (value) => {
        setMotivo((prevMotivo) =>
            prevMotivo.includes(value)
                ? prevMotivo.filter((item) => item !== value)
                : [...prevMotivo, value]
        );
    };

    const handleDenunciar = async (e) => {
        e.preventDefault();
        try {
            await ApiUser.post(`/denuncia`, { denunciado_id, denunciado_type, motivo, observacao });
            close(false);
            toast.info("Denuncia enviada com sucesso!", { theme: 'colored' })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleDenunciar} className="flex items-center justify-center w-full h-full absolute top-0 left-0">
            <motion.div
                className="overlay-anotacao"
                onClick={() => close(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ pointerEvents: "auto" }}
            />
            <motion.div
                className="modal-anotacao"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}>
                <div className="content-header-modal-anotacao">
                    <div className="w-[10%] sm:w-[5%]" />
                    <div className="flex justify-center flex-col items-center">
                        <p className="font-medium dark:text-neutro-100 text-center">Denunciar</p>
                    </div>
                    <div className="w-[10%] sm:w-[5%] flex justify-end">
                        <button onClick={() => close(false)} className="button-close-modal-anotacao">
                            <X size={16} weight="bold" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="input-label mb-3">Motivo</p>
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center mb-4 text-xs">
                                <input
                                    id={option.value}
                                    type="checkbox"
                                    value={option.value}
                                    checked={motivo.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)}
                                    className="w-4 h-4 text-azul-200 bg-neutro-100 border-neutro-300 rounded-md focus:ring-azul-200 dark:focus:ring-azul-200 dark:ring-offset-neutro-600 focus:ring-2 dark:bg-neutro-500 dark:border-neutro-600 "
                                />
                                <label htmlFor={option.value} className="ms-2 text-neutro-600 dark:text-neutro-200">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex-col flex">
                        <label htmlFor="observacao" className="input-label">Acrescente uma observação se desejar</label>
                        <textarea name="observaca" id="observacao" value={observacao} onChange={(event) => setObservacao(event.target.value)} className="input-search-date max-h-20"></textarea>
                    </div>
                </div>
                <div className="line-horizontal" />
                <div className="content-footer-modal-anotacao justify-end">
                    <button className="button-visualizar-anotacao" type="submit">
                        <p>Confirmar denuncia</p>
                    </button>
                </div>
            </motion.div>
        </form>
    );
}
