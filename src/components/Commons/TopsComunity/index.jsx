import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApiUser from "../../../services/ApiUser";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/Authenticate/AuthContext";
import ApiAdmin from "../../../services/ApiAdmin";

import "./style.css";

export default function TopsComunity({ setSearchDisciplina, searchDisciplina }) {
    const { user, admin } = useAuth();
    const [frameTop, setFrameTop] = useState('em-alta');
    const [emAlta, setEmAlta] = useState([]);
    const [maisCurtidos, setMaisCurtidos] = useState([]);
    const [maisComentados, setMaisComentados] = useState([]);

    const [loading, setLoading] = useState(true);

    const handleFrameTop = (frame) => {
        setLoading(true);
        setFrameTop(frame);
    }

    useEffect(() => {
        const receiveData = async (route) => {
            try {
                const api = admin ? ApiAdmin : ApiUser;
                const response = await api.get(`comunidade/${route}`);
                switch (route) {
                    case 'em-alta':
                        setEmAlta(response.data);
                        break;
                    case 'mais-curtidos':
                        setMaisCurtidos(response.data);
                        break;
                    case 'mais-comentados':
                        setMaisComentados(response.data);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        receiveData(frameTop);
    }, [frameTop]);

    const renderFrame = () => {
        switch (frameTop) {
            case 'em-alta':
                return (
                    <motion.div
                        key="emAlta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-between h-full gap-1"
                    >
                        {emAlta.disciplinas.map((item, index) => (
                            <button
                                onClick={() => setSearchDisciplina(searchDisciplina === item.id ? '' : item.id)}
                                key={index}
                                className={`btn-disciplina-top ${searchDisciplina === item.id && 'active-top-disciplina'}`}
                            >
                                <p className={searchDisciplina === item.id ? 'text-neutro-400 font-semibold' : 'dark:text-neutro-250 font-medium'}>{item.nome}</p>
                                <small className={searchDisciplina === item.id ? 'text-neutro-400 font-medium' : 'text-neutro-300'}>{item.anotacoes_count} anotações</small>
                            </button>
                        ))}
                    </motion.div>
                );
            case 'mais-curtidos':
                return (
                    <motion.div
                        key="maisCurtidos"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-between h-full gap-1"
                    >
                        {maisCurtidos.anotacoes.map((anotacao, index) => (
                            <Link to={`${user ? '' : '/admin'}/comunidade/view/${anotacao.id}`} className="btn-disciplina-top" key={index}>
                                <div className="flex flex-col items-start ">
                                    <p className="font-medium dark:text-neutro-100">{anotacao.nome}</p>
                                    {anotacao.disciplina && <small className="text-xs text-neutro-300">{anotacao.disciplina.nome}</small>}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                );
            case 'mais-comentados':
                return (
                    <motion.div
                        key="maisComentados"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-between h-full gap-1"
                    >
                        {maisComentados.anotacoes.map((anotacao, index) => (
                            <Link to={`${user ? '' : '/admin'}/comunidade/view/${anotacao.id}`} className="btn-disciplina-top" key={index}>
                                <div className="flex flex-col items-start ">
                                    <p className="font-medium dark:text-neutro-100">{anotacao.nome}</p>
                                    {anotacao.disciplina && <small className="text-xs text-neutro-300">{anotacao.disciplina.nome}</small>}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div className="tops-comunity">
            {/* <p className="w-full text-center font-medium text-azul-100">Tops Comunidade</p> */}
            <div className="header-top-comunity">
                <button type="button" onClick={() => handleFrameTop('em-alta')} className={`btn-content-top ${frameTop === 'em-alta' && 'ativo'}`}>
                    <p>Em alta</p>
                    {frameTop === 'em-alta' && <span className="btn-bar" />}
                </button>
                <button type="button" onClick={() => handleFrameTop('mais-curtidos')} className={`btn-content-top ${frameTop === 'mais-curtidos' && 'ativo'}`}>
                    <p>Mais curtidos</p>
                    {frameTop === 'mais-curtidos' && <span className="btn-bar" />}
                </button>
                <button type="button" onClick={() => handleFrameTop('mais-comentados')} className={`btn-content-top ${frameTop === 'mais-comentados' && 'ativo'}`}>
                    <p>Mais comentados</p>
                    {frameTop === 'mais-comentados' && <span className="btn-bar" />}
                </button>
            </div>
            <div className="bar-horizontal" />
            <AnimatePresence mode="wait">
                {loading ? '' : renderFrame()}
            </AnimatePresence>
        </motion.div>
    );
}