import axios from 'axios';
import cookies from 'js-cookie'

const url3 = "http://127.0.0.1:5000";

export const saveArticle = async ({ itemList, article }) => {
    let changableUrl = `${url3}/api/article/save`;
    try {
        const data = await axios.post(changableUrl, {
            access_token: cookies.get("access-token"),
            itemList,
            article
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getArticles = async () => {
    let changableUrl = `${url3}/api/article/`;
    try {
        const data = await axios.get(changableUrl);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getSingleArticle = async (id) => {
    let changableUrl = `${url3}/api/article/${id}`;
    try {
        const data = await axios.get(changableUrl);
        return data;
    } catch (error) {
        console.log(error)
    }
}