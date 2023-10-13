import React, { Component,useEffect,useState } from "react";
import Button from "./Button";
import YouTube from 'react-youtube'
import '../styles/Modal.css'
import Genres from '../api/Genres.json'

function Modal ({children, open, type, close, pickMovie, size, likeMovieList }){

  const [like, setLike] = useState(false)
  const [likeList, setLikeList] = useState(likeMovieList)

  useEffect(() => {
    setLikeList(likeMovieList)
  },[likeMovieList])

  //줄거리 열고닫기
  const openP = () => {
    const p = document.querySelector('.content-box div p')
    // console.log(p)
    p.classList.toggle('normalP')
  }


  //영화 즐겨찾기 추가
  const likeMoive = (e) => {
    console.log('추가')
      fetch('http://localhost:5201/api/users/likeMovie', 
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json',
          Authorization: window.localStorage.getItem('accessToken')  
        },
        body: JSON.stringify({
          likeMovie: pickMovie._id
        })
      })
      .then( res => res.json() )
      .then( result =>{
        console.log(result)
        console.log(likeList)
        console.log(pickMovie)
        console.log(pickMovie._id)
        // console.log(pickMovie.title)
        // console.log(likeList.indexOf(pickMovie.title) === -1)
        setLike(true)
        const newLists = [...likeList]
        newLists.push(pickMovie._id)

        setLikeList(newLists)
      })
  }

  //영화 즐겨찾기 해제
  const unlikeMoive = (e) => {
    console.log('해제')
    console.log(e.target.parentElement.innerText)
    fetch('http://localhost:5201/api/users/unlikeMovie', 
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json',
          Authorization: window.localStorage.getItem('accessToken')  
        },
        body: JSON.stringify({
          likeMovie: pickMovie._id
        })
      })
      .then( res => res.json() )
      .then( result =>{
        console.log(result)
        setLike(false)
        const newLists = [...likeList]
        const deleteList = newLists.filter(list => {
          return list !== pickMovie._id
        })

        setLikeList(deleteList)

      })
  }
  // console.log(like)
  console.log(likeList)

  if(type === 'poster' && open){
    const pickMovieGenre = []
    open && pickMovie.genre_ids.length !== 0 && 
    pickMovie.genre_ids.map(id => {
      Genres.genres.map(genre => {
        if(id==genre.id){
          pickMovieGenre.push(genre.name)
        }
      })
    })


    return( 
    <div className={`Modal ${open ? 'open' : 'close'} ${size}`}>
      <>
               <div className='img-box'>
                  <img src={`https://image.tmdb.org/t/p/original/${pickMovie.poster_path}`}></img>
                </div>
                <div className="content-box">
                  <div className="modal-contents">
                    <h2 className="modal-title">{pickMovie.title} 
                    {likeList && likeList.indexOf(pickMovie._id) !== -1 ?
                      <svg onClick={unlikeMoive} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z"/>
                      </svg>
                      :
                      <svg onClick={likeMoive} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                       <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/>
                      </svg>
                    }
                    </h2>
                    <h4>{pickMovie && pickMovie.release_date.slice(0, 10)}</h4>
                    <h4>장르: {pickMovieGenre.join(', ')}</h4>
                    <p className="modalP normalP" onClick={openP}>{pickMovie.overview ? pickMovie.overview : '줄거리가 없습니다.'}</p>
                    
                  </div>  
                  {pickMovie.video_path.length !== 0 &&
                    <YouTube className='youtube' 
                    videoId={pickMovie.video_path[0].key} 
                    opts={{
                    width: '100%',
                    playerVars: {
                    autoplay: 1, //자동 재생 여부 
                    loop: 1, //반복 재생
                    fs:0, //전체화면버튼없앰
                    disablekb:1, //키보드조작막기
                    controls:0, //동영상컨트롤 표시 x
                    modestbranding: 1,
                  },}} onReady={(e)=> {e.target.mute()}} />
                  }
                </div>
                <Button btnClass='closeBtn' handleClick={close}>x</Button>
            </>  
    </div>
    )
  }else if(type === 'children' && open){
    return <div className={`Modal ${open ? 'open' : 'close'} ${size}`}>
      {children}
    </div>
  }
}

export default Modal

Modal.defaultProps = {
  open: false,
}