import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {

        state = {
            error: null
        };

        componentWillMount() { // constructor can be used instead!!!
            // we want to add it first before Child components can be handled
            this.requestInterceptor = axiosInstance.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });

            this.responseInterceptor = axiosInstance.interceptors.response.use(response => response, error => {
                this.setState({
                    error: error // object returned by firebase!
                });
            });
        };

        componentWillUnmount() { // if we use functional component, than we will do this in RETURN method of useEffect
            console.log('Will unmount from withErrorHandler', this.requestInterceptor, this.responseInterceptor);
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.request.eject(this.responseInterceptor);
        };

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        };

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withErrorHandler;