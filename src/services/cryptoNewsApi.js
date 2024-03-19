import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cyptoNewsHeader = {
    'X-RapidAPI-Key': '19ba71cb10msh2cc1ac42b531954p182b27jsneb20be818cc1',
    'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
}

const baseUrl = "https://duckduckgo10.p.rapidapi.com/search/news";

const createRequest = (url) => ({ url, headers: cyptoNewsHeader });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (newsCategory) => createRequest(`?term=${newsCategory}?&region=in-en&safeSearch=off`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;