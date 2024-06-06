import React, { useState } from "react";
import { motion } from "framer-motion";

import "./style.css";

export default function OptionsGPT({ options, setOptions }) {
    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }} 
            exit={{ scale: 0.5 }}
            className="options-gpt-container">

        </motion.div>
    );
}