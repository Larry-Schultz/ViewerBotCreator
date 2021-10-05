import React, { Component } from 'react';

import { geneData } from '../../Data/winner-1000-run2.js';
import GeneFormElement from "../GeneFormElement/GeneFormElement";
import {observer} from "mobx-react";

const GeneFormElementView = observer(({key, geneName, updateFunction, allowed, tips}) => (
    <GeneFormElement key={key} geneName={geneName} updateFunction={updateFunction} allowed={allowed} tips={tips}></GeneFormElement>
));

class GeneForm extends Component {

    updateFunction;

    constructor(props) {
        super(props);
        this.updateFunction = this.props.updateFunction;

        this.state = {
            inverse: false
        }
    }

    updateInverse = (event) => {
        this.props.updateInverse();
        this.setState((previousValue) => {
            return {inverse: !previousValue.inverse}
        });
    }

    updateBotName = (event) => {
        this.props.updateBotName(event.target.value);
    }

    updateDescription = (event) => {
        this.props.updateDescription(event.target.value);
    }

    sortGeneAttributes(firstAttribute, secondAttribute) {
        return firstAttribute.key.localeCompare(secondAttribute.key);
    }

    formElements(geneData) {
        return geneData.geneticAttributes
            .sort(this.sortGeneAttributes)
            .filter((geneAttribute) => geneAttribute.key)
            .filter((geneAttribute) => !/^\d/.test(geneAttribute.key))
            .map((geneAttribute) => {
                const keyName = geneAttribute.key + 'Key';
                const geneAttributeValue = geneAttribute.key;
                const geneFormElementUpdateFunction = (value) => this.updateFunction(geneAttributeValue, value);
                return <GeneFormElementView key={keyName} geneName={geneAttributeValue} updateFunction={geneFormElementUpdateFunction} allowed={this.props.allowed} tips={this.props.tips}></GeneFormElementView>
             });
    }

    render() {
        const botNameInputId = 'botNameInputBox';
        const botDescriptionId = 'botDescriptionInputBox';
        return (
            <form>
                <br />
                <span>
                    <label htmlFor={botNameInputId}>Bot Name: </label>
                    <input type="text" name={botNameInputId} id={botNameInputId} onBlur={this.updateBotName}/>
                    <br />
                </span>
                <span>
                    <label htmlFor={botDescriptionId}>Bot Description: </label>
                    <input type="text" name={botDescriptionId} id={botDescriptionId} onBlur={this.updateDescription}/>
                    <br />
                </span>
                <span>
                    <label>inverse?</label>
                    <input type="checkbox" checked={this.state.inverse} onChange={this.updateInverse}/>
                    <br /><br />
                </span>
                <span>
                    {this.formElements(geneData)}
                </span>
            </form>
        );
    }
}

export default GeneForm;