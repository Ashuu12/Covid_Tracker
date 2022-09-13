import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { Paper, makeStyles, Typography, OutlinedInput, FormControl, InputLabel, Button } from '@material-ui/core';
import styles from './Auth.module.css'
import { loginUser } from '../../api';
import { userRequest } from '../../api/requestMethods';

const useStyles = makeStyles({
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '60%', width: '30%' },
    input_style: { borderRadius: '20px', width: '375px' },
    button_style: { borderRadius: '20px', width: '150px', background: 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(0,255,0,0.5) 50%, rgba(0,0,255,0.5) 100%)' }
})

const LogIn = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });
    const [cookies, setCookie, removeCookie] = useCookies(['access-token']);
    const [error, setError] = useState("");


    const clickHandler = async () => {
        setError("");
        console.log("Clicked");
        console.log(user);
        const data = await loginUser(user);
        if (data.error !== undefined) {
            setError(data.error);
            console.log(error);
        } else {
            console.log(data);
            if (data.access_token !== undefined) {
                setCookie("access-token", data.access_token, { path: '/' });
                navigate('/');
            }
        }
    }

    return (
        <div className={styles.backdrop}>
            <Paper className={classes.container}>
                <div className={classes.container}>
                    <FormControl variant="outlined" >
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput type="email" label="Email" className={classes.input_style} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput type="password" label="Password" className={classes.input_style} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                    </FormControl>
                </div>
                <Button variant="outlined" className={classes.button_style} onClick={clickHandler}>Log In</Button>
            </Paper>
            {error !== "" &&
                <Typography variant="h6" color="error">{error}</Typography>
            }
        </div>
    )
}

export default LogIn
