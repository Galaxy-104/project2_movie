import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import '../styles/MoreGenre.css'
import Nav from '../components/Nav'
import Modal from "../components/Modal";
import Movies from '../components/Movies'
import Button from '../components/Button'

function MoreGenre(){

  const [open, setOpen] = useState(false) 
  const [pickMovie, setPickMovie] = useState({})
  const [offSet, setoffSet] = useState(40)
  

  const location = useLocation()
  console.log(location)
  const movieLists = location.state.filter
  // console.log(movieLists)

  const firstList = movieLists.slice(0, 40)
  const [likeMovieList, setLikeMovieList] = useState(location.state.likeMovieList)

  const [moreMovieList, setmoreMovieList] = useState(firstList)
  console.log(moreMovieList)

  useEffect(() => {
    document.querySelector('.MoreGenre').addEventListener('scroll', scrolling)
  },[moreMovieList])
  
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
        setLikeMovieList(result.user.likeMovie)
      })
    },[])
    console.log(likeMovieList)
    
  const pickPoster = (e) => {
    // console.log(e.target)
    {movieLists.map((movie, id) => {
      // console.log(movie)
      // console.log(`https://image.tmdb.org/t/p/original/${movie.poster_path}` === e.target.src)
      if(e.target.src === `https://image.tmdb.org/t/p/original/${movie.poster_path}`){
        console.log(movie)
        return setPickMovie(movie)
      }
    })}
    console.log(pickMovie)
    return setOpen(true)
  }

  const close = () => {
    return setOpen(false)
  }

  if(!movieLists){
    return <div>아직 데이터 없음!</div>
  }


  //스크롤
  let num = 20
  
  const scrolling = () => {
    const MoreGenreBox = document.querySelector('.MoreGenre')
    if(MoreGenreBox.scrollTop + MoreGenreBox.clientHeight === MoreGenreBox.scrollHeight){
      const plusList = (offSet) => {
        return movieLists.slice(offSet, offSet+num)
      }
      //useEffect에 넣어놧는데 offSet이 안늘어난다..?!
      // console.log(offSet)
      setoffSet(offSet + num)
      setmoreMovieList([...moreMovieList, ...plusList(offSet)])

      // console.log(moreMovieList)
      

      
    }
  }


  return(
    <div className={`MoreGenre`}  onScroll={scrolling}>
      <Nav></Nav>
      <h3 className="maintitle">{location.state.title}</h3>
      <Movies movieLists={moreMovieList} pickPoster={pickPoster}></Movies>
      <Modal type='poster' open={open} pickMovie={pickMovie} close={close} size='posterSize' likeMovieList={likeMovieList}></Modal>
    </div>
  )
}

export default MoreGenre