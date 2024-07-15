import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";

import "./style.css";
import ApiUser from "../../../services/ApiUser";
import { toast } from "react-toastify";
import LoadingMini from "../LoadingMini";

export default function OptionsGPT({ setOptions, titulo, disciplina, anotacao, setAnotacao, setGPT }) {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [perguntas, setPerguntas] = useState([]);

    const buttons = [
        {
            text: "Obter um resumo a partir do conteúdo.",
            disabled: !anotacao || anotacao.length < 400,
            option: "resumo",
        },
        {
            text: "Obter sugestão de conteúdo a partir do título.",
            disabled: !titulo || titulo.length < 10,
            option: "sugestao a partir do titulo",
        },
        {
            text: "Obter sugestão de conteúdo a partir da disciplina.",
            disabled: !disciplina,
            option: "sugestao a partir da disciplina",
        },
        {
            text: "Obter perguntas a partir do conteúdo.",
            disabled: !anotacao || anotacao?.length < 400,
            option: "perguntas",
        },
    ];

    const handleChatGPT = async (option) => {
        setLoading(true);
        let payload = { option };

        if (option === "resumo" || option === "perguntas") {
            if (!anotacao || anotacao.length < 400) {
                toast.error("Anotação é necessária e deve ter pelo menos 400 caracteres.");
                setLoading(false);
                return;
            }
            payload.anotacao = anotacao;
        }

        if (option === "sugestao a partir do titulo") {
            if (!titulo || titulo.length < 10) {
                toast.error("Título é necessário e deve ter pelo menos 10 caracteres.");
                setLoading(false);
                return;
            }
            payload.titulo = titulo;
        }

        if (option === "sugestao a partir da disciplina") {
            if (!disciplina) {
                toast.error("Disciplina é necessária.");
                setLoading(false);
                return;
            }
            payload.disciplina = disciplina;
        }

        try {
            const response = await ApiUser.post('/chat', payload);
            console.log(response);
            if (option === "perguntas") {
                setPerguntas(response.data.choices[0].message.content);
            } else {
                setAnotacao(response.data.choices[0].message.content);
            }
            setGPT(true);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Erro ao tentar obter sugestão de conteúdo.");
        }
        setLoading(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOptions]);

    return (
        <motion.div
            ref={ref}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: '50%', height: 170, opacity: 1, transition: { duration: 0.2 } }}
            exit={{ width: 0, height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="options-gpt-container"
        >
            {loading ? <LoadingMini /> : perguntas.length > 0 ? (
                <div className="text-xs dark:text-neutro-100">
                    {perguntas}
                </div>
            ) : (
                buttons.map((button, index) => (
                    <motion.button
                        key={index}
                        type="button"
                        className={`btn-default text-xs ${button.disabled ? "disabled" : ""}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: index * 0.1 } }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={button.disabled}
                        onClick={() => handleChatGPT(button.option)}
                    >
                        <Sparkle size={16} weight="fill" />
                        {button.text}
                    </motion.button>
                ))
            )}
        </motion.div>
    );
}
