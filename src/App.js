import { observer } from "mobx-react";

import './App.css';
import GeneForm from "./Components/GeneForm/GeneForm";
import React from "react";
import GeneratedXml from "./Components/GeneratedXml/GeneratedXml";
import FilterCheckboxes from "./Components/FilterCheckboxes/FilterCheckboxes";
import {DefaultTips, getTipData} from "./Service/TipsService";
import LoadingComponent from "./Components/LoadingComponent/LoadingComponent";

const GeneratedXmlView = observer(({dataMap, inverse, botName, description, tips}) => (
    <GeneratedXml dataMap={dataMap} inverse={inverse} botName={botName} description={description} tips={tips}></GeneratedXml>
));

const LoadingView = observer(({loading}) => (
        <LoadingComponent loading={loading}></LoadingComponent>
));

export default class App extends React.Component {
  state = {
    data: new Map(),
    inverse: false,
    botName: "",
    description: "",
    allowed: new Set(['item', 'ability', 'userSkill', 'class', 'default']),
    tips: new DefaultTips(),
    loading: true
  }

  componentDidMount() {
      getTipData().then(tipData => {
          this.setState({tips: tipData, loading:false})
          }
      );
  }

    updateData = (dropdownKey, dropdownValue) => {
    this.setState((previousState) => {
      const newMap = new Map(previousState.data);
      newMap.set(dropdownKey, dropdownValue);
      return {data: newMap};
    });
  }

  updateInverseCheckbox = () => {
    this.setState((previousValue) => {
        return {inverse: !previousValue.inverse}
    });
  }

  updateBotName = (botNameValue) => {
    if(botNameValue !== this.state.botName) {
      this.setState({botName: botNameValue});
    }
  }

  updateDescription = (descriptionValue) => {
    this.setState({description: descriptionValue});
  }

  updateAllowed = (newAllowedData) => {
    this.setState({allowed: newAllowedData});
  }



  render() {
    return (
      <div className="App">
        <h1>Viewer Manual Bot Creator Application</h1>
        <h2>Allows a user to create a bot that utilizes the same code as the gene driven bots use</h2>
        <br />
        <FilterCheckboxes updateAllowedFunction={this.updateAllowed}></FilterCheckboxes>
        <LoadingView loading={this.state.loading}></LoadingView>
        <GeneForm allowed={this.state.allowed}
                      updateFunction={this.updateData}
                      updateInverse={this.updateInverseCheckbox}
                      updateBotName={this.updateBotName}
                      updateDescription={this.updateDescription}
                      tips={this.state.tips}></GeneForm>
        <br />
        <GeneratedXmlView dataMap={this.state.data} inverse={this.state.inverse} botName={this.state.botName} description={this.state.description} tips={this.state.tips}></GeneratedXmlView>
        <br />
      </div>
    )
  }
}
