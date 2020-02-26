import React, {Component} from "react"
import { FormattedMessage } from 'react-intl';

class SettingsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Settings Component");
    }
    
    render(){
        return(
            <h1>
                <FormattedMessage id="settings.title" defaultMessage="Settings" />
            </h1>
        )
    }
}

export default SettingsComponent;