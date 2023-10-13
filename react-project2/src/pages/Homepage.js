import React,{ useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import '../styles/Homepage.css'
import Nav from '../components/Nav'
import ScrollMoive from "../components/ScrollMovie";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Genres from '../api/Genres.json'


function Homepage(){
    
    const [open, setOpen] = useState(false) 
    const [pickMovie, setPickMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [likeMovieList, setLikeMovieList] = useState([])

    const close = () => {
      return setOpen(false)
    }
  
    const [movies, setMovies] = useState([])
    //API가져오기
    useEffect(() => {
      fetch('http://localhost:5201/api/moviesdata/'
      ,{
        method: 'GET',
        headers: {'Content-Type':'application/json'},
      }
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const {movies} = data
        console.log(movies)
        setLoading(false)
        setMovies(movies)
      })
    },[])

    const [ usersGenre, setUsersGenre ] = useState([])

    useEffect(() => {
      
      fetch('http://localhost:5201/api/users/check', 
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json',
          Authorization: window.localStorage.getItem('accessToken')  
        },
      })
      .then( res => res.json() )
      .then( result => {
        console.log(result)
        setUsersGenre(result.user.likeGenre)
        setLikeMovieList(result.user.likeMovie)
      })
      console.log(likeMovieList)
    }, [])

    //1등영화의 장르가 들어올 배열
    const userPickLists = [...usersGenre]

    console.log(userPickLists)
    const winnerGenres = []

    //장르 번호와 이름 연결
    userPickLists.map(userPickList => {
      // console.log(userPickList)
      Genres.genres.map(genre => {
        // console.log(genre.id)
        if(genre.id == userPickList){
          return winnerGenres.push(genre)
        }
      })
    })
    // console.log(winnerGenres)
    
    const copyMovies = [...movies]

    //장르별 객체배열
    const filter = winnerGenres.map(winnerGenre => {
      const filtered = copyMovies.filter((movie) => {
        // console.log(movie)
        return movie.genre_ids.includes(winnerGenre.id)
      })
      return {winnerGenre, filtered}
    })
    console.log(filter)

    //더보기 버튼 클릭
    const navigate = useNavigate()
    const movePage = (e) => {
      console.log('더보기클릭')
      console.log(e.target.parentElement.previousElementSibling.innerHTML)
      filter.map(filter => {
        // console.log(filter)
        // console.log(filter.winnerGenre.name)
        // console.log(filter.winnerGenre.name == e.target.parentElement.previousElementSibling.innerHTML)
        if(filter.winnerGenre.name == e.target.parentElement.previousElementSibling.innerHTML){
          console.log(filter)
          navigate(`/more`, {state: {filter: filter.filtered, title: filter.winnerGenre.name, likeMovieList: likeMovieList}})    
        }
      })
    }

    //포스터 클릭
    const pickPoster = (e) => {
      // console.log(e.target)
      // console.log(filter.filtered)
      {filter.map((filterMovie, id) => {
        filterMovie.filtered.map(movie => {
          // console.log(`https://image.tmdb.org/t/p/original/${movie.poster_path}` === e.target.src)
          if(`https://image.tmdb.org/t/p/original/${movie.poster_path}` === e.target.src){
            // console.log(movie)
            return setPickMovie(movie)
          }
        })
      })}
      console.log(pickMovie)
      return setOpen(true)
    }


    if(loading){
      //로딩화면
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
                transition={{ default: { duration: 0.3 }}}
                
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
    }else{
      return(
        <div className={`Homepage`}>
          <Nav></Nav>
          
          
            {/* 코드중복있어서 나중에 수정 */}
            {winnerGenres.map((winnerGenre, id) => {
              return (
                <div key={id} className={`scroll-box`}>
                  <h3>{winnerGenre.name}</h3>
                  <div className="box">
                    <ScrollMoive
                    movies={
                      copyMovies.filter((movie) => {
                        return movie.genre_ids.includes(winnerGenre.id)
                      })
                    }
                    pickPoster={pickPoster}
                    ></ScrollMoive>
                    <Button btnClass='moreBtn' handleClick={movePage}>more</Button>
                  </div>
                </div>
              )
            })}
        
            
          <Modal type='poster' open={open} close={close} pickMovie={pickMovie} size='posterSize' likeMovieList={likeMovieList}>
          </Modal>
          
        </div>
      )

    }
}

export default Homepage