import axios from 'axios';

const url = 'https://api.frontendeval.com/fake/word';


async function apiCall() {
    const res = await axios.get(url)
    console.log(res.data);
}

apiCall();