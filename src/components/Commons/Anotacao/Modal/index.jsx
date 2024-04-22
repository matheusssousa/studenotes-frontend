import React from "react";
import { motion } from "framer-motion";

import './style.css';

export default function ModalAnotacao(params) {

    return (
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
            <motion.div
                className="overlay-anotacao"
                onClick={() => params.setSelectedAnotacao(null)}
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
                transition={{ duration: 0.2 }}
            >
            </motion.div>
        </div>
    )
}