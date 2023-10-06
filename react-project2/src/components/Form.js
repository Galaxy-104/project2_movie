import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import '../styles/Form.css'
import Genres from '../api/Genres.json'



function Form({type, handleClick, genreLists}){

  const [disabled, setDisabled] = useState(false)

  //로그인 인풋 꾸미기
  const addClass = (e) => {
    // console.log(e.target)
    // console.log(e.target.value)
    const label = e.target.previousElementSibling
    const loginBtn = document.querySelector('.loginbtn')
    if(e.target.value !== ''){ //로그인 인풋이 빈칸일때
      label.classList.add('forcusing')
      if(e.target.id == 'loginEmail'|| e.target.id == 'userEmail'){ //이메일칸만 적용
        if(checkEmail(e.target.value) === false){ //이메일 형식이 올바르지 않을때
          e.target.classList.add('error')
          label.classList.add('errorfont')
          label.innerText = '이메일 형식이 올바르지 않습니다.'
          console.log(e.target.classList.contains('error'))
          console.log(e.target)
          e.target.classList.contains('error') ? setDisabled(true) :  setDisabled(false)
          //이메일 형식이 올바르지 않으면 다음 버튼 비활성화 ( disabled )
          //나중에 회원가입email중복검사도 여기서
        }else if(checkEmail(e.target.value) === true){  //이메일 형식이 올바를때
          e.target.classList.remove('error')
          label.classList.remove('errorfont')
          label.innerText = '이메일을 입력하세요'
          e.target.classList.contains('error') ? setDisabled(true) :  setDisabled(false)
        }
      }
      // if(e.target.id == 'loginPw'){  //나중에 비밀번호 자리수 제한걸기
      // }
    }else{
      label.classList.remove('forcusing')
      label.classList.remove('errorfont')
      label.innerText = '이메일을 입력하세요'
      e.target.classList.remove('error')
    }
  }

  //이메일 유효성 검사
  const checkEmail = (value) => {
    let pattern = /^[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-z]{2,3}$/i;
    if(!pattern.test(value)){
      return false
    }else{
      return true
    }
  }

  //회원가입 페이지 보이기
  const goSignup = () => {
    const loginBox = document.querySelector('.Login')
    const registerBox = document.querySelector('.Register')
    loginBox.classList.add('goleft')
    registerBox.classList.add('goleft')
  }
  //좋아하는 장르 체크 페이지 보이기
  const goCheckBox = (e) => {
    const registerBox = document.querySelector('.Register')
    const checkBox = document.querySelector('.check-box')
    registerBox.classList.add('goleft2')
    checkBox.classList.add('goleft2')

    const signUpId = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.value
    const signUpEmail = e.target.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.value
    const signUpPw = e.target.previousElementSibling.previousElementSibling.lastElementChild.value
    const signUpPw2 = e.target.previousElementSibling.lastElementChild.value

    console.log('id:', signUpId)
    console.log('email:', signUpEmail)
    console.log('pw:', signUpPw)
    console.log('pw2:', signUpPw2)
    //이메일형식이 올바르지 않거나 비밀번호가 서로 다르면 버튼 비활성화

  }

  //회원가입 확인창 보이기
  const goresult = () => {
    let arr = []
    const checkBox = document.querySelector('.check-box')
    const doneBox = document.querySelector('.done')
    const inputBoxs = document.querySelectorAll('.inputs')

    //장르 체크된것 추출
    inputBoxs.forEach(inputBox => {
      // console.log(inputBox)
      const isChecked = inputBox.firstElementChild.checked
      if(isChecked){
        console.log(inputBox.firstElementChild.value)
        return arr.push(inputBox.firstElementChild.value)
      }
    })
    checkBox.classList.add('goleft3') 
    doneBox.classList.add('goleft3')
    
    console.log(arr)

    //데이터를 저장해서 좋아하는 장르에 있는 데이터를 fetch해서 메인페이지로 가져와야하나?
    //암튼 여기서 fetch post로 유저 등록
  }

  //로그인 누르면 홈페이지로 이동
  const navigate = useNavigate()
  const login = (e) => {
    const loginId = e.target.parentElement.firstElementChild.lastElementChild
    const loginPw = e.target.parentElement.firstElementChild.nextElementSibling.lastElementChild
    console.log('id:',loginId.value)
    console.log('pw:',loginPw.value)
    // navigate('/home')
  }

  
  //회원가입후 로그인 페이지 보이기
  const goLogin = () => {
    const loginBox = document.querySelector('.Login')
    const registerBox = document.querySelector('.Register')
    const checkBox = document.querySelector('.check-box')
    const doneBox = document.querySelector('.done')
    loginBox.classList.remove('goright')
    loginBox.classList.remove('goleft')
    registerBox.classList.remove('goleft')
    registerBox.classList.remove('goleft2')
    registerBox.classList.remove('goleft3')
    checkBox.classList.remove('goleft')
    checkBox.classList.remove('goleft2')
    checkBox.classList.remove('goleft3')

    doneBox.classList.add('goleft4')
    doneBox.classList.remove('goleft4')
    doneBox.classList.remove('goleft3')
  }
  //이상형월드컵 페이지 다시가기
  const goworldcup = () => {
    navigate('/')
  }
  //로그인정보가 틀리면 빨간색보더로 변경해주기
  //회원가입시 이미 존재하는 이메일이면 input창 벗어났을때 바로 알려주기  
  if(type == 'login'){
    return(
      <div className="Login base">
        <label htmlFor='loginEmail'>
          <p className="labelname">이메일을 입력하세요</p>
          <input onChange={addClass} type='text' id='loginEmail'></input>
        </label>
        <label htmlFor='loginPw'>
          <p className="labelname">비밀번호를 입력하세요</p>
          <input onChange={addClass} type='password' id='loginPw'></input>
        </label>
        <Button btnClass='loginbtn' handleClick={login} disabled={disabled}>로그인</Button>
        <p className="registerbtn" onClick={goSignup}>아직 회원이 아니신가요?</p>
        <p className="registerbtn" onClick={goworldcup}>이상형 월드컵 다시 하러 가기</p>
      </div>
    )
  }else if(type == 'signup'){
    return(
      <div className="Register base">
        <h3>계정 만들기</h3>
        <label htmlFor='userId'>
          <p className="labelname">아이디를 입력하세요</p>
          <input onChange={addClass} type='text' id='userId'></input>
        </label>
        <label htmlFor='userEmail'>
          <p className="labelname">이메일을 입력하세요</p>
          <input onChange={addClass} type='text' id='userEmail'></input>
        </label>
        <label htmlFor='userPw'>
          <p className="labelname">비밀번호를 입력하세요</p>
          <input onChange={addClass} type='password' id='userPw'></input>
        </label>
        <label htmlFor='userPw2'>
          <p className="labelname">비밀번호를 다시 입력하세요</p>
          <input onChange={addClass} type='password' id='userPw2'></input>
        </label>
        <Button btnClass='loginbtn' handleClick={goCheckBox} disabled={disabled}>다음</Button>
      </div>
    )
  }else if(type == 'checkBox'){
    // console.log(Genres)
    return(
      <div className="check-box base">
        <h4>좋아하는 장르를 선택해주세요!</h4>
          <div className="input-box">
            {Genres.genres.map((genre,id) => {
              // console.log(genre)
              return(
                <div className="inputs" key={id}>
                  <input type='checkbox' id={genre.name} value={genre.name} onClick={handleClick} defaultChecked={genreLists && genreLists.includes(genre.id) && 'on'}/>
                  <label htmlFor={genre.name}>{genre.name}</label>
                </div>
              )
            })}
          </div>
          <Button btnClass='signupOK' handleClick={goresult}>가입완료하기</Button>
        </div>
    )
  }else if(type == 'done'){
    //백앤드 결과화면으로 회원가입 성공여부 띄워주기
    return(
      <div className="done base">
        <h4>축하합니다! 무드의 회원이 되었습니다.</h4>
        <Button handleClick={goLogin}>로그인 하러 가기</Button>
      </div>
    )
  }
}


export default Form