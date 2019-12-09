import React, {Component} from "react"

class ChatsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Chats Component");
    }
    
    render(){
        return(
            <h1>This is the Chats component</h1>
        )
    }
}

export default ChatsComponent;