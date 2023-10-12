import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Likemovie.css'
import Nav from '../components/Nav'
import Genres from '../api/Genres.json'
import YouTube from 'react-youtube'
import Modal from "../components/Modal";


function Likemovie(){

  const [userLkieMoive, setUserLikeMovie] = useState([])
  const [movieInfo, setMovieInfo] = useState([])
  const [open, setOpen] = useState(false)
  const [pickLikeMovie, setPickLikeMovie] = useState({})
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
        console.log(result.user.likeMoive)
        setUserLikeMovie(result.user.likeMoive)

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
          if(result.user.likeMoive.indexOf(list.title) !== -1){
            console.log(list)
            newLists.push(list)
            setMovieInfo(newLists)
          }          
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


  console.log(movieInfo)
  console.log(pickLikeMovie)
  return(
    <div className="Like-moive">
      <Nav></Nav>
      <div className="like-box">
        <div className="like-list-box">
          {movieInfo.map(movie => {
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
            <>
              <h2>{pickLikeMovie.title}</h2>
              <h4>{pickLikeMovie.release_date.slice(0,10)}</h4>
              <h4>{genrename.join(' ')}</h4>
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
            </>
          </Modal>
          :
            <>
              <h2>영화정보를 보려면 해당 영화를 클릭하세요</h2>
            </>

          }



        </div>
      </div>
    </div>
  )
}



export default Likemovie