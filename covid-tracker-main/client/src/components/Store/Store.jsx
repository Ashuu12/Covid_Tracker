import { makeStyles } from "@material-ui/core"
import Categories from "./Categories/Categories"
import Products from "./Products/Products"
import Slider from "./Slider/Slider"


const useStyles = makeStyles({

})

const Store = () => {
    return (
        <div>
            <Slider />
            <Categories />
            <Products cat="covid" filters={{ colors: "none" }} sort="newest" />
        </div>
    )
}

export default Store