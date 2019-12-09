import React, {Component} from "react"

class SettingsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Settings Component");
    }
    
    render(){
        return(
            <h1>This is the Settings component</h1>
        )
    }
}

export default SettingsComponent;