import React, { useEffect } from "react";
import Genres from '../api/Genres.json'

function AccountGenres({ handleClick, userInfo }){

    useEffect(() => {
        
        if(userInfo.likeGenre !== undefined){
            // console.log(userInfo.likeGenre)
            const genreCheckBoxes = document.querySelectorAll('.account-page .inputs input')
            genreCheckBoxes.forEach((checkBox) => {
                if(userInfo.likeGenre.includes(checkBox.value)){
                    checkBox.checked = true
                }
            })
        }
       
    }, [userInfo])

    return (
        <div className="user-likes">
            <h4>좋아하는 장르를 3개 이상 선택해주세요!</h4>
            <div className="input-box">
            {Genres.genres.map((genre,id) => {
                // console.log(genre)
                return (
                    <div className="inputs" key={id}>
                        <input type='checkbox' name='genre' id={genre.name} value={genre.id} onClick={handleClick}/>
                        <label htmlFor={genre.name}>{genre.name}</label>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default AccountGenres