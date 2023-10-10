import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import '../styles/Nav.css'
import logo from '../assets/logo.png'

function Nav(){
  //로고클릭
  const navigate = useNavigate()
  const toHome = () => {
    console.log('로고클릭')
    navigate('/home')
  }

  // 내 정보 클릭
  const account = () => {
    navigate('/account')
  }

  //로그아웃 클릭
  const logout = () => {
    navigate('/login', {state:{genres:[]}})
  }

  //즐겨찾기 클릭
  const toLike = () => {
    navigate('/like')
  }
  return(
    <div className={`Nav`}>
    <img src={logo} onClick={toHome}></img>
    <div className="btn-box">
      <Button>내 정보</Button>
      <Button handleClick={toLike}>즐겨찾기</Button>
      <Button handleClick={logout}>로그아웃</Button>
    </div>
    </div>
  )
}

export default Nav