import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { FiUser } from "react-icons/fi"

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

    console.log(userInfo)

    return (
        <div className="account-page">
            <Nav></Nav>
            <div className="account-container">
                <div className="user-account">
                    <div className="user-profile">
                        <div className="profile-img"></div>
                        <div className="user-name">
                            <label htmlFor="user-id">
                                <FiUser size="20" color="#fff"/>
                                <input type="text" id="user-id"/>
                            </label>
                            <div className="user-email">
                                <span className="user-email">{userInfo.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="user-password"></div>
                    <div className="user-likes"></div>
                </div>
            </div>
            
        </div>
    )
}

export default Account