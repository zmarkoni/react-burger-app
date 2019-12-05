import {useEffect, useState} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // we want to add it first before Child components can be handled
    const requestInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });
    const responseInterceptor = httpClient.interceptors.response.use(response => response, err => {
        setError(err);
    });

    useEffect(() => { // constructor can be used instead!!!
        return function cleanup() {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.request.eject(responseInterceptor);
        };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};