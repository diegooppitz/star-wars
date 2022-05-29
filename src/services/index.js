import axios from "axios";

export const getCharacters = (page = "1") => {
  return axios({
    method: "GET",
    url: `https://swapi.dev/api/people/`,
    params: {
      page,
    },
  });
};

export const getCharacterById = id => {
  return axios({
    method: "GET",
    url: `https://swapi.dev/api/people/${id}`,
  });
};

export const searchCharacter = (searchTerm, page) => {
  return axios({
    method: "GET",
    url: `https://swapi.dev/api/people/`,
    params: {
      search: searchTerm,
      page,
    },
  });
};

export const getPlanetByUrl = url => {
  return axios({
    method: "GET",
    url: `${url}`,
  });
};

export const getFilmsByUrls = url => {
  return axios({
    method: "GET",
    url: `${url}`,
  });
};

export const getStarshipsByUrls = url => {
  return axios({
    method: "GET",
    url: `${url}`,
  });
};

export const getVehiclesByUrls = url => {
  return axios({
    method: "GET",
    url: `${url}`,
  });
};
