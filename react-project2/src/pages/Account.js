import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

import Nav from "../components/common/Nav";
import Button from "../components/common/Button";
import AccountProfile from "../components/account/AccountProfile";
import AccountGenres from "../components/account/AccountGenres"

import '../styles/Account.css'

import { BiTrim } from "react-icons/bi";
import { FiUser } from "react-icons/fi"

function Account(){

    const [ userInfo, setUserInfo ] = useState({})
    const [ loading, setLoading ] = useState(false)
    
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
            setLoading(true)
        })

    }, [])

    const [ isMovePage, setIsMovePage ] = useState(false)
    const [ currentPage, setCurrnentPage ] = useState("profile")

    useEffect(() => {

        if(isMovePage){
            if(currentPage === "profile"){
                setCurrnentPage("genres")
            }else if(currentPage === "genres"){
                setCurrnentPage("profile")
            }
        }

    }, [isMovePage])

    useEffect(() => {
        setIsMovePage(false)
    }, [currentPage])

    const passwordErrorLabel = (e) => {
        const labels = document.querySelectorAll('.account-page .account-container .account-profile .user-password-container label')
        const passwordInput = labels[0].childNodes[2]
        const checkInput = labels[1].childNodes[2]

        // console.log(passwordInput.value.trim())
        console.log(labels)

        // 입력시 텍스트 크기 변화
        if(passwordInput.value.length !== 0){
            labels[0].childNodes[1].classList.add('focus')
        }else{
            labels[0].childNodes[1].classList.remove('focus')
        }
        
        if(checkInput.value.length !== 0){
            labels[1].childNodes[1].classList.add('focus')
        }else{
            labels[1].childNodes[1].classList.remove('focus')
        }

        // 비밀번호가 일치하지 않을 경우
        if(checkInput.value !== "" && passwordInput.value !== checkInput.value){
            passwordInput.style.borderColor = "red"
            labels[0].childNodes[1].style.color = "red"
            checkInput.style.borderColor = "red"
            labels[1].childNodes[1].style.color = "red"
            labels[1].childNodes[1].innerHTML = "비밀번호가 일치하지 않습니다"
        }else{
            passwordInput.style.borderColor = "#333"
            labels[0].childNodes[1].style.color = "#fff"
            checkInput.style.borderColor = "#333"
            labels[1].childNodes[1].style.color = "#fff"

            if(passwordInput.value === checkInput.value){
                labels[1].childNodes[1].innerHTML = "비밀번호가 일치합니다"
            }else{
                labels[1].childNodes[1].innerHTML = "비밀번호를 다시 입력하세요"
            }
        }

    }

    const changePage = () => {
        setIsMovePage(true)
    }

    const accountVariants = {
        Hidden: {
            x: currentPage === "profile"? -672 : 0
        },
        visible: {
            x: currentPage === "profile"? 0 : -672
        }
    }

    return (
        <div className="account-page">
            <Nav></Nav>
            <div className="account-container">
                <motion.div 
                    className="account-wrapper"
                    variants={accountVariants}
                    initial={!loading? false : "Hidden"}
                    animate={"visible"}
                    transition={{ duration: 0.5 }}
                >
                    <div className={`account-profile`}>   
                        <AccountProfile userInfo={userInfo} handleChange={passwordErrorLabel}/>
                        <div className="account-btn-container">
                            <Button handleClick={changePage}>다음</Button> 
                        </div>
                    </div> 
                    <div className={`account-genres`}>
                        <AccountGenres userInfo={userInfo}/>
                        <div className="account-btn-container">
                            <Button handleClick={changePage}>이전</Button>
                            <Button>수정하기</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Account