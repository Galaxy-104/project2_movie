import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import '../styles/Form.css'
import Genres from '../api/Genres.json'
import Modal from './Modal'



function Form({type, handleClick, genreLists}){

  const [disabled, setDisabled] = useState(true)
  const [open, setOpen] = useState(false) 
  const [checked, setChecked] = useState(genreLists)
  

  //인풋꾸미기에서 인풋기능들이 추가되버린..
  const addClass = (e) => {
    // console.log(e.target)
    // console.log(e.target.value)
    const label = e.target.previousElementSibling
    //로그인 인풋이 빈칸일때
    if(e.target.value !== ''){ 
      label.classList.add('forcusing')
      //이메일칸만 적용
      if(e.target.id === 'loginEmail'|| e.target.id === 'userEmail'){
        //이메일 형식이 올바르지 않을때
        if(checkEmail(e.target.value) === false){
          e.target.classList.add('error')
          label.classList.add('errorfont')
          label.innerText = '이메일 형식이 올바르지 않습니다.'
          setDisabled(true)
          
          //나중에 회원가입email중복검사도 여기서
        //이메일 형식이 올바를때
        }else if(checkEmail(e.target.value) === true){ 
          e.target.classList.remove('error')
          label.classList.remove('errorfont')
          label.innerText = '이메일을 입력하세요'

          const loginPw = document.getElementById('loginPw')
          loginPw.value !== '' ? setDisabled(false) : setDisabled(true)
          
        }
      }else if(e.target.id === 'loginPw'){
        const loginEmail = e.target.parentElement.previousElementSibling.lastElementChild
        if(e.target.value !== '' && !loginEmail.classList.contains('error')){
          setDisabled(false)
        }else{
          
          setDisabled(true)
        }
      }
      // if(e.target.id == 'loginPw'){  //나중에 비밀번호 자리수 제한걸기
      // }
      //회원가입 비밀번호 같은지 확인
      else if(e.target.id === 'userPw' || e.target.id === 'userPw2'){ 
        // console.log(e.target.value)
        const userPw =document.getElementById('userPw')
        const userPw2 =document.getElementById('userPw2')
        // console.log(userPw2.value)
        //비밀번호가 다를경우
        if(userPw.value !== userPw2.value){ 
          userPw.classList.add('error')
          userPw.parentElement.firstElementChild.classList.add('errorfont')
          userPw2.classList.add('error')
          userPw2.parentElement.firstElementChild.classList.add('errorfont')
          userPw2.parentElement.firstElementChild.innerText = '비밀번호를 똑같이 입력해주세요'
          setDisabled(true)
        //비밀번호가 같은 경우
        }else if(userPw.value === userPw2.value){ 
          userPw.classList.remove('error')
          userPw.parentElement.firstElementChild.classList.remove('errorfont')
          e.target.classList.remove('error')
          userPw2.classList.remove('error')
          userPw2.parentElement.firstElementChild.classList.remove('errorfont')
          userPw2.parentElement.firstElementChild.innerText = '비밀번호가 같습니다'
          setDisabled(false)
        }
      }
    }else{
      label.classList.remove('forcusing')
      label.classList.remove('errorfont')
      setDisabled(true)
      console.log(e.target.value)
      //이메일칸이 빈칸일때 원래 텍스트로 돌아오기
      if(label.nextElementSibling.id === 'loginEmail' || label.nextElementSibling.id === 'userEmail'){ //이메일칸
        label.innerText = '이메일을 입력하세요'
      //pw가 빈칸일때 pw2스타일 제거후 원래 텍스트로 돌아오기
      }else if(label.nextElementSibling.id === 'userPw'){
        const pw2Label = label.parentElement.nextElementSibling
        console.log(pw2Label.lastElementChild.value)
        console.log(pw2Label.lastElementChild)
        console.log(pw2Label.firstElementChild)
        if(pw2Label.lastElementChild.value === ''){
          pw2Label.lastElementChild.classList.remove('error')
          pw2Label.firstElementChild.classList.remove('errorfont')
          pw2Label.firstElementChild.innerText = '비밀번호를 다시 입력하세요'
        //한번에 지웠을때 에러 적용시키기
        }else{
          pw2Label.lastElementChild.classList.add('error')
          pw2Label.firstElementChild.classList.add('errorfont')
          pw2Label.firstElementChild.innerText = '비밀번호를 똑같이 입력해주세요'
        }
      //pw2가 빈칸일때 pw스타일 제거
      }else if(label.nextElementSibling.id === 'userPw2'){
        label.innerText = '비밀번호를 다시 입력하세요'
        const pwLabel = label.parentElement.previousElementSibling
        console.log(pwLabel)
        console.log(pwLabel.firstElementChild)
        if(pwLabel.lastElementChild.value === ''){
          pwLabel.lastElementChild.classList.remove('error')
          pwLabel.firstElementChild.classList.remove('errorfont')
        }else{
          pwLabel.lastElementChild.classList.add('error')
          pwLabel.firstElementChild.classList.add('errorfont')
        }
      }

      e.target.classList.remove('error')
    }
  }

  //이메일
  const clickEmail = (e) => {
    console.log('클릭')
    fetch('http://127.0.0.1:5201/api/users/', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(datas => {
      console.log(datas)
      datas.user.map(data => {
        console.log(e.target.value)
        console.log(data.email)
      if(e.target.value === data.email){ //이미 존재하는 이메일
        e.target.classList.add('error')
        e.target.previousElementSibling.classList.add('errorfont')
        e.target.previousElementSibling.innerText = '이미 존재하는 이메일입니다'
        setDisabled(true)
      }else if(checkEmail(e.target.value) === false){ //이메일 형식이 틀릴때
        e.target.classList.add('error')
        e.target.previousElementSibling.classList.add('errorfont')
        e.target.previousElementSibling.innerText = '이메일 형식이 올바르지 않습니다.'
        setDisabled(true)
      }else if(!e.target.classList.contains('error')){ //에러가 없을경우
        setDisabled(false)
      }
      })
    })
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

    setDisabled(false)
    setUserInfo({
      userid : signUpId,
      userEmail : signUpEmail,
      userpw : signUpPw
    })
    return userInfo, console.log(userInfo)
  }

  const [userInfo, setUserInfo] = useState({})

  //회원가입 확인창 보이기
  let arr = []
  
  const goresult = () => {
    
    const checkBox = document.querySelector('.check-box')
    const doneBox = document.querySelector('.done')
    
    
    
    console.log(checked)
    console.log(userInfo)
    //데이터를 저장해서 좋아하는 장르에 있는 데이터를 fetch해서 메인페이지로 가져와야하나?
    //ㄴ이렇게해야 회원가입안거치고 바로 로그인했을때 장르연동됨
    //암튼 여기서 fetch post로 유저 등록
    fetch('http://127.0.0.1:5201/api/users/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          userId: userInfo.userid,
          email: userInfo.userEmail,
          password: userInfo.userpw,
          likeGenre: checked
      })
    })
    .then( res => res.json() )
    .then( result => {
      console.log(result)
      if(result.code === 200){
        checkBox.classList.add('goleft3') 
        doneBox.classList.add('goleft3')
      }
    })

  }
  
  //자동체크된것 바로 버튼활성화 안되는것 해결하기
  //로그아웃후 새로 내가 클릭해서 담은 장르들은 연동안됨
  const checkInputs = () => {
    console.log(userInfo)
    const inputBoxs = document.querySelectorAll('.inputs')
    //장르 체크된것 추출
    
    inputBoxs.forEach(inputBox => {
      //체크되어 들어온 장르 미리 배열에 담기
      const isChecked = inputBox.firstElementChild.checked
      // console.log(isChecked)
      if(isChecked){
        console.log(inputBox.firstElementChild.value)
        arr.indexOf(inputBox.firstElementChild.value) == -1 && arr.push(inputBox.firstElementChild.value)
        console.log(arr)
        return setChecked(arr)
      }
      // console.log(checked)
      // 아래 코드가 없어야 이전화면갔을때 다음 버튼이 바로 활성화되어있음
      // arr.length > 2 ? setDisabled(false) : setDisabled(true)
    })
    return checked
  }
  console.log(checked)
  console.log(userInfo)

  //장르선택창에서 회원가입창으로 되돌아가기
  const backSingup = () => {
    const registerBox = document.querySelector('.Register')
    const checkBox = document.querySelector('.check-box')
    const loginBtn = document.querySelector('.loginbtn')

    registerBox.classList.remove('goleft2')
    checkBox.classList.remove('goleft2')
    loginBtn.classList.remove('disabled')
    loginBtn.disabled = false
  }

  useEffect(() => {
    const signupOKBtn = document.querySelector('.signupOK')
    if(checked && checked.length > 2){
      signupOKBtn.classList.remove('disabled')
      signupOKBtn.disabled = false
    }else{
      signupOKBtn.classList.add('disabled')
      signupOKBtn.disabled = true
    }    
  },)
  const close = () => {
    return setOpen(false)
  }

  const [ loginErrorMsg, setLoginErrorMsg ] = useState("")

  //로그인 누르면 홈페이지로 이동
  const navigate = useNavigate()
  const login = async (e) => {
    const loginId = e.target.parentElement.firstElementChild.lastElementChild
    const loginPw = e.target.parentElement.firstElementChild.nextElementSibling.lastElementChild    

    const loginUser = await fetch('http://localhost:5201/api/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          email: loginId.value,
          password: loginPw.value,
      })
    })
    .then( res => res.json())
    .then( result => {
      console.log(result)

      if(result.code === 200){
        navigate('/home')
        window.localStorage.setItem('accessToken', `${result.accessToken}`)
      }else if(result.code === 401){
        setOpen(true)
      }
    })
    console.log('id:',loginId.value)
    console.log('pw:',loginPw.value)
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

  //회원가입시 이미 존재하는 이메일이면 input창 벗어났을때 바로 알려주기  
  if(type == 'login'){ //로그인 폼
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
        <p className="login-error">{loginErrorMsg}</p>
        <Button btnClass='loginbtn' handleClick={login} disabled={disabled}>로그인</Button>
        <p className="registerbtn" onClick={goSignup}>아직 회원이 아니신가요?</p>
        <p className="registerbtn" onClick={goworldcup}>이상형 월드컵 다시 하러 가기</p>
        <Modal type='children' open={open} size='messageSize'>
          <div className="message">
            <span>Error!</span><br/>
            <p>아이디나 비밀번호를 확인해주세요</p>
          </div>
          <Button btnClass='closeBtn' handleClick={close}>x</Button>
        </Modal>
      </div>
    )
  }else if(type == 'signup'){ //회원가입 폼
    return(
      <>
      <div className="Register base">
        <h3>계정 만들기</h3>
        <label htmlFor='userId'>
          <p className="labelname">아이디를 입력하세요</p>
          <input onChange={addClass} type='text' id='userId'></input>
        </label>
        <label htmlFor='userEmail'>
          <p className="labelname">이메일을 입력하세요</p>
          <input onChange={addClass} onBlur={clickEmail} type='text' id='userEmail'></input>
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

      {/* 장르 고르기 폼 */}
      <div className="check-box base">
      <h4>좋아하는 장르를 3개 이상 선택해주세요!</h4>
        <div className="input-box">
          {Genres.genres.map((genre,id) => {
            // console.log(genre)
            return(
              <div className="inputs" key={id}>
                <input type='checkbox' name='genre' id={genre.name} value={genre.id} onClick={checkInputs} defaultChecked={genreLists && genreLists.includes(genre.id) && 'on'}/>
                <label htmlFor={genre.name}>{genre.name}</label>
              </div>
            )
          })}
        </div>
        <Button btnClass='backSingup' handleClick={backSingup}>이전화면보기</Button>
        <Button btnClass='signupOK' handleClick={goresult} disabled={disabled}>가입완료하기</Button>
      </div>
      </>
    )
  }else if(type == 'done'){ //회원가입 완료 폼
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