import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Match from "../components/Match";
import Player from "../components/Player";
import TimeBar from "../components/Timebar";
import WinnerPlayer from "../components/WinnerPlayer";

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
        }
        
    }, [loading])

    const selectMovie = (e) => { 

        const name = e.target.className
        const parentName = e.target.parentElement.className
        const grandName = e.target.parentElement.parentElement.className

        setIsVisible(false)
        setCounter(counter - 1)

        if(name.includes('left') || parentName.includes('left') || grandName.includes('left')){
            changeMatch(match[0])
        }else if(name.includes('right') || parentName.includes('right') || grandName.includes('right')){
            changeMatch(match[1])
        }
    }

    const changeMatch = (player) => {
        
        if(movies.length > 2){
            setWinners([...winners, player])
            setMovies(movies.slice(2))
            setMatch([movies[2], movies[3]])
        }else if( movies.length <= 2 ){

            if(winners.length === 0){
                setWinner([player])
                setIsVisible(true)

                const filterMovies = tournamentMovies.filter((movie) => {
                    const findMv = movie.movies.find((mv) => {
                         if(mv.id === player.id){
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

            }else{
                let updatedMovies = [...winners, player]
                updatedMovies.sort(() => Math.random() - 0.5)
                setMatch([updatedMovies[0], updatedMovies[1]])
                setMovies(updatedMovies)
                setWinners([])
            }
        }
    }

    useEffect(() => {
        setIsVisible(true)
    }, [match])

    const navigate = useNavigate()
    const moveToResult = () => navigate('/result', { state: {winner, result: winnerMoviesGenre}})

    useEffect(() => {
        if(winner.length === 1){
            setTimeout(moveToResult, 1000)
        }

    }, [winner])

    return (
        <div className="tournament-page">
            
            {match.length === 0 ? "" : 
                counter < 2 ?            
                <div className="winner">
                    <WinnerPlayer player={winner[0]} isVisible={true}/>
                </div>
                :
                <>
                    <TimeBar counter={counter}/>
                    <Match 
                        match={match} 
                        handleClick={selectMovie}
                        isVisible={isVisible}
                    />    
                </>
                
            }
            
        </div>
        
    )
}

export default Tournament