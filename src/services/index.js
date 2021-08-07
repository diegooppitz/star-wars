import axios from 'axios';

export const getPerson = (page = '1') => {
    return axios({
        method: 'GET',
        url: `https://swapi.dev/api/people/?page=${page}`
    })
}