import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Genres from '../api/Genres.json'
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

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

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

    const sendChangeUserInfo = () => {
        const userId = document.querySelector('.account-page .account-container input#user-id')
        const userPw = document.querySelector('.account-page .account-container input#user-password')

        const userLikeGenres = []
        const genreCheckBoxes = document.querySelectorAll('.account-page .account-container .inputs input')
        genreCheckBoxes.forEach((genre) => {
            if(genre.checked){
                userLikeGenres.push(genre.value)
            }
        })

        fetch('http://localhost:5201/api/users/account', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                Authorization: window.localStorage.getItem('accessToken')  
            },
            body: JSON.stringify({
                userId: userId.value,
                password: userPw.value,
                likeGenre: [...userLikeGenres]
            })
        })
        .then( res => res.json())
        .then( result => { 
            window.localStorage.removeItem('accessToken')
            window.localStorage.setItem('accessToken', `${result.token}`)
            setCurrentPage("profile")
        })
    }

    // 페이지 변화 인식
    return (
        <div className="account-page">
            <Nav></Nav>
            <div className="account-container">
                <div className={`account-profile ${currentPage === "profile"? "" : "hidden"}`}>
                    <AccountProfile handleChange={checkPassword} userInfo={userInfo}/>
                    <div className="account-edit-btn">
                        <Button handleClick={changePage}>다음</Button>
                    </div>
                </div> 
                <div className={`account-genres ${currentPage === "profile"? "" : "visible"}`} >
                    
                    {/* <div className="user-likes">
                        <h4>좋아하는 장르를 3개 이상 선택해주세요!</h4>
                        <div className="input-box">
                        {Genres.genres.map((genre,id) => {
                            // console.log(genre)
                            return (
                                <div className="inputs" key={id}>
                                    <input type='checkbox' name='genre' id={genre.name} value={genre.id} onClick={checkInputs}/>
                                    <label htmlFor={genre.name}>{genre.name}</label>
                                </div>
                            )
                        })}
                        </div>
                    </div> */}
                    <AccountGenres handleClick={checkInputs} userInfo={userInfo}/>
                    <div className="account-edit-btn">
                        <Button handleClick={changePage} btnClass={"account-profile-btn"}>이전</Button>
                        <Button handleClick={sendChangeUserInfo} btnClass={"account-genres-btn"}>수정하기</Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Account