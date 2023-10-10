import React from "react";
import Nav from "../components/Nav";

function Account(){


    return (
        <div className="account-page">
            <Nav></Nav>
            <div className="user-account">
                <div className="user-profile">
                    <div className="profile-img"></div>
                    <div className="user-name">
                        <div className="user-id"></div>
                        <div className="user-email"></div>
                    </div>
                </div>
                <div className="user-password"></div>
                <div className="user-likes"></div>
            </div>
        </div>
    )
}

export default Account