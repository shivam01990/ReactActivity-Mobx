import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activiy } from "../models/Activity";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            //toast.error('bad request');
            if(data.errors)
            {
                const modalStateErrors=[];
                for(var key in data.errors)
                {
                    if(data.errors[key])
                    {
                    modalStateErrors.push(key); 
                    }                   
                }

                throw modalStateErrors.flat();
            }else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');           
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            //toast.error('server error');
    }

   return Promise.reject(error);

})

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activiy[]>('/activities'),
    details: (id: string) => requests.get<Activiy>(`/activities/${id}`),
    create: (activity: Activiy) => axios.post<void>('/activities', activity),
    update: (activity: Activiy) => axios.put<void>(`/activities`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;