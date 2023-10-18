import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ dataArr }){
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

    const chartData = {
        labels,
        datasets: [{
            data: likesData,
            label: "해당 장르를 좋아하는 사용자 수",
            borderColor: "rgba(182, 12, 12, .7)",
            backgroundColor: "rgba(182, 12, 12, .7)"
        }]
    }

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "#fff"
                }
            }
        }
    }

    return (
        <div className='chart-container'>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default Chart