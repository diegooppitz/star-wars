import axios from 'axios';

export const getCharacters = (page = '1') => {
    return axios({
        method: 'GET',
        url: `https://swapi.dev/api/people/`,
        params: {
            page,
        }
    })
}


export const getCharacterById = (id) => {
    return axios({
        method: 'GET',
        url: `https://swapi.dev/api/people/${id}`,
    })
}

export const searchCharacter = (searchTerm, page) => {
    return axios({
        method: 'GET',
        url: `https://swapi.dev/api/people/`,
        params: {
            search: searchTerm,
            page,
        }
    })
}