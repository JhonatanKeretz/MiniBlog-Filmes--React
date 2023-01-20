//base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=9f4669b483ff6e34169981a24564f287language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;
