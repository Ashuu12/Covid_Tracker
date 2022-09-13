import { categories } from '../data'
import CategoryItem from './CategoryItem'
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    categories: { display: 'flex', padding: '15px', justifyContent: 'space-between', gap: "15px" }
})

const Categories = () => {
    const classes = useStyles()

    return (
        <div className={classes.categories}>
            {categories.map(item => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </div>
    )
}

export default Categories;