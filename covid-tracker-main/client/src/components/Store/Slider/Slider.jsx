import { useState } from 'react'
import { makeStyles } from "@material-ui/core"
import { ArrowRightOutlined, ArrowLeftOutlined } from "@material-ui/icons"
import cx from 'classnames'
import { sliderItems } from './sliderData'

const useStyles = makeStyles({
    slider: { height: "85.7vh", overflow: "hidden" },
    arrow: { width: "50px", height: "50px", backgroundColor: "#fff7f7", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", position: "absolute", top: "50%", opacity: "0.7", zIndex: "2" },
    left: { left: "10px" },
    right: { right: "10px" },
    wrapper: { height: "100%", display: "flex", width: "min-content", transition: "all 1.5s ease" },
    slide: { display: "flex", alignItems: "center", height: "100%", width: "100vw" },
    imageContainer: { flex: 2.5, height: "100%", display: "flex" },
    img: { height: "100%", width: "50%", objectFit: "cover" },
    infoContainer: { flex: 1, margin: "20px" },
    title: { fontSize: "50px" },
    description: { textAlign: "justify", margin: "50px 0px", fontWeight: "520", letterSpacing: "3px" },
    button: { backgroundColor: "teal", color: "white", fontSize: "20px", padding: "10px", borderRadius: "10px", cursor: "pointer" },
    coral: { backgroundColor: "coral" }
})

const Slider = () => {
    const classes = useStyles();
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (arrow) => {
        if (arrow === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }
        if (arrow === "right") {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    return (
        <div className={classes.slider}>
            <div className={cx(classes.arrow, classes.left)} onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </div>
            <div className={classes.wrapper} style={{ transform: `translate(${-slideIndex * 100}vw)` }} >
                {sliderItems.map(item => (
                    <div className={cx(classes.slide, classes.coral)} key={item.id}>
                        <div className={classes.imageContainer}>
                            <img src={item.img1} className={classes.img} />
                            <img src={item.img2} className={classes.img} />
                        </div>
                        <div className={classes.infoContainer}>
                            <h1 className={classes.title}>{item.title}</h1>
                            <p className={classes.description}>{item.description}</p>
                            <button className={classes.button}>Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx(classes.arrow, classes.right)} onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </div>
        </div>
    )
}

export default Slider