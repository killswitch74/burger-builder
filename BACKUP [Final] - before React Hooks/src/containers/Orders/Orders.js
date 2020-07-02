import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Order } from '../../components/Order/Order';
import axios from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {

        return (
            <div>
                <p style={{fontSize: 'xxx-large'}}>My Orders</p>
                {this.props.loader ? <Spinner />
                    : this.props.orders.map(current => {
                        return <Order
                            key={current.id}
                            ingredients={current.ingredients}
                            price={current.price}
                        />
                    })}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loader: state.order.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));