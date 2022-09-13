import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { Paper, makeStyles, Typography, OutlinedInput, FormControl, InputLabel, Button } from '@material-ui/core';
import styles from './Auth.module.css'
import { registerUser } from '../../api/index.js'
import { publicRequest } from '../../api/requestMethods';

const useStyles = makeStyles({
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '60%', width: '30%' },
    input_style: { borderRadius: '20px', width: '375px' },
    button_style: { borderRadius: '20px', width: '150px', background: 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(0,255,0,0.5) 50%, rgba(0,0,255,0.5) 100%)' }
})

const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [hashedOtp, setHashedOtp] = useState("")
    const [user, setUser] = useState({ name: "", email: "", password: "", re_password: "" });
    const [cookies, setCookie, removeCookie] = useCookies(['access-token']);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    const clickHandler = async () => {
        setError("");
        console.log("Clicked");
        console.log(user);
        if (user.password === user.re_password) {
            console.log("Password matched")
            const data = await registerUser({ ...user, otp, hashedOtp });
            if (data?.error !== undefined) {
                setError(data.error);
                console.log(error);
            } else {
                console.log(data);
                if (data?.access_token !== undefined) {
                    setCookie("access-token", data.access_token, { path: '/' });

                    navigate('/');
                }
            }
        }
    }

    const generateOtp = async () => {
        const res = await publicRequest.post("/auth/otp/", { email: user.email });
        console.log(res.data)
        setHashedOtp(res.data.hashedOtp)
        setStep(2);
    }

    return (
        <div className={styles.backdrop}>
            <Paper className={classes.container}>
                <div className={classes.container}>
                    <FormControl variant="outlined" >
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput type="text" label="Name" className={classes.input_style} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                    </FormControl>
                    {step === 1 && <FormControl variant="outlined" >
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput type="email" label="Email" className={classes.input_style} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                    </FormControl>}
                    <FormControl variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput type="password" label="Password" className={classes.input_style} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Re-Password</InputLabel>
                        <OutlinedInput type="password" label="Re-Password" className={classes.input_style} onChange={(e) => { setUser({ ...user, re_password: e.target.value }) }} />
                    </FormControl>
                    {step === 2 && <FormControl variant="outlined" >
                        <InputLabel>OTP</InputLabel>
                        <OutlinedInput type="text" label="Otp" className={classes.input_style} onChange={(e) => { setOtp(e.target.value) }} />
                    </FormControl>}
                </div>
                {step === 2 && <Button variant="outlined" className={classes.button_style} onClick={clickHandler}>Sign Up</Button>}
                {step === 1 && <Button variant="outlined" className={classes.button_style} onClick={generateOtp}>Generate Otp</Button>}
            </Paper>
            {error !== "" &&
                <Typography variant="h6" color="error">{error}</Typography>
            }
        </div>
    )
}

export default SignUp
