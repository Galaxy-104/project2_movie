import React, { useState,useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

import Match from "../components/Match";
import Player from "../components/Player";
import TimeBar from "../components/Timebar";
import WinnerPlayer from "../components/WinnerPlayer";
import LoadingPage from "../components/LoadingPage";

import '../styles/Tournament.css'

const tournamentMovies = []
const playerList = []

function Tournament(){

    const [ loading, setLoading ] = useState(false)
    const [ isVisible, setIsVisible ] = useState(true)

    const [ match, setMatch ] = useState([])
    const [ movies, setMovies ] = useState([])
    const [ winners, setWinners ] = useState([])

    const [ winner, setWinner ] = useState([])
    const [ winnerMoviesGenre, setWinnerMoivesGenre ] = useState([])
    const [ counter, setCounter ] = useState(16)

    const [ matchIndex, setMatchIndex ] = useState(0)

    useEffect(() => {

        if(!loading){
            fetch('/api/Tournament.json')
            .then( res => res.json() )
            .then( data => {

                data.map((movie) => {
                    tournamentMovies.push(movie)
                    playerList.push(movie.movies[Math.floor(Math.random() * movie.movies.length)])
                })

            }).then(() => setLoading(true))
        }else{
            playerList.sort(() => Math.random() - 0.5)
            setMovies([...playerList])
            setMatch([playerList[0], playerList[1]])
            console.log("log: 로딩 완료")
        }
        
    }, [loading])
    
    const [ direction, setDirection ] = useState("")
    const [ isSelected, setIsSelected ] = useState(false)
    const [ round, setRound ] = useState(16)
    const [ quarter, setQuarter ] = useState([])

    const selectLeft = () => {
        console.log("왼쪽 선택")
        setDirection("left")
        setIsSelected(true)
        setRound(round - 1)        
    }

    const selectRight = () => {
        console.log("오른쪽 선택")
        setDirection("right")
        setIsSelected(true)
        setRound(round - 1)    
    }

    useEffect(() => {

        if(isSelected){
            setMatchIndex(matchIndex + 2)
        }

    }, [isSelected])

    useEffect(() => {
        setIsSelected(false)
    }, [matchIndex])

    if(loading){

        return (
            <div className="tournament-page">
                {console.log("log: 렌더링 완료", movies)}
                <TimeBar counter={counter}/>
                <motion.div 
                    className="match-container"
                    key="match-container"
                >
                    {movies.length === 0? 
                    <LoadingPage/>
                     :
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            className="match-left"
                            whileHover={isSelected? "" : { scale: 1.1 }}
                            initial={isSelected? "" :{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={isSelected? 
                                direction === "left"?
                                { x: 400, opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } : 
                                ""
                            }
                            transition={isSelected && direction === "left"? { duration: 1 } : { duration: 0.4 }}

                            key={`tounament-${movies[matchIndex].id}`}
                        >
                            <Player player={movies[matchIndex]} handleClick={selectLeft} direction={0} isVisible={isVisible}/>
                        </motion.div>
                    
                        <motion.div 
                            className="match-right"
                            whileHover={isSelected? "" : { scale: 1.1}}
                            initial={isSelected? "" : { y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={isSelected?
                                direction === "right"?
                                { x: -400, opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } :
                                ""
                            }
                            transition={isSelected && direction === "right"? { duration: 1 } : { duration: 0.4 }}
                            
                            key={`tounament-${movies[matchIndex + 1].id}`}
                        >
                            <Player player={movies[matchIndex + 1]} handleClick={selectRight} direction={1} isVisible={isVisible}/>
                        </motion.div>
                    </AnimatePresence>
                    }
                   
                </motion.div>

            </div>
            
        )
    }else{
        return <LoadingPage/>
    }
    
}

export default Tournament