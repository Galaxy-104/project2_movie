import React, {useEffect, useState} from "react";
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

  //메뉴 외부, 즐겨찾기버튼 클릭시 메뉴 닫히기
  useEffect(() => {
    document.addEventListener('click', function(e){
      const btnBox = document.querySelector('.btn-box')
      const moreBtn = document.querySelector('.more')
      // console.log(e.target)
      if(moreBtn && !moreBtn.contains(e.target)){
        btnBox.classList.remove('dropOpen')
        setOpen(false)
      }
    })
  },[])

  return(
    <div className={`Nav`}>
    <img src={logo} onClick={toHome}></img>
    <svg className="more" onClick={openMenu} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
    </svg>
    <div className="btn-box">
      <div onClick={toLike} className='menu'>즐겨찾기</div>
      <div onClick={account} className='menu'>프로필 수정</div>
      <div onClick={logout} className='menu'>로그아웃</div>
    </div>
    </div>
  )
}

export default Nav