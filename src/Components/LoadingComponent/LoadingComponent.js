import React from "react";

export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {loading} = this.props;
        return (
            <span>
                { loading && (
                    <h3>Loading Description Data...</h3>
                )}
            </span>
        )
    }
}