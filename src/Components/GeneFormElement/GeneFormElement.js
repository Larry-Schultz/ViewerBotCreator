import React, { Component } from 'react';
import GeneDropdown from "../GeneDropdown/GeneDropdown";

class GeneFormElement extends Component {

     render() {
         const {geneName, updateFunction} = this.props;
         const geneLabel = geneName + 'Label';
         const geneDropdownId = geneName + 'Dropdown';

         const geneDescription = this.props.tips.descriptionLookup(geneName);
         const labelStyle = {color: this.props.tips.descriptionColor(geneName)};
         return (
             <span key={geneName}>
                 { this.props.allowed.has(this.props.tips.descriptionType(geneName)) && (
                     <span>
                         <label key={geneLabel} id={geneLabel} htmlFor={geneDropdownId} title={geneDescription} style={labelStyle}>{geneName}</label>
                         <span>&#160;</span>
                         <GeneDropdown key={geneDropdownId} id={geneDropdownId} updateFunction={updateFunction}></GeneDropdown>
                         <br />
                     </span>
                 )}
             </span>
         );
     }
 }

 export default GeneFormElement;