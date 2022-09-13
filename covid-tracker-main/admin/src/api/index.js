import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

const url2 = "https://corona.lmao.ninja/v2";

const url3 = "http://localhost:5000";



export const fetchData = async (country) => {
    let changableUrl = `${url2}/all?yesterday`;

    if (country && country !== "global") {
        // changableUrl = `https://corona.lmao.ninja/v2/countries/india?yesterday=true&strict=true&query`;
        changableUrl = `${url2}/countries/${country}?yesterday=true&strict=true&query`;
    }

    try {
        const { data: {
            cases, recovered, deaths, updated
        } } = await axios.get(changableUrl);

        const maindata = {
            confirmed: { value: cases }, recovered: { value: recovered }, deaths: { value: deaths }, lastUpdate: new Date(updated).toISOString(),
        }
        console.log(maindata)
        return maindata;
    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {

    }
}

export const fetchHistoricalData = async (days) => {
    let changableUrl = `${url2}/historical/all?lastdays=1500`;
    if (days) {
        changableUrl = `${url2}/historical/all?lastdays=${days}`;
    }
    try {
        const { data: { cases, deaths } } = await axios.get(changableUrl);

        const dates = Object.keys(cases);
        const casesValues = Object.values(cases);
        const deathValues = Object.values(deaths);

        const l = dates.length;
        let structuredData = [['Dates', 'Cases', 'Deaths']];
        for (let i = 0; i < l; i++) {
            structuredData.push([dates[i], casesValues[i], deathValues[i]]);
        }
        return structuredData;
    } catch (error) {

    }
}

export const registerUser = async ({ name, email, password }) => {
    try {
        const data = await axios.post(`${url3}/api/auth/register`, { name, email, password });
        console.log(data.data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${url3}/api/auth/login`, { email, password });
        return data;
    } catch (error) {
        console.log(error);
    }
}