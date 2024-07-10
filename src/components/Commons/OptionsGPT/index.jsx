import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./style.css";

export default function OptionsGPT({ setOptions }) {
    const ref = useRef(null);
    const [option, setOption] = useState(null);

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
            animate={{ width: '40%', height: 250, opacity: 1, transition: { duration: 0.2 }}}
            exit={{ width: 0, height: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="options-gpt-container">
                
        </motion.div>
    );
}