import React from "react";
import { motion } from "framer-motion"

function LoadingPage(){
    const textContainer = {
        start: { strokeDashoffset: 50, fill: "rgba(255, 255, 255, 0)" },
        end: {
            strokeDashoffset: 0, 
            fill: "rgba(255, 255, 255, .7)",
            transition: {
                when: "beforeChildren",
                staggerChildren: .5
            }            
        }
    };
    const textContents = {
        start: { x: 1, fill: "rgba(255, 255, 255, 0)" },
        end: { x: 0, fill: "rgba(255, 255, 255, 1)"}
    }

    return(
        <div className="loading">
            <motion.svg 
                viewBox="0 0 300 300"
                width="40rem"
                height="30rem"
                variants={textContainer}
                initial="start"
                animate="end"
                strokeWidth=".7"
                transition={{ default: { duration: 0.3, repeat: Infinity }}}
                
            >
                <motion.text x="0" y="160" variants={textContents}>L</motion.text>
                <motion.text x="40" y="160" variants={textContents}>o</motion.text>
                <motion.text x="83" y="160" variants={textContents}>a</motion.text>
                <motion.text x="124" y="160" variants={textContents}>d</motion.text>
                <motion.text x="166" y="160" variants={textContents}>i</motion.text>
                <motion.text x="185" y="160" variants={textContents}>n</motion.text>
                <motion.text x="226" y="160" variants={textContents}>g</motion.text>
                <motion.text x="266" y="160" variants={textContents}>.</motion.text>
                <motion.text x="284" y="160" variants={textContents}>.</motion.text>
                <motion.text x="302" y="160" variants={textContents}>.</motion.text>
                
            </motion.svg>
        </div>
    )
}

export default LoadingPage