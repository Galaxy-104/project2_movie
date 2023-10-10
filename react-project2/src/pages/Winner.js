import { MotionContext } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi"
import { motion } from "framer-motion"

import GenreChart from "../components/GenreChart";
import WinnerPlayer from "../components/WinnerPlayer"

import '../styles/Winner.css'
import Logo from "../assets/logo.png"
import { ReactComponent as MedalGold } from "../assets/medal-gold.svg"
import { ReactComponent as MedalSilver } from "../assets/medal-silver.svg"
import { ReactComponent as MedalBronze } from "../assets/medal-bronze.svg"
import { ReactComponent as Crown } from "../assets/crown.svg"
import { ReactComponent as Point } from "../assets/point.svg"



function Winner(){

    const { state: {winner, result: winnerMoviesGenre } } = useLocation()
    const navigate = useNavigate()
    const gohome = () => {
        navigate('/login', {state: {genres: winner[0].genre_ids}})
        // navigate('/home', {state: {genres: winner[0].genre_ids}})
    }
    const [ recommendMovies, setRecommendMovies ] = useState([])
    const [ genreData, setGenreData ] = useState([])
    const [ genresRank, setGenresRank ] = useState([])

    const [ favoriteGenre, setFavoriteGenre ] = useState([])

    useEffect(() => {
        const getFavoriteGenreMovies = async (win) => {

            const data = await fetch('/api/Tournament.json')
            const res = await data.json()
            const genreCode = []
            res.map((movie) => {
                genreCode.push(movie.code)
            })
            const recommendGenres = []

            const findMovies = () => {
                const filterMovies = [...winnerMoviesGenre]
                const indices = []

                while(indices.length < 3){
                    let index = Math.floor(Math.random() * filterMovies[0].movies.length)
                    if(!indices.includes(index) && win.id !== filterMovies[0].movies[index].id){
                        indices.push(index)
                    }
                }
                // console.log(filterMovies)
                for(let i = 0; i < 3; i++){
                    recommendGenres.push(filterMovies[0].movies[indices[i]])    
                }

                setRecommendMovies([...recommendGenres])
            }
            findMovies()

            const results = await fetch('http://127.0.0.1:5201/api/result'
            ,{
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setGenreData([...data.results])
                setGenresRank([...data.results.sort((a, b) => b.likes - a.likes)]) 
                
            })   
        }
        getFavoriteGenreMovies(winner[0])
    }, [])

    useEffect(() => {
        if(genreData.length !== 0){
        //    console.log(genreData, winnerMoviesGenre)
           const favorite = genreData.filter((genre) => {
                    return genre.id === winnerMoviesGenre[0].code
                })
           setFavoriteGenre([...favorite])
           console.log(favorite[0].name)
            
        }
    }, [genreData])


    return (
        <div className="winner-page">
            <div className="result-container">
                <div className="poster">
                    <WinnerPlayer player={winner[0]} isVisible={true}/>
                </div>

                <div className="recommend">
                    <div className="recommend-header">
                        <h2>이런 영화는 어떠세요?</h2>
                    </div>

                    <div className="recommend-movies">
                        {recommendMovies.map((movie) => {
                            return (
                                <div className="recommend-poster" key={movie.id}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                                </div>
                            )
                        })}
                    </div>                    
                </div>

                <div className="move-to-login">
                    <h3 className="mood-join-msg">더 많은 영화를 보고싶다면 <BiRightArrowAlt/></h3>
                    <motion.button className="mood-join-btn" onClick={gohome}>
                        <img src={Logo} alt="logo"/>
                    </motion.button>
                </div>

                <div className="favorite">
                    <h2 className="favorite-msg">가장 좋아하는 장르는</h2>
                    <div className="favorite-genre">
                        <div className="favorite-point">
                            <div className="crown-icon"><Crown/></div>
                            <span className="favorite-name">{favoriteGenre.length === 0? "" : `${favoriteGenre[0].name}`}</span> 
                        </div>
                        {favoriteGenre.length === 0 ? "" :
                         genresRank.map((genre, index) => {
                            const total = genresRank[0].likes
                            const percent = Math.floor((genre.likes / total) * 100)
                            if(favoriteGenre[0].id === genre.id){
                                console.log(favoriteGenre, genre)
                                return (
                                    <div className="favorite-rank" key={`winner-${genre.name}`}>
                                        {index === 1 ? <MedalGold/> :
                                            index === 2 ? <MedalSilver/> :
                                            index === 3 ? <MedalBronze/> : ""
                                        }
                                        <span className="rank-number">{index}위</span>
                                        <span className="rank-people">{genre.likes} / {total} 명</span>
                                        <div className="favorite-percent">
                                            <div className="percent-bar" style={{width: `${percent}%`}}>
                                                <span className="percent-text">{percent}%</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            }
                            
                        })}
                    </div>
                </div>

                <div className="stats">
                    <div className="genres-rank">
                        {genresRank.map((genre, index) => {
                            const total = genresRank[0].likes
                            if(index < 6 && genre.id !== 0){
                                const percent = Math.floor((genre.likes / total) * 100)
                                return (
                                    <div className="rank-info" key={`${genre.name}-${index}`}>
                                        {index === 1 ? <MedalGold/> :
                                            index === 2 ? <MedalSilver/> :
                                            index === 3 ? <MedalBronze/> : 
                                            <div className="rank-blank" style={{ width: "60px", height: "60px"}}></div>
                                        }
                                        <span className="rank-number">{index}</span>
                                        <span className="rank-name">{genre.name}</span>
                                        <div className="rank-percent">
                                            <div className="percent-bar" style={{width: `${percent}%`}}>
                                                <span className="percent-text">{percent}%</span>
                                            </div>    
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="genres-chart">
                        {/* <Chart dataArr={genreData}/> */}
                        {genreData.length === 0? "" : <GenreChart dataArr={genreData}/>}   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Winner