import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { Paper, makeStyles, Typography, OutlinedInput, FormControl, InputLabel, Button } from '@material-ui/core';
import styles from './Auth.module.css'
import { loginAdmin } from '../../api/admin';

const useStyles = makeStyles({
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '60%', width: '30%' },
    input_style: { borderRadius: '20px', width: '375px' },
    button_style: { borderRadius: '20px', width: '150px', background: 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(0,255,0,0.5) 50%, rgba(0,0,255,0.5) 100%)' }
})

const LogIn = () => {
    const classes = useStyles();

    const [admin, setAdmin] = useState({ adminId: "", password: "" });
    const [cookies, setCookie, removeCookie] = useCookies(['access-token']);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const clickHandler = async () => {
        console.log("Clicked");
        const data = await loginAdmin(admin);
        console.log(data);
        if (data.error !== undefined) {
            setError(data.error);
        } else {
            if (data.access_token !== undefined) {
                setCookie("access-token", data.access_token, { path: '/' });
                navigate('/home');
            }
        }
    }

    return (
        <div className={styles.backdrop}>
            <Paper className={classes.container}>
                <div className={classes.container}>
                    <FormControl variant="outlined" >
                        <InputLabel>Admin Id</InputLabel>
                        <OutlinedInput type="text" label="Admin Id" className={classes.input_style} onChange={(e) => { setAdmin({ ...admin, adminId: e.target.value }) }} />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput type="password" label="Password" className={classes.input_style} onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }} />
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
