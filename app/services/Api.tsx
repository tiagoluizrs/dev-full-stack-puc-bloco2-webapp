import axios from 'axios';

type MediaType = 'movie' | 'tv';

const axios_api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        Accept: 'application/json',
    },
    params: {
        language: 'pt-BR',
    },
});



export const ApiService = {
    getPopulars: async (type: MediaType) => {
        const response = await axios_api.get(`/${type}/popular`, {
            params: { page: 1 },
        });
        return response.data;
    },
    search: async (type: MediaType, query: string) => {
        const response = await axios_api.get(`/search/${type}`, {
            params: {
                query,
                page: 1,
                include_adult: true,
            },
        });
        return response.data;
    },
    getDetails: async (type: MediaType, id: number) => {
        console.log(type)
        console.log(id)
        const response = await axios_api.get(`/${type}/${id}`);
        return response.data;
    },
};