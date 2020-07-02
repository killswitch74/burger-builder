/////////////////////////////// FUNCTIONAL COMPONENT ////////////////////////////////////
// Have to use Functional Component here because componentWillUpdate() is deprecated.

import React, {useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import {Auxiliary} from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    const WithErrorHandler = props => {

        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });
        const resInterceptor = axios.interceptors.response.use(response => response, error => {
            setError(error);
            return Promise.reject(error);
        });

        useEffect (() => {
            return () => {
                // axios.interceptors.request.eject(reqInterceptor);
                // axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        return (
            <Auxiliary>
                <WrappedComponent {...props} />
                <Modal show={error} modalClosed={() => setError(null)}>
                    {error ? error.message : null}
                </Modal>
            </Auxiliary>
        );
    };
    return WithErrorHandler;
};

export default withErrorHandler;


/////////////////////////////// CLASS-BASED COMPONENT ////////////////////////////////////
// Here componentWillMount() is used which is no longer used in React.

// import React, {Component} from 'react';
// import Modal from '../../components/UI/Modal/Modal';
// import { Auxiliary } from '../Auxiliary';

// export const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends Component {
        
//         state = {
//             error: null
//         }

//         componentWillMount () {
//             axios.interceptors.request.use(request => {
//                 this.setState({error: null});
//                 return request;
//             });
//             axios.interceptors.response.use(response => response, error => {
//                 this.setState({error: error});
//                 return Promise.reject(error);
//             });
//         }

//         modalClosedHandler = () => {
//             this.setState({error: null});
//         }

//         render () {
//             return (
//                 <Auxiliary>
//                     <WrappedComponent {...this.props} />
//                     <Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                 </Auxiliary>
//             );
//         }
//     }
// }