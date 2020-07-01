import axios from "axios";

export const httpClient = (config) => {
    const req = {
        method: config.method,
        url: config.url,
        params: config.params,
        data: config.data,
        headers: config.headers,
    };
    return axios(req)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const get = (config) => httpClient({
    ...config,
    method: 'get',
});

export const post = async (config) => { 
    return await httpClient({...config,method: 'post',});
}