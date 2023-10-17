import React,{ useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import '../styles/Loginpage.css'
import logo from '../assets/logo.png'
import Form from "../components/Form";

function Loginpage(){


  //동적 효과
  useEffect(()=> {
    const img = document.querySelector('img')
    const introtext1 = document.querySelector('.introText1')
    const introText2 = document.querySelector('.introText2')
    const introText3 = document.querySelector('.introText3')
    const downBtn = document.querySelector('.downbtn')
    setTimeout(() => img.classList.add('imgdown'), 1000)
    setTimeout(() => introtext1.classList.add('introText1-right'),1500)
    setTimeout(() => introText2.classList.add('introText2-left'),2000)
    setTimeout(() => {
      introText3.classList.add('introText3-up')
      downBtn.classList.add('downbtn-up')
    },2500)
  })
    
  //form화면으로 슬라이드
  const gofrom = () => {
    const form = document.querySelector('.form')
    window.scrollTo({top:document.body.scrollHeight, behavior:"smooth"})
    form.classList.add('show')
  }
  
  const location = useLocation()
  console.log(location)
  const [genreLists, setGenreLists] = useState(location.state && location.state.genres)
  
 

  return(
    <div className="Loginpage">
      <img src={logo} className='logo'></img>
      <div className="intro introText1">
        이상형 영화를 토대로 <br/> 영화를 <span>추천</span>해드려요.<br/>
        여러 영화의 정보를 <br/> 한눈에 볼 수 있어요.
      </div>
      <div className="intro introText2">
        추천영화에서 <br/> 영화를 <span>스크랩</span>해보세요!<br/>
        언제든지 꺼내볼 수 있어요.
      </div>
      <div className="intro introText3">
        지금 로그인하고 <span>무드</span>의 혜택을 누려보세요!
      </div>
      <Button btnClass='downbtn' handleClick={gofrom}>↓</Button>
      <div className="form">
        <Form type='login'></Form>
        <Form type='signup' genreLists={genreLists}></Form>
        {/* <Form type='checkBox' genreLists={genreLists}></Form> */}
        <Form type='done'></Form>
      </div>
    </div>
  )
}


export default Loginpage