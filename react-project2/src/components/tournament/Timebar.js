import React, { useState, useEffect } from "react";
import '../../styles/TimeBar.css'

function TimeBar({ counter }){

    const round = [ "16강", "8강", "4강", "결승"]
    const [ roundBar, setRoundBar ] = useState(0)

    const [ sixteen, setSixteen ] = useState(0)
    const [ quarter, setQuarter ] = useState(0)
    const [ semi, setSemi ] = useState(0)
    const [ final, setFinal ] = useState(0)

    useEffect(() => {

        if(counter > 8){
            setSixteen(sixteen + 2)
        }else if(counter > 4){
            setQuarter(quarter + 4)
        }else if(counter > 2){
            setSemi(semi + 8)
        }else{
            setFinal(16)
        }
    }, [counter])

    return (
        <div className="timeBar-container">
            <span>{ counter > 8 ? round[0] :
                    counter > 4 ? round[1] :
                    counter > 2 ? round[2] :
                    round[3]}</span>
            
            <div className="point-container">
                <div className={`point start active`}></div>
                <div className="bar background">
                    <div 
                        className="bar round" 
                        style={{ 
                            width: `${ counter > 8 ? sixteen :
                                    counter > 4 ? quarter :
                                    counter > 2 ? semi :
                                    final }rem`}}
                    ></div>
                </div>
                <div className={`point end 
                                ${counter > 8 && sixteen === 16 ? "active" :
                                    counter > 4 && quarter === 16 ? "active" :
                                    counter > 2 && semi === 16 ? "active" :
                                    final === 16 ? "active" : ""}`}></div>
            </div>
        </div>
    )
}

export default TimeBar