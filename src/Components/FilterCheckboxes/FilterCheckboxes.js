import React from "react";

export default class FilterCheckboxes extends React.Component {
    state= {
        item: true,
        ability: true,
        userSkill: true,
        class: true,
        monster: true,
        default: true
    };

    constructor(props) {
        super(props);
    }

    sendUpdatedAllowed = () => {
        const allowedSet = new Set();
        if(this.state.item) {
            allowedSet.add('item');
        }
        if(this.state.ability) {
            allowedSet.add('ability');
        }
        if(this.state.userSkill) {
            allowedSet.add('userSkill');
        }
        if(this.state.class) {
            allowedSet.add('class');
        }
        if(this.state.monster) {
            allowedSet.add('monster');
        }
        if(this.state.default) {
            allowedSet.add('default');
        }
        this.props.updateAllowedFunction(allowedSet);
    }


    handleItemChecked = (event) => {
        this.setState((previousState) => {
            return {item: !previousState.item};
        }, this.sendUpdatedAllowed);
    };

    handleAbilityChecked = (event) => {
        this.setState((previousState) => {
            return {ability: !previousState.ability};
        }, this.sendUpdatedAllowed);
    };

    handleUserSkillChecked = (event) => {
        this.setState((previousState) => {
            return {userSkill: !previousState.userSkill};
        }, this.sendUpdatedAllowed);
    };

    handleClassChecked = (event) => {
        this.setState((previousState) => {
            return {class: !previousState.class};
        }, this.sendUpdatedAllowed);
    };

    handleMonsterChecked = (event) => {
        this.setState((previousState) => {
            return {monster: !previousState.monster};
        }, this.sendUpdatedAllowed);
    };

    handleDefaultChecked = (event) => {
        this.setState((previousState) => {
            return {default: !previousState.default};
        }, this.sendUpdatedAllowed);
    };

    render() {
        const itemStyle = {color: 'blue'};
        const abilityStyle = {color: 'red'};
        const userSkillStyle = {color: 'green'};
        const classStyle = {color: 'purple'};
        const monsterStyle = {color: 'orange'};
        const defaultStyle = {color: 'black'};

        return (
            <div>
                <span style={itemStyle}>
                    <label>item</label>
                    <input type="checkbox" name="item" value="item" checked={this.state.item} onChange={this.handleItemChecked} />
                    <span>&#160;</span>
                </span>
                <span style={abilityStyle}>
                    <label>ability</label>
                    <input type="checkbox" name="ability" value="ability" checked={this.state.ability} onChange={this.handleAbilityChecked} />
                    <span>&#160;</span>
                </span>
                <span style={userSkillStyle}>
                    <label>userSkill</label>
                    <input type="checkbox" name="userSkill" value="userSkill" checked={this.state.userSkill} onChange={this.handleUserSkillChecked} />
                    <span>&#160;</span>
                </span>
                <span style={classStyle}>
                    <label>class</label>
                    <input type="checkbox" name="class" value="class" checked={this.state.class} onChange={this.handleClassChecked}/>
                    <span>&#160;</span>
                </span>
                <span style={monsterStyle}>
                    <label>monster</label>
                    <input type="checkbox" name="monster" value="monster" checked={this.state.monster} onChange={this.handleMonsterChecked}/>
                    <span>&#160;</span>
                </span>
                <span style={defaultStyle}>
                    <label>default</label>
                    <input type="checkbox" name="default" value="default" checked={this.state.default} onChange={this.handleDefaultChecked} />
                    <span>&#160;</span>
                </span>
                <br />
            </div>
        )
    }
}