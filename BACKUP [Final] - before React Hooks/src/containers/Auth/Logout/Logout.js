import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogoutHandler(2);
    }

    render() {
        return (
            <div style={{ fontSize: 'xxx-large', textAlign: 'center', color: '#ffb657' }} >
                <p>
                    You have been successfully logged-out!
                </p>
                <p style={{ fontSize: 'xx-large' }}>
                    Redirecting to burger builder...
                </p>
                <Spinner />
                {this.props.isAuth ? null : <Redirect to="/" />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogoutHandler: (time) => dispatch(actionCreators.authLogoutHandler(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);