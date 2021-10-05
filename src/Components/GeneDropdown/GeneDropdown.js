import React, { Component } from 'react';

import { geneData } from '../../Data/winner-1000-run2.js';

const dropdownOptions = [];
for(let i = geneData.minGene; i <= geneData.maxGene; i++) {
    if(i !== 0) {
        dropdownOptions.push(<option value={i}>{i}</option>);
    } else {
        dropdownOptions.push(<option value={i} selected>{i}</option>);
    }
}

class GeneDropdown extends Component {

    updateFunction;

    constructor(props) {
        super(props);
        this.updateFunction = props.updateFunction;
    }

    handleChange = event => {
        this.updateFunction(event.target.value);
    }

    render() {
        const {id} = this.props;
        return (
            <select id={id} onChange={this.handleChange} name={id} key={id}>
                {dropdownOptions}
            </select>
        );
    }
}

export default GeneDropdown;