import React, { Component } from 'react';

const AsyncComponent = (importedComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importedComponent()
                .then(response => {
                    this.setState({ component: response.default });
                });
        }

        render() {
            const Comp = this.state.component;
            return Comp ? <Comp {...this.props} /> : null;
        }
    }
}

export default AsyncComponent;