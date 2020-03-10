import React, {Component} from "react"
import { FormattedMessage } from 'react-intl';
import './settings.component.css';

class SettingsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Settings Component");
    }
    
    render(){
        return(
            <div className="settings-container">
                <h1>
                    <FormattedMessage id="settings.title" defaultMessage="Settings" />
                </h1>
            </div>
        )
    }
}

export default SettingsComponent;