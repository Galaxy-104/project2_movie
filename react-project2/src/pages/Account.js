import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Button from "../components/Button";
import AccountGenres from "../components/AccountGenres";
import AccountProfile from "../components/AccountProfile";


import '../styles/Account.css'




function Account(){

    const [ userInfo, setUserInfo ] = useState({})
    
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
            setUserInfo(result.user)
        })

    }, [])

    const checkPassword = (e) => {
        const password = document.querySelector('.account-page input#user-password')
        const passwordCheck = document.querySelector('.account-page input#user-password-check')
        const passwordLabel = document.querySelectorAll('.account-page span.password-label')
        
        // 비밀번호 일치 확인

        if(password.value !== "" && passwordCheck.value === password.value){
            console.log('비밀번호가 일치합니다')
            passwordLabel[0].style.color = "#fff"
            passwordLabel[1].style.color = "#fff"
            passwordLabel[1].innerHTML = "비밀번호가 일치합니다"
            password.classList.remove('incorrect')
            passwordCheck.classList.remove('incorrect')
        }else if(password.value !== "" && passwordCheck.value !== ""){
            console.log("비밀번호가 일치하지 않습니다.")
            passwordLabel[1].innerHTML = "비밀번호가 일치하지 않습니다"
            password.classList.add('incorrect')
            passwordCheck.classList.add('incorrect')
            passwordLabel[0].style.color = "var(--main-color)"
            passwordLabel[1].style.color = "var(--main-color)"
        }else if(passwordCheck.value == ""){
            passwordLabel[0].style.color = "#fff"
            passwordLabel[1].style.color = "#fff"
            passwordLabel[1].innerHTML = "비밀번호를 다시 입력하세요"
            password.classList.remove('incorrect')
            passwordCheck.classList.remove('incorrect')
        }

        // 비밀번호 입력시 텍스트 스타일 변경
        if(password.value.length > 0){
            passwordLabel[0].classList.add('focus')
        }else if(password.value.length === 0 ){
            passwordLabel[0].classList.remove('focus')
        }

        if(passwordCheck.value.length > 0){
            passwordLabel[1].classList.add('focus')
        }else if(passwordCheck.value.length === 0 ){
            passwordLabel[1].classList.remove('focus')
        }
        
    }

    const checkInputs = (e) => {

    }
    const [ currentPage, setCurrentPage ] = useState("profile")

    const changePage = () => {
        if(currentPage === "profile"){
            setCurrentPage("Genres")
        }else{
            setCurrentPage("profile")
        }
    }

    // 페이지 변화 인식
    return (
        <div className="account-page">
            <Nav></Nav>
            <div className="account-container">
                {currentPage === "profile"? 
                <AccountProfile handleChange={checkPassword} userInfo={userInfo}/> :
                <AccountGenres handleClick={checkInputs}/>
                }
                
                
                <div className="account-edit-btn">
                    <Button handleClick={changePage}>다음</Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Account