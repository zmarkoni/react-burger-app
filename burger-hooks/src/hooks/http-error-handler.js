import {useEffect, useState} from 'react';

// httpClient will be axios
export default (httpClient) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        return function cleanup() {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.request.eject(responseInterceptor);
        };
    }, [requestInterceptor, responseInterceptor]);

    // we want to add it first before Child components can be handled
    const requestInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });

    const responseInterceptor = httpClient.interceptors.response.use(response => response, err => {
        setError(err);
    });

    const clearError = () => {
        setError(null);
    };

    return [error, clearError];
};