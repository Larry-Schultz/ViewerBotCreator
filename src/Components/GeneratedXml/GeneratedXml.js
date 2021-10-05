import React from "react";


export default class GeneratedXml extends React.Component {
    state = {
        xml: ""
    }

    generateXml = (dataMap, inverse, botName, description, tips) => {
        let xml = "";
        const header = "<bot id=\"" + botName + "\" classname=\"unitAwareBot\" canPrimary=\"false\" description=\"" + description + "\">\n";
        let inverseLine = "";
        if(inverse) {
            inverseLine = "\t<param id=\"inverse\" description=\"The bot behavior is inversed\">" + inverse.toString() + "</param>\n";
        }
        const paramLines = [];
        for (const [key, value] of dataMap.entries()) {
           if(value !== 0) {
               const newParam = "\t<param id=\"" + key + "\" description=\"" + tips.descriptionLookup(key) + "\">" + value + "</param>\n";
               paramLines.push(newParam);
           }
        }
        const footer = '</bot>\n';
        xml = header;
        xml = xml + inverseLine;
        paramLines.forEach((param) =>  xml = xml + param);
        xml = xml + footer;
        this.xml = xml;

        const rows = 10 + paramLines.length;
        const textAreaStyle = {
            height: 'auto',
            width: '98%',
        };

        return (
            <textarea readOnly id="generatedXmlTextArea" rows={rows} value={xml} style={textAreaStyle}>
            </textarea>
        )
    }

    handleCopy = () => {
        navigator.clipboard.writeText(this.state.xml);
    }

    render() {
        const {dataMap, inverse, botName, description, tips} = this.props;
        return (
            <div>
                {this.generateXml(dataMap, inverse, botName, description, tips)}
                <br />
                <button onClick={this.handleCopy}>Copy to clipboard</button>
            </div>
        )
    }
}