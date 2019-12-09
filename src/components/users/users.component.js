import React, {Component} from "react"

class UsersComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Users Component");
    }
    
    render(){
        return(
            <h1>This is the Users component</h1>
        )
    }
}

export default UsersComponent;