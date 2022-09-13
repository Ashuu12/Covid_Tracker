import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import CountUp from 'react-countup';

const useStyles = makeStyles({
    container: { marginLeft: '1rem', display: 'grid', gridGap: 20 },
    infected: { borderBottom: '10px solid rgba(0, 0, 255, 0.5)' },
    recovered: { borderBottom: '10px solid rgba(0, 255, 0, 0.5)' },
    deaths: { borderBottom: '10px solid rgba(255, 0, 0, 0.5)' },
    fakeBlue: { backgroundColor: "#dfebff" }
})

const Cards = ({ data }) => {
    const classes = useStyles();
    // console.log(data)
    const { confirmed, recovered, deaths, lastUpdate } = data;

    if (!confirmed) {
        return 'Loading...';
    }
    return (
        <div className={classes.container}>
            <Card className={classes.infected}>
                <CardContent className={classes.fakeBlue}>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={confirmed.value}
                            duration={2}
                            separator=","
                        ></CountUp>
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of active cases of COVID-19</Typography>
                </CardContent>
            </Card>
            <Card className={classes.recovered}>
                <CardContent className={classes.fakeBlue}>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={recovered.value}
                            duration={2}
                            separator=","
                        ></CountUp>
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Card>
            <Card className={classes.deaths} >
                <CardContent className={classes.fakeBlue}>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={deaths.value}
                            duration={2}
                            separator=","
                        ></CountUp>
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Cards;