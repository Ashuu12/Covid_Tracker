import { useState, useEffect } from 'react';
import { fetchHistoricalData } from '../../api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, BarElement } from 'chart.js';
import styles from './ChartComponent.module.css'
import { Chart } from 'react-google-charts'

import { makeStyles, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles({
    graph: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginRight: '20px' },
})

const ChartComponent = ({ data, country }) => {
    const classes = useStyles();
    console.log(data)

    const [historicalData, setHistoricalData] = useState([]);
    console.log(historicalData)

    useEffect(() => {
        (async () => {
            setHistoricalData(await fetchHistoricalData());
        })();
    }, [])

    ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, BarElement);

    const barChart = (
        data !== undefined && data.confirmed !== undefined ? (
            <Bar
                className={classes.graph}
                data={{
                    labels: [`Infected`, `Recovered`, `Deaths`],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,155,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)'],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `Current state in ${country}`
                    }
                }}
            ></Bar>
        ) : <div>Loading...</div>
    )

    const lineChart = (
        historicalData.length !== 0 ?
            <Chart
                className={classes.graph}
                height={"95%"}
                chartType="Line"
                data={historicalData}
                loader={<div>Loading Chart</div>}
                options={{
                    colors: [
                        '#7f7fff',
                        '#ff7f7f'
                    ],
                }}
            >
            </Chart> : <div>Loading...</div>
    )

    return (
        <Card class="imp">
            <CardContent style={{ backgroundColor: "#ffede9", width: "900px", borderRadius: "10px", paddingRight: "10px", height: "500px", paddingBottom: "10px" }}>
                {country === "global" ? lineChart : barChart}
            </CardContent>
        </Card>
    )
}

export default ChartComponent;