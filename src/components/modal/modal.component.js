import React, {Component} from "react"

import "./modal.component.css";

class ModalComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Modal Component");
    }
    
    render(){
        return(
            <div className="modal-container">
                <div className="main-modal">
                    <h2 className="title">Create new conversation</h2>
                </div>
            </div>
        )
    }
}

export default ModalComponent;