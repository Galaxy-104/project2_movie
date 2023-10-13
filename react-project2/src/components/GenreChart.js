import React, { useEffect, useState } from "react"
import ApexCharts from "react-apexcharts"

import '../styles/GenreChart.css'

function GenreChart({ dataArr }){
    const [ labels, setLabels ] = useState([])
    const [ likesData, setLikesData ] = useState([])

    useEffect(() => {
        const result = [...dataArr]

        setLabels(
            result.map((genre) => {
                if(genre.id !== 0){
                return genre.name 
                }
            }).filter((name) => {
                return name !== undefined
            })
        )
        setLikesData(
            result.map((genre) => {
                if(genre.id !== 0){
                    return genre.likes
                }
            }).filter((likes) => {
                return likes !== undefined
            })
        )

    }, [])

    const options = {
        theme: { mode: "dark" },
        chart: {
            id: "genreData",
            background: 'transparent'
        },
        fill: {
            colors: "rgba(182, 12, 12, .7)"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: false,
            colors: 'rgba(182, 12, 12, .7)'
        },
        xaxis: {
            categories: labels,
            labels: {
                show: true,
                style: {
                    colors: '#fff',
                    cssClass: 'genreChart-xaxis-label'
                }
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        }
    }
    const series = [{
        name: '해당 장르를 선택한 사용자 수',
        data: likesData
    }]

    return (
        <div className="chart-container">
            <ApexCharts type="bar" options={options} series={series}/>
            {console.log(labels)}
        </div>
        
    )
}

export default GenreChart