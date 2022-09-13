import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    container: { minHeight: "4vh", backgroundColor: "teal", color: "white", display: "grid", alignItems: "center", justifyItems: "center", fontSize: "17px", fontWeight: "700" }
})

const Announcement = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            Super Deal! Free shipping on orders over Rs. 500
        </div>
    )
}

export default Announcement;