import React, { useState } from "react";
import { motion } from "framer-motion"

import Player from "./Player";
import '../styles/Match.css'

function Match({ match, handleClick, isVisible, isMatch }){

    return (
        <div className="match-container" >
            <motion.div className="match-left"
                whileHover={{ scale: 1.1 }}
            >
                <Player player={match[0]} handleClick={handleClick} direction={0} isVisible={isVisible} isMatch={isMatch}/>
            </motion.div>
            <motion.div className="match-right"
                whileHover={{ scale: 1.1 }}
            >
                <Player player={match[1]} handleClick={handleClick} direction={1} isVisible={isVisible} isMatch={isMatch}/>
            </motion.div>
        </div>
    )
}

export default Match