import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Likemovie.css'
import Nav from '../components/Nav'
import Genres from '../api/Genres.json'
import YouTube from 'react-youtube'
import Modal from "../components/Modal";
import Button from "../components/Button";
import { motion } from "framer-motion"

function Likemovie(){

  const [userLkieMoive, setUserLikeMovie] = useState([])
  const [movieInfo, setMovieInfo] = useState([])
  const [open, setOpen] = useState(false)
  const [pickLikeMovie, setPickLikeMovie] = useState({})
  const [loading, setLoading] = useState(true)
  const genrename = []

  //유저정보,영화정보 들고오기
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
        console.log(result.user.likeMovie)
        setUserLikeMovie(result.user.likeMovie)

        fetch('http://localhost:5201/api/moviesdata/'
      ,{
        method: 'GET',
        headers: {'Content-Type':'application/json'},
      }
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newLists = []
        data.movies.map(list => {
          if(result.user.likeMovie && result.user.likeMovie.indexOf(list._id) !== -1){
            console.log(list)
            newLists.push(list)
            setMovieInfo(newLists)
          }
          setLoading(false)
        })
      })
    })
  },[])

  const clickPoster = (e) => {
    setOpen(true)
    movieInfo.map(movie => {
      if(e.target.id === movie._id || e.target.parentElement.id === movie._id || e.target.parentElement.parentElement.id === movie._id){
        console.log(movie.title)
        setPickLikeMovie(movie)

      }
    })
    window.scrollTo({top:0, behavior:"smooth"})
  }

  //장르 id name으로 변환
  pickLikeMovie.genre_ids && Genres.genres.map(genre => {
    pickLikeMovie.genre_ids.map(genreId => {
      if(genreId === genre.id){
        genrename.push(genre.name)
      }
      return genrename
    })
  })

  //즐겨찾기 해제
  const unLike = () => {
    console.log('즐찾해제')
    fetch('http://localhost:5201/api/users/unlikeMovie', 
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json',
          Authorization: window.localStorage.getItem('accessToken')  
        },
        body: JSON.stringify({
          likeMovie: pickLikeMovie.title
        })
      })
      .then( res => res.json() )
      .then( result =>{
        console.log(result)
        window.location.reload()
      })
  }


  console.log(movieInfo)
  console.log(pickLikeMovie)
  
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
    <div className="Like-moive">
      <Nav></Nav>
      <div className="like-box">
        <div className="like-list-box">
          {movieInfo && movieInfo.map((movie, id) => {
            return(
              <div className="like-list" onClick={clickPoster} id={movie._id}>
                <div className="img-box">
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                </div>
                <h4>{movie.title}</h4>
              </div>
          )
          })}
        </div>
        <div className="like-info">
          {open ?
          <Modal size='infoMovie' type='children' open={open}>
              <h2>{pickLikeMovie.title}</h2>
              <h4>개봉일 : {pickLikeMovie.release_date.slice(0,10)}</h4>
              <h4>장르 : {genrename.join(', ')}</h4>
              <p>{pickLikeMovie.overview}</p>
              {pickLikeMovie.video_path.length == 0 ?
                <div className="noTrailer">재생 가능한 트레일러가 없습니다</div>
                :
                pickLikeMovie.video_path.map(video => {
                  return(
                    <>
                      <YouTube className='youtube2' 
                            videoId={video.key} 
                            opts={{
                            width: '100%',
                            playerVars: {
                            modestbranding: 1,
                          },}} onReady={(e)=> {e.target.unMute()}} />
                    </>
                  )
                })


              }
              <Button btnClass='unLikeBtn' handleClick={unLike}>즐겨찾기 해제</Button>
          </Modal>
          :
          movieInfo.length === 0 ?
            <>
              <h2>관심있는 영화를 등록해주세요</h2>
            </>
            :
            <>
              <h2>영화정보를 보려면 해당 영화를 클릭하세요</h2>
            </>
 }



        </div>
      </div>
    </div>
  )
}}



export default Likemovie