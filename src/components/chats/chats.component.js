import React, {Component} from "react"
import { connect } from "react-redux";

import "./chats.component.css";

class ChatsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Chats Component");
    }

    componentDidMount(){
        const { currentuser } = this.props;
        console.log("Inside Component Did Mount");
        console.log("The currentUser is: ", currentuser);
    }
    
    render(){
        return(
            <div className="chat-component-container">
                <div className="my-contacts">
                    <h3>My Contacts</h3>
                    {
                        ((!this.props.currentuser.contacts) || (this.props.currentuser.contacts.length === 0)) ? (
                            <h4>You don't have any contacts</h4> 
                        ):(
                            this.props.currentuser.contacts.map( contact => {
                                return(
                                    <div key={contact._id} className="contact-container">
                                        <h5>{contact.firstname + " " + contact.lastname}</h5>
                                        <h5>{contact.email}</h5>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <div className="chat-component">
                        <div className="chat-content">
                            
                        </div>
                        <div className="input-container">
                            <input className="message-input" type="text"/>
                            <input className="button-input" type="button" value="send"/>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { loggedIn } = state;
    if(loggedIn)
        console.log("Current user is: ", loggedIn);
    return { 
        currentuser: (loggedIn) ? loggedIn : null 
    }
}

export default connect(mapStateToProps, null)(ChatsComponent);