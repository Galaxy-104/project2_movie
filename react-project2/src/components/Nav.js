import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import '../styles/Nav.css'
import logo from '../assets/logo.png'

function Nav(){
  
  const [open, setOpen] = useState(false)
  //로고클릭
  const navigate = useNavigate()
  const toHome = () => {
    console.log('로고클릭')
    navigate('/home')
  }

  //로그아웃 클릭
  const logout = () => {
    navigate('/login', {state:{genres:[]}})
  }

  //즐겨찾기 클릭
  const toLike = () => {
    navigate('/like')
  }
  //메뉴 오픈
  const openMenu = () => {
    const btnBox = document.querySelector('.btn-box')
    if(open){
      btnBox.classList.remove('dropOpen')
      setOpen(false)
    }else{
      btnBox.classList.add('dropOpen')
      setOpen(true)
    }
  }
  return(
    <div className={`Nav`}>
    <img src={logo} onClick={toHome}></img>
    <svg className="more" onClick={openMenu} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
    </svg>
    <div className="btn-box">
      <div onClick={toLike}>즐겨찾기</div>
      <div onClick={toLike}>내 정보 수정</div>
      <div onClick={logout}>로그아웃</div>
    </div>
    </div>
  )
}

export default Nav