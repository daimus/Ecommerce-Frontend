import axios from 'axios';
import {getSession, signOut} from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8080/';

const ApiClient = () => {
    const defaultOptions = {
        baseURL: baseURL,
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(async (request) => {
        const session = await getSession();
        if (session) {
            request.headers.Authorization = `Bearer ${session.access_token}`;
        }
        return request;
    });

    instance.interceptors.response.use(
        (response) => {

            return response;
        },
        (error) => {
            if (error.response.status === 403){
                signOut()
            }
            console.log(`error`, error);
        },
    );

    return instance;
};

export default ApiClient();