import React, { useState,useEffect } from "react";
import { useAsyncError, useInRouterContext, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "react-responsive"

import Match from "../components/Match";
import Player from "../components/Player";
import TimeBar from "../components/Timebar";
import WinnerPlayer from "../components/WinnerPlayer";
import LoadingPage from "../components/LoadingPage";

import '../styles/Tournament.css'
import Logo from "../assets/logo.png"

const tournamentMovies = []
const playerList = []

function Tournament(){

    
    const isDesktop = useMediaQuery({ query: "(min-width: 1001px)" })
    const isTablet = useMediaQuery({ query: "(max-width: 1000px)" && "(min-width: 420px)" })
    const isSmallTablet = useMediaQuery({ query: "(max-width: 819px)" })
    const isMobile = useMediaQuery({ query: "(max-width: 419px)" && "(min-width: 281px)" })
    const isSmallMobile = useMediaQuery({ query: "(max-width: 380px)" })
    const isFold = useMediaQuery({ query: "(max-width: 280px)" })

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
            // console.log("log: 로딩 완료")
        }
        
    }, [loading])

    const [ direction, setDirection ] = useState("")
    const [ isSelected, setIsSelected ] = useState(false)

    const [ quarter, setQuarter ] = useState([])
    const [ isQuarter, setIsQuarter ] = useState(false)
    const [ semi, setSemi ] = useState([])
    const [ isSemi, setIsSemi ] = useState(false)
    const [ final, setFinal ] = useState([])
    const [ isFinal, setIsFinal ] = useState(false)

    const selectLeft = () => {
        // console.log("왼쪽 선택")
        setDirection("left")
        setIsSelected(true)
        setCounter(counter - 1)
    }

    const selectRight = () => {
        // console.log("오른쪽 선택")
        setDirection("right")
        setIsSelected(true)
        setCounter(counter - 1)
    }

    useEffect(() => {

        if(isSelected){
            setMatchIndex(matchIndex + 2)
            if(!isQuarter){
                if(direction === "left"){
                    setQuarter([...quarter, movies[matchIndex]])
                }else if(direction === "right"){
                    setQuarter([...quarter, movies[matchIndex + 1]])
                }
            }else if(!isSemi){
                if(direction === "left"){
                   setSemi([...semi, movies[matchIndex]])
                }else if(direction === "right"){
                   setSemi([...semi, movies[matchIndex + 1]])
                }
            }else if(!isFinal){
                if(direction === "left"){
                    setFinal([...final, movies[matchIndex]])
                 }else if(direction === "right"){
                    setFinal([...final, movies[matchIndex + 1]])
                 }
            }else{
                if(direction === "left"){
                    setWinner([movies[matchIndex]])
                 }else if(direction === "right"){
                    setWinner([movies[matchIndex + 1]])
                 }
            }
        }
            
    }, [isSelected])

    useEffect(() => {
        setIsSelected(false)
    }, [matchIndex])

    useEffect(() => {
        if(counter === 8){
            setIsQuarter(true)
            setMatchIndex(0)
        }else if(counter === 4){
            setIsSemi(true)
            setMatchIndex(0)
        }else if(counter === 2){
            setIsFinal(true)
            setMatchIndex(0)
        }
    }, [counter])

    useEffect(() => {
        if(isQuarter){
            setMovies([...quarter])
        }else if(isSemi){
            setMovies([...semi])
        }else if(isFinal){
            setMovies([...final])
        }
    }, [isQuarter, isSemi, isFinal])

    const navigate = useNavigate()
    const moveToResult = () => navigate('/result', { state: {winner, result: winnerMoviesGenre}})

    useEffect(() => {
        if(isFinal && winner.length === 1){
            const filterMovies = tournamentMovies.filter((movie) => {
                const findMv = movie.movies.find((mv) => {
                     if(mv.id === winner[0].id){
                         return mv
                     }
                 })
                 return findMv !== undefined
            })
            // console.log(filterMovies)
            fetch('http://127.0.0.1:5201/api/result'
            ,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: filterMovies[0].code
                })
            })
            setWinnerMoivesGenre([...filterMovies])
        }

    }, [winner])

    useEffect(() => {
        if(isFinal){
           setTimeout(moveToResult, 1000) 
        }
    }, [winnerMoviesGenre])

    const gohome = () => {
        navigate('/login')
        // navigate('/home', {state: {genres: winner[0].genre_ids}})
    }

    if(isDesktop){
        if(loading){
            return (
                <div className="tournament-page">
                    {winner.length === 1?
                        <WinnerPlayer player={winner[0]}/> :
                    <>  
                        {/* {console.log(counter, matchIndex)} */}
                        <TimeBar counter={counter}/>
                        <motion.div 
                            className="match-container"
                            key="match-container"
                        >
                            {movies.length === 0? 
                            <LoadingPage/>
                            :
                            <AnimatePresence exitBeforeEnter>
                                {console.log(match)}
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
                    </>
                }   
                </div>
                
            )
        }else{
            return <LoadingPage/>
        }
    }else if(isTablet){
        if(loading){
            return (
                <div className={`tablet-tournament-page ${isSmallTablet? "small" : ""}`}>
                    {winner.length === 1?
                        <WinnerPlayer player={winner[0]}/> :
                    <>  
                        {/* {console.log(counter, matchIndex)} */}
                        <TimeBar counter={counter}/>
                        <motion.div 
                            className="match-container"
                            key="match-container"
                        >
                            {movies.length === 0? 
                            <LoadingPage/>
                            :
                            <AnimatePresence exitBeforeEnter>
                                {console.log(match)}
                                <motion.div
                                    className="match-left"
                                    whileHover={isSelected? "" : { scale: 1.1 }}
                                    initial={isSelected? "" :{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={isSelected? 
                                        direction === "left"?
                                        { opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } : 
                                        ""
                                    }
                                    transition={{ duration: 0.4 }}

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
                                        { opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } :
                                        ""
                                    }
                                    transition={{ duration: 0.4 }}
                                    
                                    key={`tounament-${movies[matchIndex + 1].id}`}
                                >
                                    <Player player={movies[matchIndex + 1]} handleClick={selectRight} direction={1} isVisible={isVisible}/>
                                </motion.div>
                            </AnimatePresence>
                            }
                            
                        </motion.div>
                        
                        <motion.div className="move-to-login">
                            <motion.button className="mood-join-btn" onClick={gohome}>
                                <img src={Logo} alt="logo"/>
                            </motion.button>
                        </motion.div>
                    </>
                }   
                </div>
                
            )
        }else{
            return <LoadingPage/>
        }
    }else if(isMobile){
        if(loading){
            return (
                <div className={`mobile-tournament-page ${isSmallMobile? "small" : ""}`}>
                    {winner.length === 1?
                        <WinnerPlayer player={winner[0]}/> :
                    <>  
                        {/* {console.log(counter, matchIndex)} */}
                        <TimeBar counter={counter}/>
                        <motion.div 
                            className="match-container"
                            key="match-container"
                        >
                            {movies.length === 0? 
                            <LoadingPage/>
                            :
                            <AnimatePresence exitBeforeEnter>
                                {console.log(match)}
                                <motion.div
                                    className="match-left"
                                    whileHover={isSelected? "" : { scale: 1.1 }}
                                    initial={isSelected? "" :{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={isSelected? 
                                        direction === "left"?
                                        { opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } : 
                                        ""
                                    }
                                    transition={{ duration: 0.4 }}

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
                                        { opacity: 1, scale: 1.1 } : { y: 50, opacity: 0, scale: 0.9 } :
                                        ""
                                    }
                                    transition={{ duration: 0.4 }}
                                    
                                    key={`tounament-${movies[matchIndex + 1].id}`}
                                >
                                    <Player player={movies[matchIndex + 1]} handleClick={selectRight} direction={1} isVisible={isVisible}/>
                                </motion.div>
                            </AnimatePresence>
                            }
                            
                        </motion.div>
                        
                        <motion.div className="move-to-login">
                            <motion.button className="mood-join-btn" onClick={gohome}>
                                <img src={Logo} alt="logo"/>
                            </motion.button>
                        </motion.div>
                    </>
                }   
                </div>
                
            )
        }else{
            return <LoadingPage/>
        }
    }
    
    
    
}

export default Tournament