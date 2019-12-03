import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
        return props => {
            const [error, setError] = useState(null);

            // we want to add it first before Child components can be handled
            const requestInterceptor = axiosInstance.interceptors.request.use(request => {
                setError(null);
                return request;
            });
            const responseInterceptor = axiosInstance.interceptors.response.use(response => response, err => {
                setError(err);
            });

            useEffect(() => { // constructor can be used instead!!!
                return function cleanup() {
                    axiosInstance.interceptors.request.eject(requestInterceptor);
                    axiosInstance.interceptors.request.eject(responseInterceptor);
                };
            }, [requestInterceptor, responseInterceptor]);

            const errorConfirmedHandler = () => {
                setError(null);
            };

            return (
                <Aux>
                    <Modal
                        show={error}
                        modalClosed={errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            )

        }
            ;
    }
;

export default withErrorHandler;