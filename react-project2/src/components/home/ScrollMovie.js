import React,{ Component } from "react";
import '../../styles/ScrollMovie.css'
import Poster from "../common/Poster";
import Button from "../common/Button"

function ScrollMoive({pickPoster, movies}){
  // console.log(movies)
  //화면에 8개만 보여주기
  const moiveNum = movies.slice(0,10)

    let isDown = false
    let startX
    let scrollLeft


  //마우스 클릭
  const mouseDown = (e) => {
    const scrollbox = e.target.parentElement.parentElement.parentElement
    isDown = true
    // console.log(ScrollBox.offsetLeft)
    startX = e.pageX - scrollbox.offsetLeft
    scrollLeft = scrollbox.scrollLeft
  }
  //마우스 드래그
  const mouseMove = (e) => {
    // console.log('드래그')
    const scrollbox = e.target.parentElement.parentElement.parentElement
    if(!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollbox.offsetLeft
    const walk = x - startX
    scrollbox.scrollLeft = scrollLeft - walk
  }

  //마우스가 컨테이너 밖으로 가거나 마우스 클릭을 뗄때
  const deactive = () => {
    isDown = false
  }

  return(
    <div className={`ScrollMovie`} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseLeave={deactive} onMouseUp={deactive}>
      {moiveNum.map((movie, id) => {
        return(
          <Poster key={id} pickPoster={pickPoster} cover={movie.poster_path}></Poster>
          )
      })}
    </div>

  )
}


export default ScrollMoive