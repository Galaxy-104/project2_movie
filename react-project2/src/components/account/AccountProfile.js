import React, { useEffect, useState } from "react";

import { FiUser, FiMail } from "react-icons/fi"
import { BiSolidLock } from "react-icons/bi"
import { AiFillCheckSquare, AiOutlineCheckCircle } from "react-icons/ai"


function AccountProfile({ handleChange, userInfo }){

    // console.log(userInfo)

    useEffect(() => {
        if(userInfo.userId !== undefined){

            const idInput = document.querySelector('.account-page input#user-id')
            idInput.value = userInfo.userId
        }
    }, [userInfo])

    return (
        <>
            <div className="user-profile">
                <label htmlFor="user-id">
                    <FiUser size="27" stroke="#333"/>
                    <input type="text" id="user-id" placeholder="아이디를 입력하세요"/>
                </label>
                <div className="user-email">
                    <div className="email-icon">
                       <FiMail size="27" stroke="#333"/> 
                    </div>
                    <span className="user-email">
                        {userInfo.email}
                    </span>
                </div>
            </div>
            <div className="user-password-container">
                <label htmlFor="user-password">
                    <BiSolidLock size="27" fill="#333"/>
                    <span className="password-label">비밀번호를 입력하세요</span>
                    <input type="password" id="user-password" onChange={handleChange}/>
                </label>
                <label htmlFor="user-password-check">
                    <AiFillCheckSquare size="27" style={{ opacity: 0 }}/>
                    <span className="password-label">비밀번호를 다시 입력하세요</span>
                    <input type="password" id="user-password-check" onChange={handleChange}/>
                </label>
            </div>
        </>
    )
}

export default AccountProfile